CREATE DATABASE safeStock;

USE safeStock;

CREATE TABLE Creche (
  idCreche INT PRIMARY KEY,
  nome VARCHAR(45),
  endereco VARCHAR(80),
  telefone INT
);

CREATE TABLE Funcionario (
  idFuncionario INT PRIMARY KEY,
  nome VARCHAR(45),
  sobrenome VARCHAR(45),
  cargo VARCHAR(45),
  CNPJ CHAR(14),
  email VARCHAR(45),
  senha VARCHAR(45),
  telefone VARCHAR(45),
  Creche_idCreche INT,
  FOREIGN KEY (Creche_idCreche) REFERENCES Creche(idCreche)
);

CREATE TABLE Produto (
  idProduto INT PRIMARY KEY,
  nome VARCHAR(45),
  categoria VARCHAR(45),
  dataValidade VARCHAR(45),
  dataEntrada VARCHAR(45),
  Creche_idCreche INT,
  FOREIGN KEY (Creche_idCreche) REFERENCES Creche(idCreche)
);

CREATE TABLE RegistroUso (
  idRegistroUso INT PRIMARY KEY,
  dataHoraSaida VARCHAR(45),
  quantidade VARCHAR(45),
  Funcionario_idFuncionario INT,
  Funcionario_idFuncionario1 INT,
  FOREIGN KEY (Funcionario_idFuncionario) REFERENCES Funcionario(idFuncionario),
  FOREIGN KEY (Funcionario_idFuncionario1) REFERENCES Funcionario(idFuncionario)
);

CREATE TABLE HistoricoAlerta (
  idHistoricoAlerta INT PRIMARY KEY,
  dataHora DATETIME,
  status VARCHAR(45),
  descricao VARCHAR(200)
);

CREATE TABLE Relatorio (
  idRelatorio INT PRIMARY KEY,
  dataHora DATETIME,
  descricao VARCHAR(999),
  RegistroUso_idRegistroUso INT,
  RegistroUso_Funcionario_idFuncionario INT,
  HistoricoAlertas_idHistoricoAlertas INT,
  Produto_idProduto INT,
  FOREIGN KEY (RegistroUso_idRegistroUso) REFERENCES RegistroUso(idRegistroUso),
  FOREIGN KEY (RegistroUso_Funcionario_idFuncionario) REFERENCES Funcionario(idFuncionario),
  FOREIGN KEY (HistoricoAlertas_idHistoricoAlertas) REFERENCES HistoricoAlertas(idHistoricoAlertas),
  FOREIGN KEY (Produto_idProduto) REFERENCES Produto(idProduto)
);
