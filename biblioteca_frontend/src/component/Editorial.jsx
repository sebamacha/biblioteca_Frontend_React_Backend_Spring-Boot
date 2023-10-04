import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Modal from "react-modal";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import EditorialServicio from "./../service/EditorialServicio";

//no por que pero anda
Modal.setAppElement("#root");

const Editorial = () => {
  const [editorial, setEditorial] = useState(null);
  const [editorialSeleccionado, setEditorialSeleccionado] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState(""); // Agrega esto
  const [modalAbierto, setModalAbierto] = useState(false);
  const editorialServicio = new EditorialServicio();

  useEffect(() => {
    editorialServicio.getAll().then((data) => {
      if (data) {
        setEditorial(data);
      } else {
        console.log("No data returned from API");
      }
    });
  }, []);

  const onEdit = (rowData) => {
    console.log("ID de la Editorial a modificar: ", rowData.id);
    setEditorialSeleccionado(rowData);
    setNuevoNombre(rowData.nombre); // Establece nuevoNombre al nombre actual del libros
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

    editorialServicio
      .update(editorialSeleccionado.id, { nombre: nuevoNombre })
      .then(() => {
        // refresh de la lista
        editorialServicio.getAll().then((data) => {
          if (data) {
            setEditorial(data);
          } else {
            console.log("No data returned from API");
          }
        });
      });
    setModalAbierto(false);
    setNuevoNombre(""); // Resetea nuevoNombre después de guardar
  };

  if (!editorial) {
    return <div>No se puede mostras la lista de Editoriales</div>;
  }

  return (
    <div>
      <h1 className="titulo-pag">Listado de Editoriales</h1>
      <DataTable
        value={editorial}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}>
        <Column field="nombre" header="Nombre" />
        <Column field="id" header="Id" />
        <Column body={actionBodyTemplate} />
      </DataTable>
      <Modal isOpen={modalAbierto}>
        <h2>Modificar Editorial</h2>
        <p>ID: {editorialSeleccionado?.id}</p>
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

export default Editorial;
