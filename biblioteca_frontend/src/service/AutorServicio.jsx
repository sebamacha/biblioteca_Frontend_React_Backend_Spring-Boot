import axios from "axios";

export default class AutorServicio {
  BaseUrl = "http://localhost:8080/autor";

  getAll() {
    return axios.get(`${this.BaseUrl}/lista`).then((res) => {
      console.log(res);
      return res.data; // Devuelve los datos
    });
  }
  update(id, data) {
    return axios.put(`${this.BaseUrl}/api/autores/${id}`, data); //actulizo el nombre d editorial
  }
}
