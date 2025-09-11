package com.example.safestock.config;

import com.example.safestock.service.AutenticacaoService;
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

        // Se for um endpoint de KPI, pula a validação JWT
        if (request.getRequestURI().startsWith("/api/produtos/kpi/")) {
            filterChain.doFilter(request, response);
            return;
        }

        String username = null;
        String jwtToken = null;
        String requestTokenHeader = request.getHeader("Authorization");

        if (Objects.nonNull(requestTokenHeader) && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);

            if (jwtToken.chars().filter(ch -> ch == '.').count() != 2) {
                LOGGER.error("[Falha Autenticacao] - Token JWT mal formado: {}", jwtToken);
                sendJsonError(response, HttpServletResponse.SC_UNAUTHORIZED, "Token JWT mal formado.");
                return;
            }

            try {
                username = jwtTokenManager.getUsernameFromToken(jwtToken);
            } catch (ExpiredJwtException exception) {
                LOGGER.info("[Falha Autenticacao] - Token expirado, usuario: {} - {}",
                        exception.getClaims().getSubject(), exception.getMessage());
                sendJsonError(response, HttpServletResponse.SC_UNAUTHORIZED, "Token expirado. Faça login novamente.");
                return;
            } catch (Exception exception) {
                LOGGER.error("[Falha Autenticacao] - Erro no processamento do token: {}", exception.getMessage(), exception);
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"message\": \"Token inválido ou erro de autenticação.\"}");
                return;
            }
        }

        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            addUsernameInContext(request, username, jwtToken);
        }

        filterChain.doFilter(request, response);
    }


    private void addUsernameInContext(HttpServletRequest request, String username, String jwtToken){
        UserDetails userDetails = autenticacaoService.loadUserByUsername(username);

        if(jwtTokenManager.validateToken(jwtToken, userDetails)){
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
    }

    private void sendJsonError(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.getWriter().write("{\"message\": \"" + message + "\"}");
    }

}
