package ar.com.macharette.Biblioteca.servicios;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import ar.com.macharette.Biblioteca.entidades.Imagen;
import ar.com.macharette.Biblioteca.exepciones.MiException;
import ar.com.macharette.Biblioteca.repositorios.ImagenRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImagenServicio {
    //lamado al repositorio de iamgenrepositorio
    @Autowired
    private ImagenRepositorio imagenRepositorio;
//metodod para guardar imagen MultipartFile como se van a almacenar las imagenes


    public Imagen guardar(MultipartFile archivo) throws MiException {
        if (archivo != null) {
            try {
                Imagen imagen = new Imagen();
                imagen.setMime(archivo.getContentType());
                imagen.setNombre(archivo.getName());
                imagen.setContenido(archivo.getBytes());
                return imagenRepositorio.save(imagen);
            } catch (IOException ex) {
                throw new MiException("error: no se pudo leer el archivo");
            }
        }
        return null;
    }
    public Imagen actualizar(MultipartFile archivo, String idImagen) throws MiException {
        if (archivo != null) {
            try {
                Imagen imagen = new Imagen();
                //luego de crear imagen validamos el id a modificar existe
                if (idImagen != null) {
                    Optional<Imagen> respuesta = imagenRepositorio.findById(idImagen);
                    if (respuesta.isPresent()) {
                        imagen = respuesta.get();
                    }
                }
                imagen.setMime(archivo.getContentType());
                imagen.setNombre(archivo.getName());
                imagen.setContenido(archivo.getBytes());
                return imagenRepositorio.save(imagen);
            } catch (IOException ex) {
                throw new MiException("error: no se pudo leer el archivo");
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }
        return null;
    }
    @Transactional(readOnly = true)
    public List<Imagen> listarTodos() {
        return imagenRepositorio.findAll();
    }

}
