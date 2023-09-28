import { Component } from "react";
import { Button } from "primereact/button";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import LibroServicio from "../service/LibroServicio";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default class Libros extends Component {
  constructor() {
    super();
    this.state = {
      libro: null,
    };
    this.libroServicio = new LibroServicio();
  }

  componentDidMount() {
    this.libroServicio.getAll().then((data) => {
      if (data) {
        this.setState({ libro: data });
      } else {
        console.log("No data returned from API");
      }
    });
  }
  onEdit(rowData) {
    console.log("ISBN DE LIBRO modificar: ", rowData.isbn);
  }

  render() {
    if (!this.state.libro) {
      return <div>Loading...</div>;
    }
    const actionBodyTemplate = (rowData) => {
      return (
        <Button
          label="Modificar"
          className="p-button-secondary"
          onClick={() => this.onEdit(rowData)}
        />
      );
    };

    return (
      <div>
        <h1 className="titulo-pag">Listado de Libros</h1>
        <DataTable
          value={this.state.libro}
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
          <Column body={actionBodyTemplate} />
        </DataTable>
      </div>
    );
  }
}
