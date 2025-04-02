package com.example.safestock.service;

import com.example.safestock.model.Creche;
import com.example.safestock.repository.CrecheRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CrecheService {

    public final CrecheRepository crecheRepository;

    public CrecheService(CrecheRepository crecheRepository) {
        this.crecheRepository = crecheRepository;
    }

    public List<Creche> listarCreches() {
        return crecheRepository.findAll();
    }

    public Optional<Creche> buscarCrechePorId(Long id) {
        return crecheRepository.findById(id);
    }

    public Creche salvarCreche(Creche creche) {
        return crecheRepository.save(creche);
    }

    public void removerCrechePorId(Long id) {
        crecheRepository.deleteById(id);
    }

    public Optional<Creche> atualizarCreche(Long id, Creche novaCreche) {
        return crecheRepository.findById(id).map(creche -> {
            creche.setNome(novaCreche.getNome());
            creche.setEndereco(novaCreche.getEndereco());
            creche.setTelefone(novaCreche.getTelefone());
            creche.setCnpj(novaCreche.getCnpj());
            creche.setTipoCreche(novaCreche.getTipoCreche());
            return crecheRepository.save(creche);
        });
    }
}
