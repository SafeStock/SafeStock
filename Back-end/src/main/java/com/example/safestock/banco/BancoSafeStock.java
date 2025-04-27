package com.example.safestock.banco;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class BancoSafeStock {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306";
        String user = "safeStock"; // ou seu usuário
        String password = "22323319"; // sua senha

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {

            // Cria o banco de dados
            String sql = "CREATE DATABASE IF NOT EXISTS SafeStock";
            stmt.executeUpdate(sql);
            System.out.println("Banco de dados criado!");

            // Usa o banco de dados
            stmt.executeUpdate("USE SafeStock");

            // Cria a tabela
            String sqlTabela = "CREATE TABLE IF NOT EXISTS produtos ("
                    + "id INT PRIMARY KEY AUTO_INCREMENT, "
                    + "nome VARCHAR(100), "
                    + "preco DECIMAL(10, 2)"
                    + ")";
            stmt.executeUpdate(sqlTabela);
            System.out.println("Tabela criada!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}