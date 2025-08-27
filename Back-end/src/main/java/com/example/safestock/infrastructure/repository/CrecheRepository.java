package com.example.safestock.infrastructure.repository;

import com.example.safestock.core.domain.Creche;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrecheRepository extends JpaRepository<Creche, Long> {
}
