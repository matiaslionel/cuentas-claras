// src/components/AddEventForm.js

import React, { useState } from "react";

function AddEventForm({ addEvent, events }) {
  const [eventName, setEventName] = useState("");

  const handleAddEvent = () => {
    if (eventName && !events.some(event => event.name === eventName)) {
      addEvent(eventName);
      setEventName("");
    }
  };

  const isEventNameDuplicate = events.some(event => event.name === eventName);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Crear Evento</h2>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Nombre del evento"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mr-2 flex-grow"
        />
        <button
          onClick={handleAddEvent}
          disabled={!eventName || isEventNameDuplicate}
          className={`text-white px-4 py-2 rounded ${
            !eventName || isEventNameDuplicate
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Agregar Evento
        </button>
      </div>
      {isEventNameDuplicate && (
        <p className="text-red-500 mt-1">Este evento ya existe en la lista.</p>
      )}
    </div>
  );
}

export default AddEventForm;
