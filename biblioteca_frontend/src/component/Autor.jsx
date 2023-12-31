import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Modal from "react-modal";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AutorServicio from "./../service/AutorServicio";

//no por que pero anda
Modal.setAppElement("#root");

const Autor = () => {
  const [autor, setAutor] = useState(null);
  const [autorSeleccionado, setAutorSeleccionado] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState(""); // Agrega esto
  const [modalAbierto, setModalAbierto] = useState(false);
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
    setAutorSeleccionado(rowData);
    setNuevoNombre(rowData.nombre); // Establece nuevoNombre al autor
    setModalAbierto(true);
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

  const handleClick = () => {
    // llamado para actulizar nombre

    autorServicio
      .update(autorSeleccionado.id, { nombre: nuevoNombre })
      .then(() => {
        // refresh de la lista
        autorServicio.getAll().then((data) => {
          if (data) {
            setAutor(data);
          } else {
            console.log("No data returned from API");
          }
        });
      });
    setModalAbierto(false);
    setNuevoNombre(""); // Resetea nuevoNombre después de guardar
  };

  if (!autor) {
    return <div>No se puede mostras la lista de Autores</div>;
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
      <Modal isOpen={modalAbierto}>
        <h2>Modificar Autor</h2>
        <p>ID: {autorSeleccionado?.id}</p>
        <input
          type="text"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
        />{" "}
        {/* Utiliza nuevoNombre aquí */}
        <Button label="Guardar" onClick={handleClick} />
        <Button label="Cancelar" onClick={() => setModalAbierto(false)} />
      </Modal>
    </div>
  );
};

export default Autor;
