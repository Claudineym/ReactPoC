package br.com.react.controller;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.react.model.Beer;
import br.com.react.repository.BeerRepository;


@RestController
public class BeerController {
	
	private BeerRepository repository;
    public BeerController(BeerRepository repository) {
        this.repository = repository;
    }
    @GetMapping("/good-beers")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000", "http://localhost"})
    public Collection<Beer> goodBeers() {
        return ((Collection<Beer>) repository.findAll()).stream()
                .filter(this::isGreat)
                .collect(Collectors.toList());
    }
    private boolean isGreat(Beer beer) {
        return !beer.getName().equals("Budweiser") &&
                !beer.getName().equals("Coors Light") &&
                !beer.getName().equals("PBR");
    }
}