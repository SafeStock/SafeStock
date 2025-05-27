package com.example.safestock.repository;

import com.example.safestock.model.RegistroUso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistroUsoRepository extends JpaRepository<RegistroUso, Long> {

    void deleteByFuncionarioId(Long funcionarioId);
}
