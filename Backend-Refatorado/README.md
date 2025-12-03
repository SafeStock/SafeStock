# Project-SafeStock-BackEnd
aplicação back end do projeto safestock


script para colocar no banco de dados

-- Creche
INSERT INTO Creche (nome, endereco, telefone, cnpj) VALUES
('CEI Terra Nossa', ': R. José Barros Magaldi, 216 - Jardim Sao Joao, São Paulo', '(11) 5851-1715', '19283746000122');

INSERT INTO Funcionario (nome, sobrenome, cargo, email, senha, telefone, fk_Creche) VALUES
('Francisco', 'Silva', 'administracao', 'francisco@creche.com', '$2a$12$RPe0rl111G5cG/MCLSKjFO0XcVwE9FDa/dzQjPUsYzjqzBzI.03H6', '11999998888', 1),
('Mariana', 'Souza', 'dono', 'mariana@creche.com', '$2a$12$mfVDLkghSevLBOek2Z5pUegzzZnt/MLz9xC47xMuxJqw6ps/UqUge', '11988887777', 1),
('Roberta', 'Ferreira', 'limpeza', 'roberta@creche.com', '$2a$12$TaEHnHvRB19UEHaSIWEzlO6pDEXaifUtnK/vcXUJ.L6p8Ip1GAnDa', '11977776666', 1),
('João', 'Pereira', 'limpeza', 'joao@creche.com', '$2a$12$tPJN2xA65ct3eaK05/tGMesUuHbgFbWq.GpylxDKaOGFKqcX6dksC', '11966665555', 1),
('Ana', 'Lima', 'dono', 'ana@creche.com', '$2a$12$0pSA5CbX2FwzFJhFdvth7OL92L3Mm6rzYqsoBw58RwW0qmihjUvm6', '11955554444', 1);

INSERT INTO Produto (nome, categoria_Produto, quantidade, limite_Semanal_De_Uso, data_Validade, data_Entrada, fk_Creche) VALUES
('Detergente', 'chao', 50, 30, '2025-10-01', '2025-05-01', 1),
('Desinfetante', 'multi_uso', 40, 20, '2026-09-10', '2025-05-05', 1),
('Multiuso', 'vidros', 60, 35, '2030-06-20', '2025-05-10', 1),
('Limpa Vidros', 'chao', 30, 15, '2025-11-30', '2025-05-15', 1),
('Álcool Gel', 'vidros', 70, 50, '2025-08-01', '2025-05-20', 1),
('Sabão Líquido', 'multi_uso', 45, 55, '2026-01-15', '2025-05-25', 1),
('Amaciante', 'vidros', 65, 60, '2027-06-25', '2025-05-30', 1),
('Lustra Móveis', 'chao', 35, 25, '2025-09-05', '2025-06-01', 1),
('Desengordurante', 'multi_uso', 55, 70, '2025-10-10', '2025-06-05', 1),
('Cloro', 'vidros', 75, 80, '2025-11-15', '2025-06-10', 1),
('Limpa Metais', 'chao', 25, 10, '2027-07-20', '2025-06-15', 1),
('Odorizador', 'multi_uso', 50, 45, '2025-09-22', '2025-06-20', 1),
('Inseticida', 'vidros', 40, 30, '2028-07-30', '2025-06-25', 1),
('Tira Manchas', 'chao', 60, 65, '2029-08-01', '2025-06-30', 1),
('Limpador de Piso', 'multi_uso', 70, 75, '2030-08-05', '2025-07-01', 1),
('Sabonete Líquido', 'chao', 55, 60, '2031-07-30', '2025-06-05', 1),
('Pano de Limpeza', 'multi_uso', 80, 90, '2030-08-10', '2025-07-10', 1),
('Esponja de Aço', 'vidros', 30, 20, '2025-08-15', '2025-07-15', 1),
('Desodorizador', 'chao', 45, 50, '2025-09-20', '2025-07-20', 1),
('Cera Líquida', 'multi_uso', 60, 70, '2025-09-25', '2025-07-25', 1);

INSERT INTO Registro_Uso (data_Hora_Saida, data_Validade, produto, quantidade,fk_funcionario) VALUES
('2025-05-24 10:00:00', '2025-06-01', 'Detergente', 10, 4),
('2025-05-24 10:30:00', '2025-06-10', 'Desinfetante', 5, 5),
('2025-05-24 11:00:00', '2025-06-20', 'Multiuso', 8, 4),
('2025-05-24 11:30:00', '2025-06-30', 'Limpa Vidros', 6, 5),
('2025-05-25 09:45:00', '2025-07-01', 'Álcool Gel', 12, 4),
('2025-05-25 10:30:00', '2025-06-15', 'Sabão Líquido', 7, 5),
('2025-05-25 11:00:00', '2025-06-25', 'Amaciante', 9, 4),
('2025-05-25 11:30:00', '2025-07-05', 'Lustra Móveis', 5, 5),
('2025-05-26 09:00:00', '2025-07-10', 'Desengordurante', 10, 4),
('2025-05-26 09:30:00', '2025-07-15', 'Cloro', 15, 5);
