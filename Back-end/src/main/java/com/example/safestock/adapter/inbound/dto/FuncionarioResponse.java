package com.example.safestock.adapter.inbound.dto;

public class FuncionarioResponse {

    private Long id;
    private String nome;
    private String sobrenome;
    private String email;
    private String telefone;
    private Long crecheId;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getSobrenome() { return sobrenome; }
    public void setSobrenome(String sobrenome) { this.sobrenome = sobrenome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    public Long getCrecheId() { return crecheId; }
    public void setCrecheId(Long crecheId) { this.crecheId = crecheId; }
}
