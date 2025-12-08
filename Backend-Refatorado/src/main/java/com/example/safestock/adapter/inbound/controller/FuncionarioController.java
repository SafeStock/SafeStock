package com.example.safestock.adapter.inbound.controller;

import com.example.safestock.adapter.inbound.dto.FuncionarioResponse;
import com.example.safestock.adapter.inbound.dto.FuncionarioCadastro;
import com.example.safestock.adapter.inbound.dto.FuncionarioAtualizar;
import com.example.safestock.adapter.outbound.error.NotFoundException;
import com.example.safestock.application.port.in.FuncionarioUseCase;
import com.example.safestock.domain.model.Funcionario;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/funcionarios")
@CrossOrigin(origins = "http://localhost:5173")
public class FuncionarioController {

    private final FuncionarioUseCase useCase;

    public FuncionarioController(FuncionarioUseCase useCase) {
        this.useCase = useCase;
    }

    @GetMapping
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<List<FuncionarioResponse>> listarFuncionarios() {
        String emailLogado = SecurityContextHolder.getContext().getAuthentication().getName();
        List<FuncionarioResponse> funcionarios = useCase.buscarFuncionariosExcetoLogadoEDono(emailLogado);

        if (funcionarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(funcionarios);
    }

    @GetMapping("/paged")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<com.example.safestock.adapter.inbound.dto.PagedResponse<FuncionarioResponse>> listarFuncionariosPaginado(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        
        String emailLogado = SecurityContextHolder.getContext().getAuthentication().getName();
        com.example.safestock.domain.model.PagedResult<FuncionarioResponse> result = 
                useCase.buscarFuncionariosExcetoLogadoEDonoPaginado(emailLogado, page, size);

        if (result.getContent().isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(com.example.safestock.adapter.inbound.dto.PagedResponse.from(result));
    }

    @GetMapping("/listar/{id}")
    @SecurityRequirement(name = "Bearer")
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

    // NOVO: Método para cadastrar funcionário
    @PostMapping("/cadastro")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<FuncionarioResponse> cadastrarFuncionario(@Valid @RequestBody FuncionarioCadastro funcionarioCadastro) {
        try {
            FuncionarioResponse funcionarioCriado = useCase.cadastrarFuncionario(funcionarioCadastro);
            return ResponseEntity
                    .created(URI.create("/api/funcionarios/listar/" + funcionarioCriado.getId()))
                    .body(funcionarioCriado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // NOVO: Método para atualizar funcionário
    @PutMapping("/atualizar/{id}")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<FuncionarioResponse> atualizarFuncionario(
            @PathVariable Long id,
            @Valid @RequestBody FuncionarioAtualizar funcionarioAtualizar) {
        try {
            FuncionarioResponse funcionarioAtualizado = useCase.atualizarFuncionario(id, funcionarioAtualizar);
            return ResponseEntity.ok(funcionarioAtualizado);
        } catch (IllegalArgumentException e) {
            if (e.getMessage().contains("não encontrado")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.badRequest().build();
        }
    }
}