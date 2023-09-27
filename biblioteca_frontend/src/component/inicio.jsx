import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import "../App.css";
export default function Inicio() {
  const [date, setDate] = useState(null);

  return (
    <div>
      <h1 className="titulo-pag">Inicio</h1>
      <div className="calendar">
        <Calendar
          value={date}
          onChange={(e) => setDate(e.value)}
          inline
          showWeek
        />
      </div>
    </div>
  );
}
