package com.example.safestock.config;

import com.example.safestock.service.AutenticacaoService;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AutenticacaoProvider {

    private final AutenticacaoService funcionarioAutorizadoService;
    private final PasswordEncoder passwordEncoder;

    public AutenticacaoProvider(AutenticacaoService funcionarioAutorizadoService,PasswordEncoder passwordEncoder){
        this.funcionarioAutorizadoService = funcionarioAutorizadoService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication authenticate(final Authentication authentication) throws AuthenticationException {

        final String username = authentication.getEmail();
        final String password = authentication.getSenha();

        UserDetails userDetails = this.funcionarioAutorizadoService.loadUserByUsername(username);

        if(this.passwordEncoder.matches(password, userDetails.getPassword())) {
        return new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
        } else {
            throw new BadCredentialsException("Usuario ou Senha inválidos");
        }

    }


    @Override
    public boolean supports(final Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
