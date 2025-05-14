package com.doann.webshop;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class WebshopApplication {
    @RequestMapping("/webshop")
    public String index() {
        return "index";
    } 
}
