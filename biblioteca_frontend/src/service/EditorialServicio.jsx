import axios from "axios";

export default class EditorialServicio {
  BaseUrl = "http://localhost:8080/editorial/lista";

  getAll() {
    return axios.get(this.BaseUrl).then((res) => {
      console.log(res);
      return res.data; // Devuelve los datos
    });
  }
}
