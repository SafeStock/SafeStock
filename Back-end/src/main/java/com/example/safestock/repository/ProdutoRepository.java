package com.example.safestock.repository;

import com.example.safestock.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    List<Produto> findByDataValidadeBetween(LocalDate startDate, LocalDate endDate);

    Long countByDataValidadeBetween(LocalDate startDate, LocalDate endDate);
}
