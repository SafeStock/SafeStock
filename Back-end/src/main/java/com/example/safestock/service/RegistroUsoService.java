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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public Page<com.example.safestock.dto.RegistroUsoDTO> listarPaginado(int page, int size) {
        // Order by dataHoraSaida descending (most recent first) for paged usage history
        Pageable pageable = PageRequest.of(page, size, Sort.by("dataHoraSaida").descending());
        return registroUsoRepository.findAll(pageable).map(RegistroUsoDTO::new);
    }

    // List registros for a given month ordered by dataValidade ascending
    public List<com.example.safestock.dto.RegistroUsoDTO> listarPorMesOrdenadoPorValidade(int ano, int mes) {
        List<RegistroUso> registros = registroUsoRepository.findAll();
        return registros.stream()
                .filter(r -> r.getDataHoraSaida() != null && r.getDataHoraSaida().getYear() == ano && r.getDataHoraSaida().getMonthValue() == mes)
                .sorted((a, b) -> {
                    if (a.getDataValidade() == null) return 1;
                    if (b.getDataValidade() == null) return -1;
                    return a.getDataValidade().compareTo(b.getDataValidade());
                })
                .map(com.example.safestock.dto.RegistroUsoDTO::new)
                .toList();
    }
}
