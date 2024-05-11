CREATE DATABASE skate_shop COLLATE Latin1_General_100_CI_AI_SC_UTF8;
GO

USE skate_shop;
GO

CREATE TABLE usuario (
      usuario INT IDENTITY (1,1) NOT NULL,
	  administrador BIT NOT NULL DEFAULT 0,
	  nome VARCHAR(200) NOT NULL,
	  email VARCHAR(200) NOT NULL,
	  senha VARCHAR(50) NOT NULL,
	  cpf VARCHAR(14) NOT NULL,
	  id_asaas VARCHAR(100),
	  PRIMARY KEY CLUSTERED (usuario)
);
GO

ALTER TABLE usuario 
ALTER COLUMN senha VARCHAR(50) COLLATE Latin1_General_100_CS_AI_SC_UTF8 NOT NULL;
GO

CREATE TABLE produto (
      produto INT IDENTITY (1,1) NOT NULL,
	  nome VARCHAR(1000) NOT NULL,
	  valor DECIMAL(10,2) NOT NULL,
	  data_criacao DATETIME NOT NULL,
	  ativo BIT NOT NULL DEFAULT 1,
	  destaque BIT NOT NULL DEFAULT 0,
	  quantidade_estoque INT NOT NULL DEFAULT 0,
	  tamanho_unico BIT NOT NULL DEFAULT 1,
	  tipo INT NOT NULL DEFAULT 0,
	  PRIMARY KEY CLUSTERED (produto)
);
GO

CREATE TABLE anexo (
	  anexo INT IDENTITY (1,1) NOT NULL,
	  produto INT NOT NULL,
	  nome VARCHAR(500),
	  caminho_relativo VARCHAR(1000),
	  PRIMARY KEY CLUSTERED (anexo),
	  CONSTRAINT FK_anexo_produto FOREIGN KEY (produto) REFERENCES produto (produto)
);
GO

CREATE TABLE tamanho (
	  tamanho INT IDENTITY (1,1) NOT NULL,
	  produto INT NOT NULL,
	  nome VARCHAR(10) NOT NULL,
	  quantidade INT NOT NULL DEFAULT 0,
	  PRIMARY KEY CLUSTERED (tamanho),
	  CONSTRAINT FK_tamanho_produto FOREIGN KEY (produto) REFERENCES produto (produto)
);
GO

CREATE TABLE favorito (
	  favorito INT IDENTITY (1,1) NOT NULL,
	  usuario INT NOT NULL,
	  produto INT NOT NULL,
	  PRIMARY KEY CLUSTERED (favorito),
	  CONSTRAINT FK_favorito_usuario FOREIGN KEY (usuario) REFERENCES usuario (usuario),
	  CONSTRAINT FK_favorito_produto FOREIGN KEY (produto) REFERENCES produto (produto)
);
GO

CREATE TABLE endereco (
	  endereco INT IDENTITY (1,1) NOT NULL,
	  usuario INT NOT NULL,
	  uf VARCHAR(2) NOT NULL, 
	  cidade VARCHAR(100) NOT NULL,
	  bairro VARCHAR(100) NOT NULL,
	  rua VARCHAR(100) NOT NULL,
	  numero VARCHAR(100) NOT NULL,
	  complemento VARCHAR(100),
	  PRIMARY KEY CLUSTERED (endereco),
	  CONSTRAINT FK_endereco_usuario FOREIGN KEY (usuario) REFERENCES usuario (usuario)
);
GO

CREATE TABLE pedido (
	  pedido INT IDENTITY (1,1) NOT NULL,
	  usuario INT NOT NULL,
	  endereco INT NOT NULL,
	  valor DECIMAL(10,2) NOT NULL,
	  id_asaas VARCHAR(100) NOT NULL,
	  pagamento_realizado BIT NOT NULL DEFAULT 0,
	  data_criacao DATETIME NOT NULL,
	  data_vencimento DATETIME NOT NULL,
	  codigo_pagamento_pix VARCHAR(500) NOT NULL,
	  caminho_relativo_imagem_pix VARCHAR(1000) NOT NULL,
	  PRIMARY KEY CLUSTERED (pedido),
	  CONSTRAINT FK_pedido_usuario FOREIGN KEY (usuario) REFERENCES usuario (usuario),
	  CONSTRAINT FK_pedido_endereco FOREIGN KEY (endereco) REFERENCES endereco (endereco)
);
GO

CREATE TABLE pedido_produto (
	  pedido_produto INT IDENTITY (1,1) NOT NULL,
	  pedido INT NOT NULL,
	  produto INT NOT NULL,
	  tamanho INT,
	  quantidade INT NOT NULL,
	  valor DECIMAL(10, 2) NOT NULL,
	  PRIMARY KEY CLUSTERED (pedido_produto),
	  CONSTRAINT FK_pedidoProduto_pedido FOREIGN KEY (pedido) REFERENCES pedido (pedido),
	  CONSTRAINT FK_pedidoProduto_produto FOREIGN KEY (produto) REFERENCES produto (produto),
	  CONSTRAINT FK_pedidoProduto_tamanho FOREIGN KEY (tamanho) REFERENCES tamanho (tamanho)
);
GO