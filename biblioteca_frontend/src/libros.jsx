import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import LibroServicio from "./service/LibroServicio";

const Libros = () => {
  const [libro, setLibro] = useState(null);
  const libroServicio = new LibroServicio(); // Instancia de LibroServicio

  useEffect(() => {
    const getLibros = async () => {
      const data = await libroServicio.getAll(); // Usa el método getAll() del objeto instanciado
      if (data) {
        setLibro(data);
      } else {
        console.log("No data returned from API");
      }
    };

    getLibros();
  }, []);

  if (!libro) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DataTable value={libro}>
        <Column field="isbn" header="ISBN" />
        <Column field="titulo" header="Título" />
        <Column field="ejemplares" header="Ejemplares" />
        <Column field="alta" header="Alta" />
        <Column field="autor.nombre" header="Nombre Autor" />
        <Column field="editorial.nombre" header="Nombre Editorial" />
      </DataTable>
    </div>
  );
};

export default Libros;
