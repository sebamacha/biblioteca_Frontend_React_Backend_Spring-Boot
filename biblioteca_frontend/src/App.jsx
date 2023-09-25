import { Component } from 'react'
import './App.css'
import LibroServicio from './service/LibroServicio';

import Libros from './libros.jsx';
export default class App extends Component{
  constructor() {
    super();
    this.state = {
      Libros: []
    };
    this.libroServicio = new LibroServicio();

  }
  
  componentDidMount() {
    this.libroServicio.getAll().then(data => {
      if (data) {
        this.setState({ libro: data });
      } else {
        console.log('No data returned from API');
      }
    }).catch(error => {
      console.error('Error occurred:', error);
    });
  }

  render() {
    return (
      <div>
      <Libros/>
    </div>
    )
  }

}



