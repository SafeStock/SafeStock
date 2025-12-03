package com.example.safestock.application.service;

import com.example.safestock.application.port.in.RegistroUsoUseCase;
import com.example.safestock.application.port.out.RegistroUsoRepository;
import com.example.safestock.domain.model.PagedResult;
import com.example.safestock.domain.model.RegistroUso;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RegistroUsoService implements RegistroUsoUseCase {

    private final RegistroUsoRepository registroUsoRepository;

    public RegistroUsoService(RegistroUsoRepository registroUsoRepository) {
        this.registroUsoRepository = registroUsoRepository;
    }

    @Override
    public RegistroUso criar(RegistroUso registroUso) {
        return registroUsoRepository.save(registroUso);
    }

    @Override
    public List<RegistroUso> listar() {
        return registroUsoRepository.findAll();
    }

    @Override
    public void deletar(Long id) {
        registroUsoRepository.deleteById(id);
    }

    @Override
    public PagedResult<RegistroUso> listarPaginado(int page, int size) {
        List<RegistroUso> all = new java.util.ArrayList<>(registroUsoRepository.findAll());
        
        // Ordena por data mais recente primeiro (DESC)
        all.sort((r1, r2) -> {
            if (r1.getDataHoraSaida() == null) return 1;
            if (r2.getDataHoraSaida() == null) return -1;
            return r2.getDataHoraSaida().compareTo(r1.getDataHoraSaida());
        });
        
        int start = page * size;
        int end = Math.min(start + size, all.size());
        
        if (start >= all.size()) {
            return new PagedResult<>(List.of(), page, size, all.size());
        }
        
        List<RegistroUso> pageContent = all.subList(start, end);
        return new PagedResult<>(pageContent, page, size, all.size());
    }

    public Long contarProdutosRetiradosDoEstoqueMesAtual() {
        LocalDate agora = LocalDate.now();
        return registroUsoRepository.sumQuantidadeRegistroDeUsoMes(agora.getYear(), agora.getMonthValue());
    }

    public List<java.util.Map<String, Object>> buscarRegistrosComoMapa(String month) {
        java.time.format.DateTimeFormatter formatter = java.time.format.DateTimeFormatter.ofPattern("yyyy-MM");
        List<RegistroUso> registros = registroUsoRepository.findAll();
        return registros.stream()
            .filter(registro -> {
                if (month == null) return true;
                if (registro.getDataHoraSaida() == null) return false;
                String dataSaida = registro.getDataHoraSaida().format(formatter);
                return dataSaida.equals(month);
            })
            .map(registro -> {
                java.util.Map<String, Object> map = new java.util.HashMap<>();
                map.put("Id", registro.getId());
                map.put("Data", registro.getDataHoraSaida());
                map.put("Quantidade", registro.getQuantidade());
                map.put("Produto", registro.getProduto());
                map.put("Responsável", registro.getFuncionario() != null ? 
                    registro.getFuncionario().getNome() + " " + registro.getFuncionario().getSobrenome() : 
                    "Não informado");
                return map;
            })
            .toList();
    }
}
