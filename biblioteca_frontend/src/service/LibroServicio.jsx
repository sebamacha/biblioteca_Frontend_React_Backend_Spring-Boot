import axios from 'axios';


export default class LibroServicio {
    BaseUrl = "http://localhost:8080/libro/lista"

    getAll() {
        return axios.get(this.BaseUrl).then(res => {
            console.log(res);
            return res.data; // Devuelve los datos
        });
    }
}
