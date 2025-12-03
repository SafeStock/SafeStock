package com.example.safestock.infrastructure.config;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

import javax.sql.DataSource;

@Configuration
public class DataLoader {

    private final DataSource dataSource;

    public DataLoader(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void loadData() {
        // Verifica se a tabela Funcionario está vazia
        try (var connection = dataSource.getConnection();
             var statement = connection.createStatement();
             var resultSet = statement.executeQuery("SELECT COUNT(*) FROM Funcionario")) {
            
            if (resultSet.next() && resultSet.getInt(1) == 0) {
                System.out.println("📦 Tabelas vazias detectadas! Executando data.sql...");
                
                ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
                populator.addScript(new ClassPathResource("data.sql"));
                populator.setContinueOnError(true);
                populator.execute(dataSource);
                
                System.out.println("✅ Dados iniciais carregados com sucesso!");
            } else {
                System.out.println("ℹ️ Banco já contém dados. Pulando inicialização.");
            }
        } catch (Exception e) {
            System.err.println("⚠️ Erro ao verificar/popular banco: " + e.getMessage());
        }
    }
}
