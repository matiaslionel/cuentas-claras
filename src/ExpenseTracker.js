// src/ExpenseTracker.js

import React, { useState } from 'react';
import { calcularBalances, calcularDeudas } from './utils/calculations';

function ExpenseTracker() {
  const [participantes, setParticipantes] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [nuevoParticipante, setNuevoParticipante] = useState('');
  const [nuevoGasto, setNuevoGasto] = useState({
    concepto: '',
    monto: '',
    participantes: [],
    pagador: ''
  });

  const agregarParticipante = () => {
    if (nuevoParticipante && !participantes.includes(nuevoParticipante)) {
      setParticipantes([...participantes, nuevoParticipante]);
      setNuevoParticipante('');
    }
  };

  const agregarGasto = () => {
    const { concepto, monto, participantes: partes, pagador } = nuevoGasto;
    if (concepto && monto && partes.length > 0 && pagador) {
      setGastos([...gastos, { concepto, monto: parseFloat(monto), participantes: partes, pagador }]);
      setNuevoGasto({ concepto: '', monto: '', participantes: [], pagador: '' });
    }
  };

  const balances = calcularBalances(gastos);
  const deudas = calcularDeudas(balances);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">División de Gastos</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Participantes</h2>
        <div className="flex items-center mb-2">
          <input
            type="text"
            placeholder="Nombre del participante"
            value={nuevoParticipante}
            onChange={e => setNuevoParticipante(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 mr-2 flex-grow"
          />
          <button
            onClick={agregarParticipante}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Agregar
          </button>
        </div>
        <ul className="list-disc pl-5">
          {participantes.map((p, index) => (
            <li key={index}>{p}</li>
          ))}
        </ul>
      </div>

      {/* Sección para agregar gastos */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Agregar Gasto</h2>
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
            {participantes.map((p, index) => (
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
            {participantes.map((p, index) => (
              <option key={index} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={agregarGasto}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Agregar Gasto
        </button>
      </div>

      {/* Mostrar gastos */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Gastos</h2>
        <ul className="list-disc pl-5">
          {gastos.map((gasto, index) => (
            <li key={index}>
              <strong>{gasto.concepto}</strong> - {gasto.monto.toFixed(2)}€ - Pagado por {gasto.pagador} - Participantes: {gasto.participantes.join(', ')}
            </li>
          ))}
        </ul>
      </div>

      {/* Mostrar balances */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Balances</h2>
        <ul className="list-disc pl-5">
          {Object.entries(balances).map(([participante, data]) => (
            <li key={participante}>
              <strong>{participante}</strong>: Pagado {data.pagado.toFixed(2)}€, Consumido {data.adeudado.toFixed(2)}€, Balance {data.balance.toFixed(2)}€
            </li>
          ))}
        </ul>
      </div>

      {/* Mostrar deudas */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Deudas Simplificadas</h2>
        {deudas.length === 0 ? (
          <p>No hay deudas pendientes.</p>
        ) : (
          <ul className="list-disc pl-5">
            {deudas.map((deuda, index) => (
              <li key={index}>
                {deuda.deudor} le debe a {deuda.acreedor}: {deuda.monto.toFixed(2)}€
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ExpenseTracker;
