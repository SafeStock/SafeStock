package com.example.safestock.infrastructure.repository;

import com.example.safestock.core.domain.RegistroUso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistroUsoRepository extends JpaRepository<RegistroUso, Long> {

    void deleteByFuncionarioId(Long funcionarioId);

    @Query("SELECT SUM(r.quantidade) FROM RegistroUso r")
    Long sumQuantidadeRegistroDeUso();

    @Modifying
    @Query("DELETE FROM Relatorio r WHERE r.registroUso.id = :registroUsoId")
    void deleteRelatoriosByRegistroUsoId(@Param("registroUsoId") Long registroUsoId);

}
