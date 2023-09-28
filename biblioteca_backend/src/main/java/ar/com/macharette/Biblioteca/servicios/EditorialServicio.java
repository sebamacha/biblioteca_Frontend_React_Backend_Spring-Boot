package ar.com.macharette.Biblioteca.servicios;

import ar.com.macharette.Biblioteca.entidades.Editorial;
import ar.com.macharette.Biblioteca.exepciones.MiException;
import ar.com.macharette.Biblioteca.repositorios.EditorialRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EditorialServicio {

    @Autowired
    EditorialRepositorio editorialRepositorio;

    @Transactional
    public void crearEditorial(String nombre) throws MiException {

        validar(nombre);

        Editorial editorial = new Editorial();

        editorial.setNombre(nombre);

        editorialRepositorio.save(editorial);
    }

    @Transactional(readOnly = true)
    public List<Editorial> listarEditoriales() {

        List<Editorial> editoriales = new ArrayList();

        editoriales = editorialRepositorio.findAll();

        return editoriales;
    }

    @Transactional
    public Editorial modificarEditorial(String id, String nombre) throws MiException {
        validar(nombre);

        Optional<Editorial> respuesta = editorialRepositorio.findById(id);

        if (respuesta.isPresent()) {

            Editorial editorial = respuesta.get();

            editorial.setNombre(nombre);

            editorialRepositorio.save(editorial);

            return editorial;
        }
        return null;
    }


    @Transactional(readOnly = true)
    public Editorial getOne(String id){
        return editorialRepositorio.getOne(id);
    }



    @Transactional
    public void eliminar(String id) throws MiException {

        Editorial editorial = editorialRepositorio.getById(id);

        editorialRepositorio.delete(editorial);

    }
    private void validar(String nombre) throws MiException {

        if (nombre.isEmpty() || nombre == null) {
            throw new MiException("el nombre de la editorial no puede ser nulo o estar vacio");
        }
    }
}