package com.example.safestock.adapter.outbound.repository;

import com.example.safestock.adapter.outbound.error.NotFoundException;
import com.example.safestock.adapter.outbound.mapper.RegistroUsoMapper;
import com.example.safestock.application.port.out.RegistroUsoRepository;
import com.example.safestock.domain.model.RegistroUso;
import com.example.safestock.infrastructure.entity.RegistroUsoEntity;
import com.example.safestock.infrastructure.jpa.JpaRegistroUsoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class RegistroUsoRepositoryImpl implements RegistroUsoRepository {

    private final JpaRegistroUsoRepository jpa;

    public RegistroUsoRepositoryImpl(JpaRegistroUsoRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public RegistroUso save(RegistroUso registroUso) {
        RegistroUsoEntity entity = RegistroUsoMapper.toEntity(registroUso);
        RegistroUsoEntity saved = jpa.save(entity);
        return RegistroUsoMapper.toDomain(saved);
    }

    @Override
    public List<RegistroUso> findAll() {
        return jpa.findAll().stream()
                .map(RegistroUsoMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<RegistroUso> findById(Long id) {
        return jpa.findById(id).map(RegistroUsoMapper::toDomain);
    }

    @Override
    public void deleteById(Long id) {
        if (!jpa.existsById(id)) {
            throw new NotFoundException("RegistroUso " + id + " não encontrado");
        }
        jpa.deleteById(id);
    }

    @Override
    public Long sumQuantidadeRegistroDeUsoMes(int ano, int mes) {
        Long total = jpa.sumQuantidadeRegistroDeUsoMes(ano, mes);
        return total != null ? total : 0L;
    }
}
