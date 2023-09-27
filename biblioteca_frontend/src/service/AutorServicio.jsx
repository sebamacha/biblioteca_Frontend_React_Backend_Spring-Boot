import axios from "axios";

export default class AutorServicio {
  BaseUrl = "http://localhost:8080/autor/lista";

  getAll() {
    return axios.get(this.BaseUrl).then((res) => {
      console.log(res);
      return res.data; // Devuelve los datos
    });
  }
}
