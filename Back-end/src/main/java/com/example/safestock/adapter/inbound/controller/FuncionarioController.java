package com.example.safestock.adapter.inbound.controller;

import com.example.safestock.adapter.inbound.dto.FuncionarioRequest;
import com.example.safestock.adapter.inbound.dto.FuncionarioResponse;
import com.example.safestock.adapter.outbound.error.NotFoundException;
import com.example.safestock.application.port.in.FuncionarioUseCase;
import com.example.safestock.domain.model.Creche;
import com.example.safestock.domain.model.Funcionario;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController("funcionarioControllerV2")
@RequestMapping("/api/funcionarios_v2")
public class FuncionarioController {

    private final FuncionarioUseCase useCase;

    public FuncionarioController(@Qualifier("funcionarioServiceV2") FuncionarioUseCase useCase) {
        this.useCase = useCase;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Funcionario>> buscarFuncionarios() {
        return ResponseEntity.ok(useCase.buscarFuncionarios());
    }

    @GetMapping("/listar_id/{id}")
    public ResponseEntity<Funcionario> buscarFuncionarioPorId(@PathVariable Long id) {
        Optional<Funcionario> funcionarioOpt = useCase.buscarFuncionarioPorId(id);

        if (funcionarioOpt.isPresent()) {
            System.out.println("Funcionário encontrado ID: " + id);
            return ResponseEntity.ok(funcionarioOpt.get());
        } else {
            System.err.println("Funcionário não encontrado ID: " + id);
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deletar/{id}")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<Void> deletarFuncionario(@PathVariable Long id) {
        try {

            Funcionario funcionario = useCase.buscarFuncionarioPorId(id)
                    .orElseThrow(() -> new NotFoundException("Funcionário não encontrado com id: " + id));

            useCase.deletarFuncionario(id);
            System.out.println("Funcionário deletado com sucesso. ID: " + id);
            return ResponseEntity.noContent().build();

        } catch (NotFoundException e) {
            System.err.println("Erro ao deletar funcionário: " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

//    @PostMapping
//    public ResponseEntity<FuncionarioResponse> create(@RequestBody @Valid FuncionarioRequest req) {
//        Funcionario d = new Funcionario();
//        d.setNome(req.getNome());
//        d.setSobrenome(req.getSobrenome());
//        d.setCargo(req.getCargo());
//        d.setEmail(req.getEmail());
//        d.setSenha(req.getSenha());
//        d.setTelefone(req.getTelefone());
//        if (req.getCrecheId() != null) {
//            Creche c = new Creche(); c.setId(req.getCrecheId()); d.setCreche(c);
//        }
//
//        Funcionario saved = useCase.criar(d);
//        FuncionarioResponse r = new FuncionarioResponse();
//        r.setId(saved.getId()); r.setNome(saved.getNome()); r.setSobrenome(saved.getSobrenome()); r.setEmail(saved.getEmail()); r.setTelefone(saved.getTelefone());
//        if (saved.getCreche() != null) r.setCrecheId(saved.getCreche().getId());
//
//        return ResponseEntity.created(URI.create("/api/funcionarios_v2/" + r.getId())).body(r);
//    }
}
