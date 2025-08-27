package com.example.safestock.infrastructure.config;

import com.example.safestock.core.application.usecase.AutenticacaoService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.userdetails.UserDetails;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import java.util.Objects;
import org.slf4j.Logger;
import jakarta.servlet.ServletException;
import java.io.IOException;


public class AutenticacaoFilter extends OncePerRequestFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(AutenticacaoFilter.class);

    private final AutenticacaoService autenticacaoService;

    private final GerenciadorTokenJwt jwtTokenManager;

    public AutenticacaoFilter(AutenticacaoService autenticacaoService, GerenciadorTokenJwt jwtTokenManager) {
        this.autenticacaoService = autenticacaoService;
        this.jwtTokenManager = jwtTokenManager;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String username = null;
        String jwtToken = null;

        String requestTokenHeader = request.getHeader("Authorization");

        if (Objects.nonNull(requestTokenHeader) && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7); // Remove o prefixo "Bearer"
            if (jwtToken.chars().filter(ch -> ch == '.').count() != 2) {
                LOGGER.error("[Falha Autenticacao] - Token JWT mal formado: {}", jwtToken);
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"message\": \"Token JWT mal formado.\"}");
                return; // interrompe o processamento do filtro para evitar exceção
            }
            try {
                username = jwtTokenManager.getUsernameFromToken(jwtToken);
            } catch (ExpiredJwtException exception) {
                LOGGER.info("[Falha Autenticacao] - Token expirado, usuario: {} - {}",
                        exception.getClaims().getSubject(), exception.getMessage());

                LOGGER.trace("[Falha Autenticacao] - stack trace: ", exception);

                // Resposta estruturada para o erro de expiração do token
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // Status 401 (não autorizado)
                response.setContentType("application/json"); // Definindo o tipo de conteúdo da resposta

                // Criando um JSON de resposta
                String jsonResponse = "{\"message\": \"Token expirado. Por favor, faça login novamente.\"}";

                // Enviando a resposta de erro
                response.getWriter().write(jsonResponse);
                return; // Importante para interromper o fluxo e não continuar o filtro
            } catch (Exception exception) {
                // Outras exceções podem ser tratadas aqui
                LOGGER.error("[Falha Autenticacao] - Erro no processamento do token: {}", exception.getMessage(), exception);
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("{\"message\": \"Erro interno no servidor.\"}");
                return;
            }
        }

        // Se o token for válido e o usuário não estiver autenticado, adiciona o usuário no contexto de segurança
        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            addUsernameInContext(request, username, jwtToken);
        }

        // Continua a cadeia de filtros, permitindo que a requisição siga para o próximo filtro
        filterChain.doFilter(request, response);
    }

    private void addUsernameInContext(HttpServletRequest request, String username, String jwtToken){
        UserDetails userDatails = autenticacaoService.loadUserByUsername(username);

        if(jwtTokenManager.validateToken(jwtToken, userDatails)){
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                    userDatails, null, userDatails.getAuthorities());

            usernamePasswordAuthenticationToken
                    .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        }
    }
}