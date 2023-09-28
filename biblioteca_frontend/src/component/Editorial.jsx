import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import EditorialServicio from "../service/EditorialServicio";
import ModalEditorial from "./ModalEditorial";

export default function Editorial() {
  const [editoriales, setEditoriales] = useState([]);
  const [modal, setModal] = useState(false);
  const [nombreEditorial, setNombreEditorial] = useState("");
  const [idEditorial, setIdEditorial] = useState(null);

  useEffect(() => {
    const editorialServicio = new EditorialServicio();
    editorialServicio.getAll().then((data) => {
      if (data) {
        setEditoriales(data);
      } else {
        console.log("No data returned from API");
      }
    });
  }, []);

  const onEdit = (rowData) => {
    setIdEditorial(rowData.id);
    setNombreEditorial(rowData.nombre);
    setModal(true);
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

  if (!editoriales) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="titulo-pag">Listado de Editoriales</h1>
      <DataTable
        value={editoriales}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}>
        <Column field="nombre" header="Nombre" />
        <Column field="id" header="Id" />
        <Column body={actionBodyTemplate} />
      </DataTable>
      <ModalEditorial
        modal={modal}
        setModal={setModal}
        nombreEditorial={nombreEditorial}
        setNombreEditorial={setNombreEditorial}
        idEditorial={idEditorial}
      />
    </div>
  );
}
