-- Dados iniciais para o SafeStock
-- Este arquivo será executado automaticamente pelo Spring Boot na inicialização

-- Inserindo Creche
INSERT INTO creche (nome, endereco, telefone, cnpj) VALUES ('CEI Terra Nossa', 'R. José Barros Magaldi, 216 - Jardim Sao Joao, São Paulo', '11985511715', '19283746000122');

-- Inserindo 25 Funcionários (APENAS Francisco é DONO)
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Francisco', 'Silva', 'dono', 'francisco@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11999998888', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Mariana', 'Souza', 'administracao', 'mariana@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11988887777', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Roberta', 'Ferreira', 'limpeza', 'roberta@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11977776666', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Joao', 'Pereira', 'limpeza', 'joao@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11966665555', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Ana', 'Lima', 'administracao', 'ana@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11955554444', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Carlos', 'Almeida', 'limpeza', 'carlos@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11944443333', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Pedro', 'Gomes', 'administracao', 'pedro@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11933332222', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Beatriz', 'Rocha', 'limpeza', 'beatriz@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11922221111', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Lucas', 'Martins', 'administracao', 'lucas@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11911110000', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Sofia', 'Pinto', 'limpeza', 'sofia@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11999990000', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Mateus', 'Costa', 'administracao', 'mateus@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11988880000', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Marina', 'Dias', 'limpeza', 'marina@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11977770000', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Thiago', 'Ribeiro', 'administracao', 'thiago@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11966660000', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Paula', 'Mendes', 'limpeza', 'paula@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11955550000', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Renata', 'Oliveira', 'administracao', 'renata@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11944440000', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Felipe', 'Cardoso', 'limpeza', 'felipe@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11933330000', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Daniela', 'Santos', 'administracao', 'daniela@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11922220000', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Gustavo', 'Araujo', 'limpeza', 'gustavo@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11911112222', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Camila', 'Barbosa', 'administracao', 'camila@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11900001111', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Rafael', 'Nunes', 'limpeza', 'rafael@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11912121212', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Bruna', 'Vasconcelos', 'administracao', 'bruna@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11913131313', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Eduardo', 'Leal', 'limpeza', 'eduardo@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11914141414', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Vanessa', 'Ferraz', 'administracao', 'vanessa@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11915151515', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Ricardo', 'Moreira', 'limpeza', 'ricardo@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11916161616', 1);
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES ('Leticia', 'Castro', 'administracao', 'leticia@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11917171717', 1);

-- Inserindo 20 Produtos
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Detergente', 'chao', 50, 30, '2025-10-01', '2025-05-01 08:30:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Desinfetante', 'multi_uso', 40, 20, '2026-09-10', '2025-05-05 09:00:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Multiuso', 'vidros', 60, 35, '2030-06-20', '2025-05-10 10:15:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Limpa Vidros', 'chao', 30, 15, '2025-11-30', '2025-05-15 11:20:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Alcool Gel', 'vidros', 70, 50, '2025-08-01', '2025-05-20 12:45:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Sabao Liquido', 'multi_uso', 45, 55, '2026-01-15', '2025-05-25 13:30:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Amaciante', 'vidros', 65, 60, '2027-06-25', '2025-05-30 14:00:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Lustra Moveis', 'chao', 35, 25, '2025-09-05', '2025-06-01 15:10:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Desengordurante', 'multi_uso', 55, 70, '2025-10-10', '2025-06-05 16:25:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Cloro', 'vidros', 75, 80, '2025-11-15', '2025-06-10 08:00:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Limpa Metais', 'chao', 25, 10, '2027-07-20', '2025-06-15 09:30:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Odorizador', 'multi_uso', 50, 45, '2025-09-22', '2025-06-20 10:45:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Inseticida', 'vidros', 40, 30, '2028-07-30', '2025-06-25 11:15:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Tira Manchas', 'chao', 60, 65, '2029-08-01', '2025-06-30 12:00:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Limpador de Piso', 'multi_uso', 70, 75, '2030-08-05', '2025-07-01 13:20:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Sabonete Liquido', 'chao', 55, 60, '2031-07-30', '2025-06-05 14:35:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Pano de Limpeza', 'multi_uso', 80, 90, '2030-08-10', '2025-07-10 15:50:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Esponja de Aco', 'vidros', 30, 20, '2025-08-15', '2025-07-15 16:10:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Desodorizador', 'chao', 45, 50, '2025-09-20', '2025-07-20 08:25:00', 1);
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES ('Cera Liquida', 'multi_uso', 60, 70, '2025-09-25', '2025-07-25 09:40:00', 1);

