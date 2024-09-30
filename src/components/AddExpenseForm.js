// src/components/AddExpenseForm.js

import React, { useState } from 'react';

function AddExpenseForm({ participants, addExpense }) {
  const [nuevoGasto, setNuevoGasto] = useState({
    concepto: '',
    monto: '',
    participantes: [],
    pagador: ''
  });

  const handleAddExpense = () => {
    const { concepto, monto, participantes: partes, pagador } = nuevoGasto;
    if (concepto && monto && partes.length > 0 && pagador) {
      addExpense({ concepto, monto: parseFloat(monto), participantes: partes, pagador });
      setNuevoGasto({ concepto: '', monto: '', participantes: [], pagador: '' });
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Agregar Gasto</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Concepto"
          value={nuevoGasto.concepto}
          onChange={e => setNuevoGasto({ ...nuevoGasto, concepto: e.target.value })}
          className="border border-gray-300 rounded px-2 py-1"
        />
        <input
          type="number"
          placeholder="Monto"
          value={nuevoGasto.monto}
          onChange={e => setNuevoGasto({ ...nuevoGasto, monto: e.target.value })}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div className="mt-4">
        <label className="font-semibold">Participantes:</label>
        <div className="flex flex-wrap mt-2">
          {participants.map((p, index) => (
            <div key={index} className="mr-4">
              <input
                type="checkbox"
                id={`participante-${index}`}
                checked={nuevoGasto.participantes.includes(p)}
                onChange={e => {
                  if (e.target.checked) {
                    setNuevoGasto({ ...nuevoGasto, participantes: [...nuevoGasto.participantes, p] });
                  } else {
                    setNuevoGasto({
                      ...nuevoGasto,
                      participantes: nuevoGasto.participantes.filter(part => part !== p)
                    });
                  }
                }}
                className="mr-1"
              />
              <label htmlFor={`participante-${index}`}>{p}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <label className="font-semibold">Pagador:</label>
        <select
          value={nuevoGasto.pagador}
          onChange={e => setNuevoGasto({ ...nuevoGasto, pagador: e.target.value })}
          className="border border-gray-300 rounded px-2 py-1 ml-2"
        >
          <option value="">Seleccionar</option>
          {participants.map((p, index) => (
            <option key={index} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleAddExpense}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Agregar Gasto
      </button>
    </div>
  );
}

export default AddExpenseForm;
