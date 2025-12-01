package com.example.safestock.infrastructure.security;

import com.example.safestock.domain.model.Funcionario;
import com.example.safestock.infrastructure.jpa.JpaFuncionarioRepository;
import com.example.safestock.adapter.outbound.mapper.FuncionarioMapper;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final JpaFuncionarioRepository funcionarioRepository;

    public CustomUserDetailsService(JpaFuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Funcionario funcionario = funcionarioRepository.findByEmail(email)
                .map(FuncionarioMapper::toDomain)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + email));

        return User.withUsername(funcionario.getEmail())
                .password(funcionario.getSenha())
                .roles("USER") // futuramente pode vir de um campo "cargo" no funcionário
                .build();
    }
}
