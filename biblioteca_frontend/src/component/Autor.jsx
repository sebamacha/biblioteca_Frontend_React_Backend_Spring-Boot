import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AutorServicio from "./../service/AutorServicio";

const Autor = () => {
  const [autor, setAutor] = useState(null);
  const autorServicio = new AutorServicio();

  useEffect(() => {
    autorServicio.getAll().then((data) => {
      if (data) {
        setAutor(data);
      } else {
        console.log("No data returned from API");
      }
    });
  }, []);

  const onEdit = (rowData) => {
    console.log("ID del autor a modificar: ", rowData.id);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        label="Modificar"
        className="p-button-secondary"
        onClick={() => onEdit(rowData)}
      />
    );
  };

  if (!autor) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="titulo-pag">Listado de Autores</h1>
      <DataTable
        value={autor}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}>
        <Column field="nombre" header="Nombre" />
        <Column field="id" header="Id" />
        <Column body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
};

export default Autor;
