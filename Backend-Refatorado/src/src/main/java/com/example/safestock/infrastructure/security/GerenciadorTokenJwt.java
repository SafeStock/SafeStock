package com.example.safestock.infrastructure.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.security.core.userdetails.UserDetails;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class GerenciadorTokenJwt {

    private final SecretKey secretKey;
    private final long expirationMs;

    public GerenciadorTokenJwt(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.validity}") long expirationMs
    ) {
        // chave com no mínimo 32 chars
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
    }

    public String gerarToken(UserDetails user) {
        Date agora = new Date();
        Date validade = new Date(agora.getTime() + expirationMs);

        return Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(agora)
                .setExpiration(validade)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extrairUsername(String token) {
        return parseClaims(token).getSubject();
    }

    public boolean tokenValido(String token, UserDetails user) {
        try {
            final String username = extrairUsername(token);
            return username != null && username.equals(user.getUsername()) && !isExpired(token);
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    private boolean isExpired(String token) {
        return parseClaims(token).getExpiration().before(new Date());
    }

    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}