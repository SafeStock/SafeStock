package com.example.safestock.controller;


import com.example.safestock.model.Creche;
import com.example.safestock.repository.CrecheRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/creches")
public class CrecheController {

    private final CrecheRepository crecheRepository;

    public CrecheController(CrecheRepository crecheRepository) {
        this.crecheRepository = crecheRepository;
    }

    @GetMapping("/{id}")
    public Optional<Creche> listarCrechePorId(@PathVariable Long id){
        return crecheRepository.findById(id);
    }

    @GetMapping
    public List<Creche> listarCreche(){
        return crecheRepository.findAll();
    }

    @PostMapping
    public Creche adicionarCreche(@RequestBody Creche creche){
        return crecheRepository.save(creche);
    }

    @DeleteMapping("/{id}")
    public String removerCreche(@PathVariable Long id){
        crecheRepository.deleteById(id);
        return "Creche removido com sucesso!";
    }

    @PutMapping("/{id}")
    public Creche atualizarCreche(@PathVariable Long id, @RequestBody Creche novaCreche){
        return crecheRepository.findById(id).map(creche -> {
            creche.setNome(novaCreche.getNome());
            creche.setTipoCreche(novaCreche.getTipoCreche());
            return crecheRepository.save(creche);
        }).orElseThrow(() -> new RuntimeException("Creche não Encontrado"));
    }
}
