package com.example.safestock.repository;

import com.example.safestock.model.RegistroUso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.safestock.model.Produto;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RegistroUsoRepository extends JpaRepository<RegistroUso, Long> {

    void deleteByFuncionarioId(Long funcionarioId);

    @Query("SELECT SUM(r.quantidade) FROM RegistroUso r " +
            "WHERE r.dataHoraSaida BETWEEN :inicio AND :fim")
    Long sumQuantidadeRegistroDeUsoMesAtual(@Param("inicio") LocalDateTime inicio,
                                            @Param("fim") LocalDateTime fim);

    @Query("SELECT SUM(r.quantidade) FROM RegistroUso r " +
            "WHERE YEAR(r.dataHoraSaida) = :ano AND MONTH(r.dataHoraSaida) = :mes")
    Long sumQuantidadeRegistroDeUsoMes(@Param("ano") int ano, @Param("mes") int mes);


    @Modifying
    @Query("DELETE FROM Relatorio r WHERE r.registroUso.id = :registroUsoId")
    void deleteRelatoriosByRegistroUsoId(@Param("registroUsoId") Long registroUsoId);

}

