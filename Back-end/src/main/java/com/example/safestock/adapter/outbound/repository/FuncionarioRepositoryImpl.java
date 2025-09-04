package com.example.safestock.adapter.outbound.repository;

import com.example.safestock.adapter.outbound.error.NotFoundException;
import com.example.safestock.adapter.outbound.mapper.FuncionarioMapper;
import com.example.safestock.application.port.out.FuncionarioRepository;
import com.example.safestock.domain.model.Funcionario;
import com.example.safestock.infrastructure.entity.FuncionarioEntity;
import com.example.safestock.infrastructure.jpa.JpaFuncionarioRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;



@Repository
public class FuncionarioRepositoryImpl implements FuncionarioRepository {

    private final JpaFuncionarioRepository jpa;

    public FuncionarioRepositoryImpl(JpaFuncionarioRepository jpa) {
        this.jpa = jpa;
    }

//    @Override
//    public Funcionario save(Funcionario funcionario) {
//        FuncionarioEntity entity = FuncionarioMapper.toEntity(funcionario);
//        FuncionarioEntity saved = jpa.save(entity);
//        return FuncionarioMapper.toDomain(saved);
//    }

    @Override
    public List<Funcionario> buscarFuncionario() {
        return jpa.findAll().stream()
                .map(FuncionarioMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteFuncionario(Long id) {
        if (!jpa.existsById(id)) {
            throw new NotFoundException("Funcionario " + id + " não encontrado");
        }
        jpa.deleteById(id);
    }
}
