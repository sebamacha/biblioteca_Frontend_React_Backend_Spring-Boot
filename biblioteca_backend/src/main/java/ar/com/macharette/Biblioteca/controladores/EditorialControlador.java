package ar.com.macharette.Biblioteca.controladores;

import ar.com.macharette.Biblioteca.entidades.Autor;
import ar.com.macharette.Biblioteca.entidades.Editorial;
import ar.com.macharette.Biblioteca.exepciones.MiException;
import ar.com.macharette.Biblioteca.servicios.EditorialServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/editorial")
@CrossOrigin(origins = "http://localhost:5173")
public class EditorialControlador {
    @Autowired
    private EditorialServicio editorialServicio;

    @GetMapping("/registrar") //localhost:8080/autor/registrar
    public String registrar(){
        return "editorial_form.html";
    }


    @PostMapping("/registro/")
    public String registro(@RequestParam String nombre, ModelMap modelo){

        try {
            editorialServicio.crearEditorial(nombre);

            modelo.put("exito", "La Editorial fue registrada correctamente!");
        } catch (MiException ex) {

            modelo.put("error", ex.getMessage());
            return "editorial_form.html";
        }

        return "index.html";
    }

    @GetMapping("/lista")
    public ResponseEntity<List<Editorial>> listar(){

        List<Editorial> editoriales = editorialServicio.listarEditoriales();

        return new ResponseEntity<>(editoriales, HttpStatus.OK);
    }
    @PutMapping("/api/editoriales/{id}")
    public ResponseEntity<Editorial> updateEditorial(@PathVariable String id, @RequestBody Editorial editorialDetails) {
        Editorial editorial = editorialServicio.getOne(id);
        if (editorial == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        editorial.setNombre(editorialDetails.getNombre());
        final Editorial updatedEditorial = editorialServicio.save(editorial);
        return new ResponseEntity<>(updatedEditorial, HttpStatus.OK);
    }
    @GetMapping("/modificar/{id}")
    public String modificar(@PathVariable String id, ModelMap modelo){
        modelo.put("editorial", editorialServicio.getOne(id));

        return "editorial_modificar.html";
    }

    @PutMapping("/editorial/modificar/{id}")
    public ResponseEntity<Editorial> modificar(@PathVariable String id, String nombre) {
        try {
            Editorial editorial = editorialServicio.modificarEditorial(id, nombre);

            return ResponseEntity.ok(editorial);
        } catch (MiException ex) {
            return ResponseEntity.badRequest().body(null);
        }

    }






}
