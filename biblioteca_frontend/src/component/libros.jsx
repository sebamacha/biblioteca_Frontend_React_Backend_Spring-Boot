import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Modal from "react-modal";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import LibrosServicio from "../service/LibroServicio";

//no por que pero anda
Modal.setAppElement("#root");

const Libros = () => {
  const [libros, setLibros] = useState([]);
  const libroServicio = new LibrosServicio();

  useEffect(() => {
    libroServicio.getAll().then((data) => {
      if (data) {
        setLibros(data);
      } else {
        console.log("No data returned from API");
      }
    });
  }, []);

  if (!libros) {
    return <div>No se puede mostras la lista de Libros</div>;
  }

  return (
    <div>
      <h1 className="titulo-pag">Listado de Libros</h1>
      <DataTable
        value={libros}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}>
        <Column field="titulo" header="Titulo" />
        <Column field="ejemplares" header="Ejemplares" />
        <Column field="autor.nombre" header="Autor" />
        <Column field="editorial.nombre" header="Editorial" />
        <Column field="isbn" header="Isbn" />
      </DataTable>
    </div>
  );
};

export default Libros;
