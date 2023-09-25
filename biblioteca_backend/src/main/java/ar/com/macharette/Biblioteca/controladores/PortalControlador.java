package ar.com.macharette.Biblioteca.controladores;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5173")
public class PortalControlador {


    @GetMapping("/")
    public String index() {

        return "index.html";
    }


}