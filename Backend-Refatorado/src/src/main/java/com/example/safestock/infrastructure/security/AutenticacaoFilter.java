package com.example.safestock.infrastructure.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class AutenticacaoFilter extends OncePerRequestFilter {

    private final GerenciadorTokenJwt tokenService;
    private final UserDetailsService userDetailsService;

    private final AntPathMatcher matcher = new AntPathMatcher();

    // Endpoints públicos (não passam no filtro)
    private final List<String> publicMatchers = List.of(
            "/auth/**",
            "/api/funcionarios/login/**",
            "/api/produtos/kpi/**",
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/h2-console/**",
            "/error/**"
    );

    public AutenticacaoFilter(GerenciadorTokenJwt tokenService, UserDetailsService userDetailsService) {
        this.tokenService = tokenService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return publicMatchers.stream().anyMatch(p -> matcher.match(p, path));
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
            try {
                username = tokenService.extrairUsername(token);
            } catch (Exception e) {
                // token inválido/expirado — apenas segue sem autenticar
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // carrega o usuário
            UserDetails user = userDetailsService.loadUserByUsername(username);

            if (tokenService.tokenValido(token, user)) {
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        filterChain.doFilter(request, response);
    }
}
