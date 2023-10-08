package ar.com.macharette.Biblioteca.repositorios;

import ar.com.macharette.Biblioteca.entidades.Imagen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagenRepositorio extends JpaRepository<Imagen, String>{

}
