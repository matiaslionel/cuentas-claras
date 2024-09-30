// src/components/EventList.js

import React from "react";

function EventList({ events, selectEvent }) {

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Eventos</h2>
      {events.length === 0 ? (
        <p>No hay eventos creados.</p>
      ) : (
        <ul className="list-disc pl-5">
          {events.map((event, index) => (
            <li
              key={index}
              className="cursor-pointer text-blue-600"
              onClick={() => selectEvent(event.name)}
            >
              {event.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventList;
