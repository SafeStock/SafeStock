package com.example.safestock.repository;

import com.example.safestock.model.RegistroUso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.safestock.model.Produto;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface RegistroUsoRepository extends JpaRepository<RegistroUso, Long> {

    void deleteByFuncionarioId(Long funcionarioId);

    List<RegistroUso> findByProdutoAndDataRegistroBetween(
            Produto produto,
            LocalDate dataInicio,
            LocalDate dataFim
    );
}
