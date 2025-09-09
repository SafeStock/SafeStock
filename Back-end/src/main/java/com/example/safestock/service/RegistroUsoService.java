package com.example.safestock.service;

import com.example.safestock.dto.RegistroUsoDTO;
import com.example.safestock.model.Funcionario;
import com.example.safestock.model.RegistroUso;
import com.example.safestock.repository.RegistroUsoRepository;
import com.example.safestock.repository.FuncionarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
@Service
public class RegistroUsoService {
    private final RegistroUsoRepository registroUsoRepository;
    private final FuncionarioService funcionarioService;

    public RegistroUsoService(RegistroUsoRepository registroUsoRepository, FuncionarioService funcionarioService) {
        this.registroUsoRepository = registroUsoRepository;
        this.funcionarioService = funcionarioService;
    }

    public RegistroUso registrarUso(RegistroUso registroUso, Long funcionarioId) {
        Funcionario funcionario = funcionarioService.getByIdOrThrow(funcionarioId);
        registroUso.setFuncionario(funcionario);
        return registroUsoRepository.save(registroUso);
    }


    public List<RegistroUsoDTO> listarRegistrosUso() {
        return registroUsoRepository.findAll()
                .stream()
                .map(RegistroUsoDTO::new)
                .toList();
    }

    public Long contarProdutosRetiradosDoEstoqueMesAtual() {
        LocalDate hoje = LocalDate.now();
        int ano = hoje.getYear();
        int mes = hoje.getMonthValue();

        Long total = registroUsoRepository.sumQuantidadeRegistroDeUsoMes(ano, mes);
        return total != null ? total : 0L;
    }


    @Transactional
    public void deletarRegistroUso(Long id) {
        registroUsoRepository.deleteRelatoriosByRegistroUsoId(id);
        registroUsoRepository.deleteById(id);
    }

    public void deletarRegistro(Long id) {
        registroUsoRepository.deleteById(id);
    }
}
