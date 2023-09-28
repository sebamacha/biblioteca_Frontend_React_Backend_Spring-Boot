import { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AutorServicio from "./../service/AutorServicio";

export default class Autor extends Component {
  constructor() {
    super();
    this.state = {
      autor: null,
    };
    this.autorServicio = new AutorServicio();
  }

  componentDidMount() {
    this.autorServicio.getAll().then((data) => {
      if (data) {
        this.setState({ autor: data });
      } else {
        console.log("No data returned from API");
      }
    });
  }

  onEdit(rowData) {
    console.log("ID delautor a modificar: ", rowData.id);
  }

  render() {
    if (!this.state.autor) {
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
        <h1 className="titulo-pag">Listado de Autores</h1>
        <DataTable
          value={this.state.autor}
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
  }
}
