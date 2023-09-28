import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import LibroServicio from "../service/LibroServicio";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Libros = () => {
  const [libro, setLibro] = useState(null);
  const libroServicio = new LibroServicio();

  useEffect(() => {
    libroServicio.getAll().then((data) => {
      if (data) {
        setLibro(data);
      } else {
        console.log("No data returned from API");
      }
    });
  }, []);

  const onEdit = (rowData) => {
    console.log("ISBN DE LIBRO modificar: ", rowData.isbn);
  };

  const botonModificar = (rowData) => {
    return (
      <Button
        label="Modificar"
        className="p-button-secondary"
        onClick={() => onEdit(rowData)}
      />
    );
  };

  if (!libro) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="titulo-pag">Listado de Libros</h1>
      <DataTable
        value={libro}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}>
        <Column field="isbn" header="ISBN" />
        <Column field="titulo" header="Título" />
        <Column field="ejemplares" header="Ejemplares" />
        <Column field="alta" header="Alta" />
        <Column field="autor.nombre" header="Nombre Autor" />
        <Column field="editorial.nombre" header="Nombre Editorial" />
        <Column body={botonModificar} />
      </DataTable>
    </div>
  );
};

export default Libros;
