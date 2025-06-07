package com.example.safestock.repository;

import com.example.safestock.model.RegistroUso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.safestock.model.Produto;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface RegistroUsoRepository extends JpaRepository<RegistroUso, Long> {

    void deleteByFuncionarioId(Long funcionarioId);

    @Query("SELECT SUM(r.quantidade) FROM RegistroUso r")
    Long sumQuantidadeRegistroDeUso();

    @Modifying
    @Query("DELETE FROM Relatorio r WHERE r.registroUso.id = :registroUsoId")
    void deleteRelatoriosByRegistroUsoId(@Param("registroUsoId") Long registroUsoId);

}
