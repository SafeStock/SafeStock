package com.example.safestock.dto;

import com.example.safestock.model.Funcionario;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

public class FuncionarioDetalhesDTO implements UserDetails {

    private final String nome;
    private final String email;
    private final String senha;
    private final Collection<? extends GrantedAuthority> authorities;

    public FuncionarioDetalhesDTO(Funcionario funcionario) {
        this.nome = funcionario.getNome();
        this.email = funcionario.getEmail();
        this.senha = funcionario.getSenha();
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
