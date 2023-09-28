import axios from "axios";

export default class EditorialServicio {
  constructor() {
    this.url = "http://localhost:8080/editorial";
  }

  getAll() {
    return axios.get(`${this.url}/lista`);
  }

  getById(id) {
    return axios.get(`${this.url}/${id}`);
  }

  create(editorial) {
    return axios.post(this.url, editorial);
  }

  update(id, editorial) {
    return axios.put(`${this.url}/${id}`, editorial);
  }

  delete(id) {
    return axios.delete(`${this.url}/${id}`);
  }
}
