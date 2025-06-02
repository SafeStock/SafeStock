package com.example.safestock.controller;

import com.example.safestock.model.Produto;
import com.example.safestock.service.KpiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kpis")
public class KPIController {
    @Autowired
    private KpiService kpiService;

    @GetMapping("/produtos-proximos-ao-limite")
    public List<Produto> getProdutosProximosAoLimite() {
        return kpiService.getProdutosProximosAoLimite();
    }
}
