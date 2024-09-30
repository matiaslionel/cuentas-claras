// src/components/EventDetails.js

import React, { useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import { calcularBalances, calcularDeudas } from "../utils/calculations";

function EventDetails({ event }) {
  const [participants, setParticipants] = useState(event.participants || []);
  const [expenses, setExpenses] = useState(event.gastos);

  const addParticipant = (name) => {
    if (name && !participants.includes(name)) {
      setParticipants([...participants, name]);
    }
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  // Calcular balances y deudas
  const balances = calcularBalances(expenses);
  const deudas = calcularDeudas(balances);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">
        Detalles del Evento: {event.name}
      </h2>

      {/* Sección para agregar participantes */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Participantes</h3>
        <AddParticipantForm addParticipant={addParticipant} />
        <ul className="list-disc pl-5">
          {participants.map((p, index) => (
            <li key={index}>{p}</li>
          ))}
        </ul>
      </div>

      {/* Sección para agregar gastos */}
      <AddExpenseForm participants={participants} addExpense={addExpense} />

      {/* Mostrar gastos */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Gastos</h3>
        {expenses.length === 0 ? (
          <p>No hay gastos registrados.</p>
        ) : (
          <ul className="list-disc pl-5">
            {expenses.map((gasto, index) => (
              <li key={index}>
                <strong>{gasto.concepto}</strong> - {gasto.monto.toFixed(2)}€ -
                Pagado por {gasto.pagador} - Participantes:{" "}
                {gasto.participantes.join(", ")}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mostrar balances */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Balances</h3>
        {Object.keys(balances).length === 0 ? (
          <p>No hay balances disponibles.</p>
        ) : (
          <ul className="list-disc pl-5">
            {Object.entries(balances).map(([participante, data]) => (
              <li key={participante}>
                <strong>{participante}</strong>: Pagado {data.pagado.toFixed(2)}
                €, Consumido {data.adeudado.toFixed(2)}€, Balance{" "}
                {data.balance.toFixed(2)}€
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mostrar deudas */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Deudas Simplificadas</h3>
        {deudas.length === 0 ? (
          <p>No hay deudas pendientes.</p>
        ) : (
          <ul className="list-disc pl-5">
            {deudas.map((deuda, index) => (
              <li key={index}>
                {deuda.deudor} le debe a {deuda.acreedor}:{" "}
                {deuda.monto.toFixed(2)}€
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Componente para agregar participantes
function AddParticipantForm({ addParticipant }) {
  const [participantName, setParticipantName] = useState("");

  const handleAddParticipant = () => {
    addParticipant(participantName);
    setParticipantName("");
  };

  return (
    <div className="flex items-center mb-2">
      <input
        type="text"
        placeholder="Nombre del participante"
        value={participantName}
        onChange={(e) => setParticipantName(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 mr-2 flex-grow"
      />
      <button
        onClick={handleAddParticipant}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Agregar
      </button>
    </div>
  );
}

export default EventDetails;
