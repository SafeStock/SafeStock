package com.example.safestock.repository;

import com.example.safestock.model.enums.CargoFuncionario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.safestock.model.Funcionario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

    Optional<Funcionario> findByEmail(String email);

    // Lista todos exceto o usuário logado e exceto quem tem cargo "Dono"
    List<Funcionario> findByEmailNotAndCargoNot(String email, CargoFuncionario cargo);


    @Query("SELECT f FROM Funcionario f " +
            "WHERE f.email <> :emailLogado " +
            "AND f.cargo <> :cargoDono")
    Page<Funcionario> findAllExcetoLogadoEDono(
            @Param("emailLogado") String emailLogado,
            @Param("cargoDono") CargoFuncionario cargoDono,
            Pageable pageable
    );






}
