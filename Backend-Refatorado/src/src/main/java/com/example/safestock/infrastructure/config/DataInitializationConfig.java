package com.example.safestock.infrastructure.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("dev") // Só executa no profile de desenvolvimento
public class DataInitializationConfig {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializationConfig.class);

    /*
    @Bean
    public CommandLineRunner initData(
            CrecheRepository crecheRepository,
            FuncionarioRepository funcionarioRepository,
            ProdutoRepository produtoRepository,
            RegistroUsoRepository registroUsoRepository) {
        
        return args -> {
            // Verifica se já existem dados para evitar duplicação
            if (crecheRepository.count() > 0) {
                logger.info("Dados já existem no banco. Pulando inicialização.");
                return;
            }

            logger.info("Iniciando inserção de dados iniciais...");

            // Aqui você pode implementar a lógica de inserção dos dados
            // usando as entidades e repositórios do JPA
            
            logger.info("Dados iniciais inseridos com sucesso!");
        };
    }
    */
}