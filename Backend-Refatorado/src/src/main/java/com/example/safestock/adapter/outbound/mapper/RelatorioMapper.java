package com.example.safestock.adapter.outbound.mapper;

import com.example.safestock.domain.model.HistoricoAlertas;
import com.example.safestock.domain.model.Produto;
import com.example.safestock.domain.model.RegistroUso;
import com.example.safestock.domain.model.Relatorio;
import com.example.safestock.infrastructure.entity.HistoricoAlertasEntity;
import com.example.safestock.infrastructure.entity.ProdutoEntity;
import com.example.safestock.infrastructure.entity.RegistroUsoEntity;
import com.example.safestock.infrastructure.entity.RelatorioEntity;

public class RelatorioMapper {

    public static RelatorioEntity toEntity(Relatorio d) {
        if (d == null) return null;
        RelatorioEntity e = new RelatorioEntity();
        e.setIdRelatorio(d.getIdRelatorio());
        e.setDataRelatorio(d.getDataRelatorio());

        if (d.getProduto() != null) {
            ProdutoEntity pe = new ProdutoEntity();
            pe.setId(d.getProduto().getId());
            e.setProduto(pe);
        }

        if (d.getRegistroUso() != null) {
            RegistroUsoEntity re = new RegistroUsoEntity();
            re.setId(d.getRegistroUso().getId());
            e.setRegistroUso(re);
        }

        if (d.getAlerta() != null) {
            HistoricoAlertasEntity he = new HistoricoAlertasEntity();
            he.setId(d.getAlerta().getId());
            e.setAlerta(he);
        }

        return e;
    }

    public static Relatorio toDomain(RelatorioEntity e) {
        if (e == null) return null;
        Relatorio d = new Relatorio();
        d.setIdRelatorio(e.getIdRelatorio());
        d.setDataRelatorio(e.getDataRelatorio());

        if (e.getProduto() != null) {
            Produto p = new Produto();
            p.setId(e.getProduto().getId());
            p.setNome(e.getProduto().getNome());
            d.setProduto(p);
        }

        if (e.getRegistroUso() != null) {
            RegistroUso ru = new RegistroUso();
            ru.setId(e.getRegistroUso().getId());
            ru.setProduto(e.getRegistroUso().getProduto());
            d.setRegistroUso(ru);
        }

        if (e.getAlerta() != null) {
            HistoricoAlertas ha = new HistoricoAlertas();
            ha.setId(e.getAlerta().getId());
            ha.setDescricao(e.getAlerta().getDescricao());
            d.setAlerta(ha);
        }

        return d;
    }
}