-- Inserindo 19 Registros de Uso (funcionarios ID 4 e 5)
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-05-24 10:00:00', '2025-06-01', 'Detergente', 10, 4);
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-05-25 11:00:00', '2026-09-10', 'Desinfetante', 8, 5);
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-05-26 12:00:00', '2030-06-20', 'Multiuso', 12, 4);
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-05-27 13:00:00', '2025-11-30', 'Limpa Vidros', 6, 5);
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-05-28 14:00:00', '2025-08-01', 'Alcool Gel', 15, 4);
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-05-29 15:00:00', '2026-01-15', 'Sabao Liquido', 20, 5);
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-05-30 16:00:00', '2027-06-25', 'Amaciante', 18, 4);
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-05-31 17:00:00', '2025-09-05', 'Lustra Moveis', 7, 5);
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-06-01 18:00:00', '2025-10-10', 'Desengordurante', 22, 4);
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-06-02 10:30:00', '2025-11-15', 'Cloro', 25, 5);
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-06-03 11:30:00', '2027-07-20', 'Limpa Metais', 5, 4);
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-06-04 12:30:00', '2025-09-22', 'Odorizador', 13, 5);
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-06-05 13:30:00', '2028-07-30', 'Inseticida', 9, 4);
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-06-06 14:30:00', '2029-08-01', 'Tira Manchas', 16, 5);
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-06-07 15:30:00', '2030-08-05', 'Limpador de Piso', 19, 4);
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-06-08 16:30:00', '2031-07-30', 'Sabonete Liquido', 17, 5);
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-06-09 17:30:00', '2030-08-10', 'Pano de Limpeza', 24, 4);
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-06-10 18:30:00', '2025-08-15', 'Esponja de Aco', 4, 5);
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES ('2025-06-11 10:00:00', '2025-09-25', 'Cera Liquida', 14, 4);

-- Inserindo 15 Históricos de Alertas
INSERT INTO historico_alertas (data_hora, descricao, lido, categoria_alerta, fk_produto) VALUES ('2025-05-20 08:00:00', 'Estoque baixo de Detergente', false, 'produto_acabando', 1);
INSERT INTO historico_alertas (data_hora, descricao, lido, categoria_alerta, fk_produto) VALUES ('2025-05-21 09:00:00', 'Desinfetante próximo ao vencimento', false, 'validade_produto', 2);
INSERT INTO historico_alertas (data_hora, descricao, lido, categoria_alerta, fk_produto) VALUES ('2025-05-22 10:00:00', 'Multiuso excedeu limite de uso', false, 'uso_anormal', 3);
INSERT INTO historico_alertas (data_hora, descricao, lido, categoria_alerta, fk_produto) VALUES ('2025-05-23 11:00:00', 'Limpa Vidros com estoque crítico', false, 'produto_acabando', 4);
INSERT INTO historico_alertas (data_hora, descricao, lido, categoria_alerta, fk_produto) VALUES ('2025-05-24 12:00:00', 'Alcool Gel vencendo em 7 dias', false, 'validade_produto', 5);
INSERT INTO historico_alertas (data_hora, descricao, lido, categoria_alerta, fk_produto) VALUES ('2025-05-25 13:00:00', 'Sabao Liquido com uso excessivo', false, 'uso_anormal', 6);
INSERT INTO historico_alertas (data_hora, descricao, lido, categoria_alerta, fk_produto) VALUES ('2025-05-26 14:00:00', 'Amaciante em baixa quantidade', false, 'produto_acabando', 7);
INSERT INTO historico_alertas (data_hora, descricao, lido, categoria_alerta, fk_produto) VALUES ('2025-05-27 15:00:00', 'Lustra Moveis próximo à validade', false, 'validade_produto', 8);
INSERT INTO historico_alertas (data_hora, descricao, lido, categoria_alerta, fk_produto) VALUES ('2025-05-28 16:00:00', 'Desengordurante excedeu limite', false, 'uso_anormal', 9);
INSERT INTO historico_alertas (data_hora, descricao, lido, categoria_alerta, fk_produto) VALUES ('2025-05-29 17:00:00', 'Cloro com estoque muito baixo', false, 'produto_acabando', 10);
INSERT INTO historico_alertas (data_hora, descricao, lido, categoria_alerta, fk_produto) VALUES ('2025-05-30 08:30:00', 'Limpa Metais vencendo', false, 'validade_produto', 11);
INSERT INTO historico_alertas (data_hora, descricao, lido, categoria_alerta, fk_produto) VALUES ('2025-05-31 09:30:00', 'Odorizador com uso anormal', false, 'uso_anormal', 12);
INSERT INTO historico_alertas (data_hora, descricao, lido, categoria_alerta, fk_produto) VALUES ('2025-06-01 10:30:00', 'Inseticida acabando', false, 'produto_acabando', 13);
INSERT INTO historico_alertas (data_hora, descricao, lido, categoria_alerta, fk_produto) VALUES ('2025-06-02 11:30:00', 'Tira Manchas próximo ao vencimento', false, 'validade_produto', 14);
INSERT INTO historico_alertas (data_hora, descricao, lido, categoria_alerta, fk_produto) VALUES ('2025-06-03 12:30:00', 'Limpador de Piso uso excessivo', false, 'uso_anormal', 15);
