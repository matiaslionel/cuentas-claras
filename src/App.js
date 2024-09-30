// src/App.js

import React, { useState } from "react";
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetails";
import AddEventForm from "./components/AddEventForm";

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Función para agregar un nuevo evento
  const addEvent = (eventName) => {
    const newEvent = {
      id: Date.now(),
      name: eventName,
      gastos: [],
    };
    setEvents([...events, newEvent]);
  };

  // Función para agregar un gasto a un evento
  const addExpenseToEvent = (eventId, expense) => {
    setEvents(
      events.map((event) => {
        if (event.id === eventId) {
          const updatedEvent = { ...event };
          updatedEvent.gastos = [...updatedEvent.gastos, expense];
          expense.participantes.forEach((participante) =>
            updatedEvent.participantes.add(participante)
          );
          updatedEvent.participantes.add(expense.pagadorId);
          return updatedEvent;
        }
        return event;
      })
    );
  };

  // Función para seleccionar un evento
  const selectEvent = (eventName) => {
    const event = events.find((event) => event.name === eventName);
    setSelectedEvent(event);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Cuentas claras</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {!selectedEvent ? (
          <div>
            <AddEventForm addEvent={addEvent} events={events} />
            <EventList events={events} selectEvent={selectEvent} />
          </div>
        ) : (
          <div>
            <EventDetails
              event={selectedEvent}
              addExpenseToEvent={addExpenseToEvent}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
