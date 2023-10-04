import { Component } from "react";
import "./App.css";
import MyMenubar from "./component/MyMenubar";
import { Routes, Route } from "react-router-dom";
import Inicio from "./component/inicio";
import PaginaNoEncontrada from "./component/PaginaNoEncontrada";
import Libros from "./component/Libros";
import Footer from "./component/footer";
import Libro_Form from "./component/libro_form";
import Editorial from "./component/Editorial";
import Autor from "./component/Autor";

export default class App extends Component {
  render() {
    return (
      <div className="p-flex p-jc-between">
        <MyMenubar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/libros" element={<Libros />} />
          <Route path="/libros_form" element={<Libro_Form />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
          <Route path="/autores" element={<Autor />} />
          <Route path="/editoriales" element={<Editorial />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}
