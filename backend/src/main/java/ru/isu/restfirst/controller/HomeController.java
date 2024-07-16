package ru.isu.restfirst.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.isu.restfirst.model.MessageResponse;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class HomeController {
    @GetMapping("/")
    public String startPage() {
        return "Start page";
    }
}
