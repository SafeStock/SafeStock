package com.example.safestock.infrastructure.security;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.security.*;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    public static final String BEARER_KEY = "BearerAuth";

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(
                        new Info()
                                .title("SafeStock API")
                                .version("v1")
                                .description("API do SafeStock com autenticação JWT")
                )
                .components(
                        new Components()
                                .addSecuritySchemes(BEARER_KEY,
                                        new SecurityScheme()
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                )
                )
                .addSecurityItem(
                        new SecurityRequirement().addList(BEARER_KEY)
                );
    }
}
