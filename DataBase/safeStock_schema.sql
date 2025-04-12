CREATE DATABASE safeStock;
USE safeStock;

CREATE TABLE Creche (
  idCreche INT PRIMARY KEY,
  nome VARCHAR(45),
  endereco VARCHAR(80),
  telefone INT,
  cnpj CHAR(14)
);

CREATE TABLE Funcionario (
  idFuncionario INT PRIMARY KEY,
  nome VARCHAR(45),
  sobrenome VARCHAR(45),
  cargo VARCHAR(45),
  email VARCHAR(45),
  senha VARCHAR(45),
  telefone CHAR(11),
  fkCreche INT,
  FOREIGN KEY (fkCreche) REFERENCES Creche(idCreche),
  CONSTRAINT chk_cargo_valido CHECK (cargo IN ('dono', 'administracao', 'equipe_de_limpeza'))
);

CREATE TABLE Produto (
  idProduto INT PRIMARY KEY,
  nome VARCHAR(45),
  categoria VARCHAR(45),
  quantidade INT,
  limiteUso INT,
  dataValidade DATE,
  dataEntrada DATE,
  fkCreche INT,
  FOREIGN KEY (fkCreche) REFERENCES Creche(idCreche)
);

CREATE TABLE RegistroUso (
  idRegistroUso INT PRIMARY KEY,
  fkProduto INT,
  quantidade VARCHAR(45),
  dataValidade DATE,
  dataHoraSaida DATETIME,
  fkFuncionario INT,
  FOREIGN KEY (fkFuncionario) REFERENCES Funcionario(idFuncionario)
);

CREATE TABLE HistoricoAlerta (
  idHistoricoAlerta INT PRIMARY KEY,
  dataHora DATETIME,
  status VARCHAR(45),
  CONSTRAINT chk_status CHECK (status IN ('Critico', 'Atenção', 'Não urgente')),
  descricao VARCHAR(200)
);

CREATE TABLE Relatorio (
  idRelatorio INT PRIMARY KEY,
  fkProduto INT,
  fkRegistroUso INT,
  fkAlerta INT,
  dataHoraEmissao DATETIME,
  FOREIGN KEY (fkProduto) REFERENCES Produto(idProduto),
  FOREIGN KEY (fkRegistroUso) REFERENCES RegistroUso(idRegistroUso),
  FOREIGN KEY (fkAlerta) REFERENCES HistoricoAlerta (idHistoricoAlerta)
);