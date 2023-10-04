import axios from "axios";

export default class LibroServicio {
  BaseUrl = "http://localhost:8080/libro";

  getAll() {
    return axios.get(`${this.BaseUrl}/lista`).then((res) => {
      console.log(res);
      return res.data; // Devuelve los datos
    });
  }

  update(isbn, data) {
    return axios.put(`${this.BaseUrl}/api/libros/${isbn}`, data); //actulizo el libro
  }
}
