INSERT INTO Creche (nome, endereco, telefone, cnpj) VALUES
('CEI Terra Nossa', ': R. José Barros Magaldi, 216 - Jardim Sao Joao, São Paulo', '(11) 5851-1715', '19283746000122');


INSERT INTO Funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_Creche) VALUES
('Francisco', 'Silva', 0, 'francisco@creche.com', '$2a$12$RPe0rl111G5cG/MCLSKjFO0XcVwE9FDa/dzQjPUsYzjqzBzI.03H6', '11999998888', 1),
('Mariana', 'Souza', 1, 'mariana@creche.com', '$2a$12$mfVDLkghSevLBOek2Z5pUegzzZnt/MLz9xC47xMuxJqw6ps/UqUge', '11988887777', 1),
('Roberta', 'Ferreira', 2, 'roberta@creche.com', '$2a$12$TaEHnHvRB19UEHaSIWEzlO6pDEXaifUtnK/vcXUJ.L6p8Ip1GAnDa', '11977776666', 1),
('João', 'Pereira', 0, 'joao@creche.com', '$2a$12$tPJN2xA65ct3eaK05/tGMesUuHbgFbWq.GpylxDKaOGFKqcX6dksC', '11966665555', 1),
('Ana', 'Lima', 1, 'ana@creche.com', '$2a$12$0pSA5CbX2FwzFJhFdvth7OL92L3Mm6rzYqsoBw58RwW0qmihjUvm6', '11955554444', 1);


INSERT INTO Produto (nome, categoria_Produto, quantidade, limite_Semanal_De_Uso, data_Validade, data_Entrada, fk_Creche) VALUES
('Detergente', 0, 50, 30, '2025-06-01', '2025-05-01', 1),
('Desinfetante', 1, 40, 20, '2025-06-10', '2025-05-05', 1),
('Multiuso', 2, 60, 35, '2025-06-20', '2025-05-10', 1),
('Limpa Vidros', 0, 30, 15, '2025-06-30', '2025-05-15', 1),
('Álcool Gel', 2, 70, 50, '2025-07-01', '2025-05-20', 1),
('Sabão Líquido', 1, 45, 55, '2025-06-15', '2025-05-25', 1),
('Amaciante', 2, 65, 60, '2025-06-25', '2025-05-30', 1),
('Lustra Móveis', 0, 35, 25, '2025-07-05', '2025-06-01', 1),
('Desengordurante', 1, 55, 70, '2025-07-10', '2025-06-05', 1),
('Cloro', 2, 75, 80, '2025-07-15', '2025-06-10', 1),
('Limpa Metais', 0, 25, 10, '2025-07-20', '2025-06-15', 1),
('Odorizador', 1, 50, 45, '2025-07-25', '2025-06-20', 1),
('Inseticida', 2, 40, 30, '2025-07-30', '2025-06-25', 1),
('Tira Manchas', 0, 60, 65, '2025-08-01', '2025-06-30', 1),
('Limpador de Piso', 1, 70, 75, '2025-08-05', '2025-07-01', 1);


INSERT INTO Historico_Alertas (data_Hora, status, descricao) VALUES
('2025-05-24 10:30:00', '0', 'Produto em nível crítico!'),
('2025-05-24 11:00:00', '1', 'Produto em nível de atenção!'),
('2025-05-24 11:30:00', '2', 'Estoque em situação normal'),
('2025-05-25 09:45:00', '0', 'Validade expirada!'),
('2025-05-25 10:15:00', '1', 'Validade próxima do vencimento!');


INSERT INTO Registro_Uso (data_Hora_Saida, data_Validade, produto, quantidade) VALUES
('2025-05-24 10:00:00', '2025-06-01', 'Detergente', 10),
('2025-05-24 10:30:00', '2025-06-10', 'Desinfetante', 5),
('2025-05-24 11:00:00', '2025-06-20', 'Multiuso', 8),
('2025-05-24 11:30:00', '2025-06-30', 'Limpa Vidros', 6),
('2025-05-25 09:45:00', '2025-07-01', 'Álcool Gel', 12);