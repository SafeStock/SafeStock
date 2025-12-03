package com.example.safestock.repository;

import com.example.safestock.model.Creche;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrecheRepository extends JpaRepository<Creche, Long> {
}
