package com.example.safestock.model;

import com.example.safestock.model.enums.TipoCreche;
import jakarta.persistence.*;

@Entity
@Table(name="creche")
public class Creche {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String endereco;
    private String telefone;
    private String cnpj;
    private TipoCreche tipoCreche;

    public Creche() {};
    public Creche(String nome, String endereco, String telefone, String cnpj, TipoCreche tipoCreche) {
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.cnpj = cnpj;
        this.tipoCreche = tipoCreche;
    };

}
