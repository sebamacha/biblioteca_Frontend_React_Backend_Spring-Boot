import { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import EditorialServicio from "../service/EditorialServicio";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
export default class Editorial extends Component {
  constructor() {
    super();
    this.state = {
      editorial: null,
    };
    this.editorialServicio = new EditorialServicio();
  }

  componentDidMount() {
    this.editorialServicio.getAll().then((data) => {
      if (data) {
        this.setState({ editorial: data });
      } else {
        console.log("No data returned from API");
      }
    });
  }
  onEdit(rowData) {
    console.log("ID de la editorial a modificar: ", rowData.id);
  }

  render() {
    if (!this.state.editorial) {
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
        <h1 className="titulo-pag">Listado de Editoriales</h1>
        <DataTable
          value={this.state.editorial}
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
