package com.example.safestock.infrastructure.jpa;

import com.example.safestock.infrastructure.entity.RegistroUsoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JpaRegistroUsoRepository extends JpaRepository<RegistroUsoEntity, Long> {

    @Query("select sum(r.quantidade) from RegistroUsoEntity r where year(r.dataHoraSaida) = :ano and month(r.dataHoraSaida) = :mes")
    Long sumQuantidadeRegistroDeUsoMes(@Param("ano") int ano, @Param("mes") int mes);
}
