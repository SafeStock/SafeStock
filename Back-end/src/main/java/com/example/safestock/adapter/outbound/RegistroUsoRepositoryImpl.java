package com.example.safestock.adapter.outbound;

import com.example.safestock.application.port.out.RegistroUsoRepository;
import com.example.safestock.domain.model.RegistroUso;
import com.example.safestock.infrastructure.entity.RegistroUsoEntity;
import com.example.safestock.infrastructure.jpa.JpaRegistroUsoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class RegistroUsoRepositoryImpl implements RegistroUsoRepository {

    private final JpaRegistroUsoRepository jpaRegistroUsoRepository;

    public RegistroUsoRepositoryImpl(JpaRegistroUsoRepository jpaRegistroUsoRepository) {
        this.jpaRegistroUsoRepository = jpaRegistroUsoRepository;
    }

    @Override
    public RegistroUso save(RegistroUso registroUso) {
        RegistroUsoEntity entity = toEntity(registroUso);
        RegistroUsoEntity saved = jpaRegistroUsoRepository.save(entity);
        return toDomain(saved);
    }

    @Override
    public List<RegistroUso> findAll() {
        return jpaRegistroUsoRepository.findAll()
                .stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    private RegistroUsoEntity toEntity(RegistroUso domain) {
        RegistroUsoEntity entity = new RegistroUsoEntity();
        entity.setId(domain.getId());
        entity.setProduto(domain.getProduto());
        entity.setDataValidade(domain.getDataValidade());
        entity.setQuantidade(domain.getQuantidade());
        entity.setDataHoraSaida(domain.getDataHoraSaida());

        // Relacionamento com Funcionario antigo
        if (domain.getFuncionario() != null) {
            entity.setFuncionario(domain.getFuncionario()); // mantém referência completa (JPA gerencia)
        }

        // Relacionamento com Relatorio antigo
        if (domain.getRelatorio() != null) {
            entity.setRelatorio(domain.getRelatorio()); // mantém referência completa
        }

        return entity;
    }

    private RegistroUso toDomain(RegistroUsoEntity entity) {
        RegistroUso domain = new RegistroUso();
        domain.setId(entity.getId());
        domain.setProduto(entity.getProduto());
        domain.setDataValidade(entity.getDataValidade());
        domain.setQuantidade(entity.getQuantidade());
        domain.setDataHoraSaida(entity.getDataHoraSaida());

        // Mantém referências para compatibilidade (não faz conversão complexa)
        domain.setFuncionario(entity.getFuncionario());
        domain.setRelatorio(entity.getRelatorio());

        return domain;
    }

}
