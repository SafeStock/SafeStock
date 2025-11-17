
-- Inserindo dados na tabela creche
INSERT INTO creche (nome, endereco, telefone, cnpj) VALUES
('CEI Terra Nossa', 'R. Jose Barros Magaldi, 216 - Jardim Sao Joao, Sao Paulo', '(11) 5851-1715', '19283746000122');

-- Inserindo funcionarios
INSERT INTO funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_creche) VALUES
('Francisco', 'Silva', 0, 'francisco@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11999998888', 1),
('Mariana', 'Souza', 1, 'mariana@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11988887777', 1),
('Roberta', 'Ferreira', 2, 'roberta@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11977776666', 1),
('Joao', 'Pereira', 2, 'joao@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11966665555', 1),
('Ana', 'Lima', 1, 'ana@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11955554444', 1),
('Carlos', 'Almeida', 2, 'carlos@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11944443333', 1),
('Pedro', 'Gomes', 1, 'pedro@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11933332222', 1),
('Beatriz', 'Rocha', 2, 'beatriz@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11922221111', 1),
('Lucas', 'Martins', 1, 'lucas@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11911110000', 1),
('Sofia', 'Pinto', 2, 'sofia@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11999990000', 1),
('Mateus', 'Costa', 1, 'mateus@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11988880000', 1),
('Marina', 'Dias', 2, 'marina@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11977770000', 1),
('Thiago', 'Ribeiro', 1, 'thiago@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11966660000', 1),
('Paula', 'Mendes', 2, 'paula@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11955550000', 1),
('Renata', 'Oliveira', 1, 'renata@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11944440000', 1),
('Felipe', 'Cardoso', 2, 'felipe@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11933330000', 1),
('Daniela', 'Santos', 1, 'daniela@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11922220000', 1),
('Gustavo', 'Araujo', 2, 'gustavo@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11911112222', 1),
('Camila', 'Barbosa', 1, 'camila@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11900001111', 1),
('Rafael', 'Nunes', 2, 'rafael@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11912121212', 1),
('Bruna', 'Vasconcelos', 1, 'bruna@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11913131313', 1),
('Eduardo', 'Leal', 2, 'eduardo@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11914141414', 1),
('Vanessa', 'Ferraz', 1, 'vanessa@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11915151515', 1),
('Ricardo', 'Moreira', 2, 'ricardo@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11916161616', 1),
('Leticia', 'Pereira', 1, 'leticia@creche.com', '$2b$12$OpIjGZmnDXbNxe0vzUgiGOZG.vPkPrQtwo.4Prpo2swvrjrY4DrYe', '11917171717', 1);

-- Inserindo produtos
INSERT INTO produto (nome, categoria_produto, quantidade, limite_semanal_de_uso, data_validade, data_entrada, fk_creche) VALUES
('Detergente', 0, 50, 30, '2025-10-01', '2025-05-01T08:30:00', 1),
('Desinfetante', 1, 40, 20, '2026-09-10', '2025-05-05T09:15:00', 1),
('Multiuso', 2, 60, 35, '2030-06-20', '2025-05-10T10:45:00', 1),
('Limpa Vidros', 0, 30, 15, '2025-11-30', '2025-05-15T11:20:00', 1),
('Alcool Gel', 2, 70, 50, '2025-08-01', '2025-05-20T14:30:00', 1),
('Sabao Liquido', 1, 45, 55, '2026-01-15', '2025-05-25T15:10:00', 1),
('Amaciante', 2, 65, 60, '2027-06-25', '2025-05-30T16:45:00', 1),
('Lustra Moveis', 0, 35, 25, '2025-09-05', '2025-06-01T08:00:00', 1),
('Desengordurante', 1, 55, 70, '2025-10-10', '2025-06-05T09:30:00', 1),
('Cloro', 2, 75, 80, '2025-11-15', '2025-06-10T10:15:00', 1),
('Limpa Metais', 0, 25, 10, '2027-07-20', '2025-06-15T11:45:00', 1),
('Odorizador', 1, 50, 45, '2025-09-22', '2025-06-20T13:20:00', 1),
('Inseticida', 2, 40, 30, '2028-07-30', '2025-06-25T14:10:00', 1),
('Tira Manchas', 0, 60, 65, '2029-08-01', '2025-06-30T15:30:00', 1),
('Limpador de Piso', 1, 70, 75, '2030-08-05', '2025-07-01T16:20:00', 1),
('Sabonete Liquido', 0, 55, 60, '2031-07-30', '2025-06-05T08:45:00', 1),
('Pano de Limpeza', 1, 80, 90, '2030-08-10', '2025-07-10T09:20:00', 1),
('Esponja de Aço', 2, 30, 20, '2025-08-15', '2025-07-15T10:30:00', 1),
('Desodorizador', 0, 45, 50, '2025-09-20', '2025-07-20T11:15:00', 1),
('Cera Liquida', 1, 60, 70, '2025-09-25', '2025-07-25T12:00:00', 1);

