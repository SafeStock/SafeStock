package com.example.safestock.adapter.inbound.controller;

import com.example.safestock.adapter.inbound.dto.FuncionarioRequest;
import com.example.safestock.adapter.inbound.dto.FuncionarioResponse;
import com.example.safestock.application.port.in.FuncionarioUseCase;
import com.example.safestock.domain.model.Creche;
import com.example.safestock.domain.model.Funcionario;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/funcionarios_v2")
public class FuncionarioController {

    private final FuncionarioUseCase useCase;

    public FuncionarioController(FuncionarioUseCase useCase) { this.useCase = useCase; }

    @PostMapping
    public ResponseEntity<FuncionarioResponse> create(@RequestBody @Valid FuncionarioRequest req) {
        Funcionario d = new Funcionario();
        d.setNome(req.getNome());
        d.setSobrenome(req.getSobrenome());
        d.setCargo(req.getCargo());
        d.setEmail(req.getEmail());
        d.setSenha(req.getSenha());
        d.setTelefone(req.getTelefone());
        if (req.getCrecheId() != null) {
            Creche c = new Creche(); c.setId(req.getCrecheId()); d.setCreche(c);
        }

        Funcionario saved = useCase.criar(d);
        FuncionarioResponse r = new FuncionarioResponse();
        r.setId(saved.getId()); r.setNome(saved.getNome()); r.setSobrenome(saved.getSobrenome()); r.setEmail(saved.getEmail()); r.setTelefone(saved.getTelefone());
        if (saved.getCrecheId() != null) r.setCrecheId(saved.getCrecheId().getId());

        return ResponseEntity.created(URI.create("/api/funcionarios_v2/" + r.getId())).body(r);
    }
}
