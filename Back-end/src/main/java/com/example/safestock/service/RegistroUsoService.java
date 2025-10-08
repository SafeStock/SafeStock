package com.example.safestock.service;

import com.example.safestock.dto.RegistroUsoDTO;
import com.example.safestock.model.Funcionario;
import com.example.safestock.model.RegistroUso;
import com.example.safestock.repository.RegistroUsoRepository;
import com.example.safestock.repository.FuncionarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    public List<Map<String, Object>> buscarRegistrosComoMapa(String month) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
        List<RegistroUso> registros = registroUsoRepository.findAll();
        return registros.stream()
            .filter(registro -> {
                if (month == null) return true;
                String dataSaida = registro.getDataHoraSaida().format(formatter);
                return dataSaida.equals(month);
            })
            .map(registro -> {
                Map<String, Object> map = new HashMap<>();
                map.put("Id", registro.getId());
                map.put("Data", registro.getDataHoraSaida());
                map.put("Quantidade", registro.getQuantidade());
                map.put("Produto", registro.getProduto());
                map.put("Responsável", registro.getFuncionario() != null ? registro.getFuncionario().getNome() : "Não informado");
                return map;
            })
            .toList();
    }
}
