package com.example.safestock.application.port;

import com.example.safestock.domain.model.RegistroUso;
import java.util.List;

public interface RegistroUsoRepository {
    RegistroUso save(RegistroUso registroUso);
    List<RegistroUso> findAll();
}