-- Inserindo registros de uso
INSERT INTO registro_uso (data_hora_saida, data_validade, produto, quantidade, fk_funcionario) VALUES
('2025-05-24 10:00:00', '2025-06-01', 'Detergente', 10, 4),
('2025-05-24 10:30:00', '2025-06-10', 'Desinfetante', 5, 5),
('2025-05-24 11:00:00', '2025-06-20', 'Multiuso', 8, 4),
('2025-05-24 11:30:00', '2025-06-30', 'Limpa Vidros', 6, 5),
('2025-05-25 09:45:00', '2025-07-01', 'Alcool Gel', 12, 4),
('2025-05-25 10:30:00', '2025-06-15', 'Sabao Liquido', 7, 5),
('2025-05-25 11:00:00', '2025-06-25', 'Amaciante', 9, 4),
('2025-05-25 11:30:00', '2025-07-05', 'Lustra Moveis', 5, 5),
('2025-05-26 09:00:00', '2025-07-10', 'Desengordurante', 10, 4),
('2025-05-26 10:00:00', '2025-07-20', 'Limpa Metais', 4, 4),
('2025-05-26 10:30:00', '2025-07-25', 'Odorizador', 6, 5),
('2025-05-26 11:00:00', '2025-07-30', 'Inseticida', 3, 4),
('2025-05-27 09:15:00', '2025-08-05', 'Tira Manchas', 11, 5),
('2025-05-27 09:45:00', '2025-08-10', 'Limpador de Piso', 9, 4),
('2025-05-27 10:30:00', '2025-08-15', 'Sabonete Liquido', 7, 5),
('2025-05-27 11:00:00', '2025-08-20', 'Pano de Limpeza', 12, 4),
('2025-05-27 11:30:00', '2025-08-25', 'Esponja de Aço', 5, 5),
('2025-05-28 09:00:00', '2025-08-30', 'Desodorizador', 8, 4),
('2025-05-26 09:30:00', '2025-07-15', 'Cloro', 15, 5);

-- Inserindo historico_alertas (mapeado no modelo HistoricoAlertas)
INSERT INTO historico_alertas (data_hora, status, descricao, nome_produto, fk_produto) VALUES
('2025-05-24 08:00:00', 0, 'Produto vencido na cozinha', 'Detergente', 1),
('2025-05-24 09:30:00', 1, 'Nível baixo no estoque', 'Desinfetante', 2),
('2025-05-24 10:45:00', 2, 'Inspeção rotineira sem problemas', 'Multiuso', 3),
('2025-05-25 08:15:00', 0, 'Produto vencido no almoxarifado', 'Limpa Vidros', 4),
('2025-05-25 09:00:00', 1, 'Quantidade próxima ao limite semanal', 'Alcool Gel', 5),
('2025-05-25 10:20:00', 2, 'Entrada recém-registrada', 'Sabao Liquido', 6),
('2025-05-26 07:50:00', 0, 'Alerta de contaminação', 'Amaciante', 7),
('2025-05-26 08:30:00', 1, 'Validade próxima', 'Lustra Moveis', 8),
('2025-05-26 09:10:00', 2, 'Verificação concluída', 'Desengordurante', 9),
('2025-05-27 07:40:00', 0, 'Produto vencido encontrado', 'Cloro', 10),
('2025-05-27 08:20:00', 1, 'Estoque reduzido', 'Limpa Metais', 11),
('2025-05-27 09:05:00', 2, 'Sem ações necessárias', 'Odorizador', 12),
('2025-05-28 07:30:00', 0, 'Vencimento em massa detectado', 'Inseticida', 13),
('2025-05-28 08:55:00', 1, 'Monitorar validade', 'Tira Manchas', 14),
('2025-05-28 09:40:00', 2, 'Alerta resolvido', 'Limpador de Piso', 15);