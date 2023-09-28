import React, { useState, useEffect } from "react";
import EditorialServicio from "../service/EditorialServicio";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";

export default function EditorialModificar() {
  const [nombre, setNombre] = useState("");
  const { id } = useParams(); // Obtén el ID de la URL
  const editorialServicio = new EditorialServicio();

  useEffect(() => {
    editorialServicio.get(id).then((data) => {
      if (data) {
        setNombre(data.nombre);
      } else {
        console.log("No data returned from API");
      }
    });
  }, [id, editorialServicio]);

  const handleSubmit = () => {
    editorialServicio.update(id, { nombre }).then((data) => {
      if (data) {
        setNombre(data.nombre);
      } else {
        console.log("No data returned from API");
      }
    });
  };

  return (
    <div>
      <InputText value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <Button
        onClick={handleSubmit}
        label="Guardar"
        severity="success"
        text
        raised
      />
    </div>
  );
}
