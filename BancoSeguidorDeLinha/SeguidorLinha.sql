
USE seguidor;

DROP SCHEMA  seguidor;
CREATE  SCHEMA  seguidor;

USE seguidor;


CREATE TABLE Pista (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200),
    valor_linha FLOAT,
    quantidade_setores INTEGER
);

CREATE TABLE Carrinho (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200),
    quantidade_rodas INTEGER,
    quantidade_motores INTEGER,
    quantidade_sensores INTEGER,
    tipo_motor VARCHAR(200),
    comprimento FLOAT,
    largura FLOAT,
    tipo_roda VARCHAR(200)
);

CREATE TABLE Usuario (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    senha_hash VARCHAR(200),
    login VARCHAR(200),
    data_entrada DATE,
    data_RIP DATE
);

CREATE TABLE Usuario_Carrinho (
    fk_Usuario_id INTEGER,
    fk_Carrinho_id INTEGER,
    PRIMARY KEY (fk_Usuario_id, fk_Carrinho_id)
);

CREATE TABLE Setor (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    tamanho FLOAT,
    fk_Pista_id INTEGER
);

CREATE TABLE Log (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    id_setor INTEGER,
    tempo TIMESTAMP,
    quantidade_fora_pista FLOAT,
    distancia_percorrida FLOAT,
    fk_Tentativa_id INTEGER,
    fk_Setor_CalibracaoCarrinho_id INTEGER
);

CREATE TABLE DadoLog (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    erro FLOAT,
    tempo FLOAT,
    fk_Log_id INTEGER,
    fk_TipoDado_id INTEGER
);

CREATE TABLE TipoDadoLog (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    discricao VARCHAR(200),
    nome VARCHAR(200)
);

CREATE TABLE Setor_CalibracaoCarrinho (
    KI FLOAT,
    KP FLOAT,
    KD FLOAT,
    angulo FLOAT,
    velocidade FLOAT,
    erro_desejado FLOAT,
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    fk_Setor_id INTEGER,
    fk_CalibracaoCarrinho_id INTEGER
);

CREATE TABLE CalibracaoCarrinho (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200),
    fk_Carrinho_id INTEGER
);

CREATE TABLE TipoDadoCalibracaoCarrinho (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200),
    discricao VARCHAR(200)
);

CREATE TABLE DadoCalibracaoCarrinho (
    valor VARCHAR(200),
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    fk_CalibracaoCarrinho_id INTEGER,
    fk_TipoDadoCalibracaoCarrinho_id INTEGER
);

CREATE TABLE Tentativa (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    Data DATE,
    descricao VARCHAR(200)
);

ALTER TABLE Usuario_Carrinho ADD CONSTRAINT FK_Usuario_Carrinho_1
    FOREIGN KEY (fk_Usuario_id)
    REFERENCES Usuario (id)
    ON DELETE RESTRICT;

ALTER TABLE Usuario_Carrinho ADD CONSTRAINT FK_Usuario_Carrinho_2
    FOREIGN KEY (fk_Carrinho_id)
    REFERENCES Carrinho (id)
    ON DELETE RESTRICT;

ALTER TABLE Setor ADD CONSTRAINT FK_Setor_2
    FOREIGN KEY (fk_Pista_id)
    REFERENCES Pista (id)
    ON DELETE RESTRICT;

ALTER TABLE Log ADD CONSTRAINT FK_Log_2
    FOREIGN KEY (fk_Tentativa_id)
    REFERENCES Tentativa (id)
    ON DELETE RESTRICT;

ALTER TABLE Log ADD CONSTRAINT FK_Log_3
    FOREIGN KEY (fk_Setor_CalibracaoCarrinho_id)
    REFERENCES Setor_CalibracaoCarrinho (id)
    ON DELETE RESTRICT;

ALTER TABLE DadoLog ADD CONSTRAINT FK_DadoLog
    FOREIGN KEY (fk_Log_id)
    REFERENCES Log (id)
    ON DELETE RESTRICT;

ALTER TABLE DadoLog ADD CONSTRAINT FK_DadoLog_2
    FOREIGN KEY (fk_TipoDado_id)
    REFERENCES TipoDadoLog (id)
    ON DELETE RESTRICT;

ALTER TABLE Setor_CalibracaoCarrinho ADD CONSTRAINT FK_Setor_CalibracaoCarrinho_2
    FOREIGN KEY (fk_Setor_id)
    REFERENCES Setor (id)
    ON DELETE RESTRICT;

ALTER TABLE Setor_CalibracaoCarrinho ADD CONSTRAINT FK_Setor_CalibracaoCarrinho_3
    FOREIGN KEY (fk_CalibracaoCarrinho_id)
    REFERENCES CalibracaoCarrinho (id)
    ON DELETE RESTRICT;

ALTER TABLE CalibracaoCarrinho ADD CONSTRAINT FK_CalibracaoCarrinho_2
    FOREIGN KEY (fk_Carrinho_id)
    REFERENCES Carrinho (id)
    ON DELETE CASCADE;

ALTER TABLE DadoCalibracaoCarrinho ADD CONSTRAINT FK_DadoCalibracaoCarrinho
    FOREIGN KEY (fk_CalibracaoCarrinho_id)
    REFERENCES CalibracaoCarrinho (id)
    ON DELETE RESTRICT;

ALTER TABLE DadoCalibracaoCarrinho ADD CONSTRAINT FK_DadoCalibracaoCarrinho_2
    FOREIGN KEY (fk_TipoDadoCalibracaoCarrinho_id)
    REFERENCES TipoDadoCalibracaoCarrinho (id)
    ON DELETE RESTRICT;

