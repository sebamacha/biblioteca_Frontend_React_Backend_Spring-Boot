import React, { useState, useEffect } from "react";
import EditorialServicio from "../service/EditorialServicio";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
export default function EditorialModificar() {
  const [editorial, setEditorial] = useState(null);
  const { id } = useParams(); // Obtén el ID de la URL
  const editorialServicio = new EditorialServicio();
  useEffect(() => {
    editorialServicio.update(id, editorial).then((data) => {
      if (data) {
        setEditorial(data);
      } else {
        console.log("No data returned from API");
      }
    });
  }, [id, editorial, editorialServicio]);

  const handleSubmit = () => {
    editorialServicio.update(id, editorial).then((data) => {
      if (data) {
        setEditorial(data);
      } else {
        console.log("No data returned from API");
      }
    });
  };

  if (!editorial) {
    return <div>No se encontró el ID</div>;
  }

  return (
    <div>
      <InputText
        value={editorial}
        onChange={(e) => setEditorial(e.target.value)}
      />
      <Button
        onClick={handleSubmit}
        label="Success"
        severity="success"
        text
        raised
      />
    </div>
  );
}
