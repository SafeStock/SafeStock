package com.example.safestock.repository;

import com.example.safestock.model.enums.CargoFuncionario;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.safestock.model.Funcionario;
import java.util.List;
import java.util.Optional;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

    Optional<Funcionario> findByEmail(String email);

    // Lista todos exceto o usuário logado e exceto quem tem cargo "Dono"
    List<Funcionario> findByEmailNotAndCargoNot(String email, CargoFuncionario cargo);

    // Overload that accepts a Sort so callers can request a sorted list (A-Z by nome for example)
    java.util.List<Funcionario> findByEmailNotAndCargoNot(String email, CargoFuncionario cargo, org.springframework.data.domain.Sort sort);

    // Paginated version
    org.springframework.data.domain.Page<Funcionario> findByEmailNotAndCargoNot(String email, CargoFuncionario cargo, org.springframework.data.domain.Pageable pageable);


}
