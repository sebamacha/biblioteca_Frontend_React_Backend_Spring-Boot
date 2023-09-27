package ar.com.macharette.Biblioteca.controladores;

import ar.com.macharette.Biblioteca.entidades.Autor;
import ar.com.macharette.Biblioteca.exepciones.MiException;
import ar.com.macharette.Biblioteca.servicios.AutorServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/autor") //localhost:8080/autor
@CrossOrigin(origins = "http://localhost:5173")
public class AutorControlador {

    @Autowired
    private AutorServicio autorServicio;

    @GetMapping("/registrar") //localhost:8080/autor/registrar
    public String registrar(){
        return "autor_form.html";
    }


    @PostMapping("/registro/")
    public String registro(@RequestParam String nombre, ModelMap modelo){

        try {
            autorServicio.crearAutor(nombre);

            modelo.put("exito", "El Autor fue registrado correctamente!");
        } catch (MiException ex) {

            modelo.put("error", ex.getMessage());
            return "autor_form.html";
        }

        return "index.html";
    }

    @GetMapping("/lista")
    public ResponseEntity<List<Autor>> listar(){

        List<Autor> autores = autorServicio.listarAutores();

        return new ResponseEntity<>(autores, HttpStatus.OK);
    }


    @GetMapping("/modificar/{id}")
    public String modificar(@PathVariable String id, ModelMap modelo){
        modelo.put("autor", autorServicio.getOne(id));

        return "autor_modificar.html";
    }

    @PostMapping("/modificar/{id}")
    public String modificar(@PathVariable String id, String nombre, ModelMap modelo){
        try {
            autorServicio.modificarAutor(nombre, id);

            return "redirect:../lista";
        } catch (MiException ex) {
            modelo.put("error", ex.getMessage());
            return "autor_modificar.html";
        }

    }

    // @GetMapping("{id}")
    public String eliminar(@PathVariable String id, ModelMap modelo) throws MiException{
        autorServicio.eliminar(id);

        return "autor_modificar.html";
    }
}