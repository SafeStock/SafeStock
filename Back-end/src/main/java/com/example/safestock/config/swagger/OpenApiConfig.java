package com.example.safestock.config.swagger;

import io.swagger.v3.oas.annotations.*;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Projeto SafeStock",
                description = "O projeto SafeStock é um sistema de controle de estoque, que organiza o consumo, evita desperdícios e facilita a compra e reposição de produtos essenciais.",
                contact = @Contact(
                        name = "Guilherme, Mayara, Samuel, Rayane, Pedro e Yasmin",
                        url = "https://github.com/SafeStock/SafeStock"
                ),

                license = @License(name = "UNLICENSED"),
                version = "1.0.0"
        )
)
@SecurityScheme(
        name = "Bearer", type = SecuritySchemeType.HTTP,scheme = "bearer", bearerFormat = "JWT"
)
public class OpenApiConfig {
}