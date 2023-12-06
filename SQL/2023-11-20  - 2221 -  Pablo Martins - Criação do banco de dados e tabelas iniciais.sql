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
	  cpf_cnpj VARCHAR(18) NOT NULL,
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
	  tamanho_unico BIT NOT NULL DEFAULT 1
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

CREATE TABLE produto_tamanho (
	  produto_tamanho INT IDENTITY (1,1) NOT NULL,
	  produto INT NOT NULL,
	  nome VARCHAR(10),
	  quantidade INT NOT NULL DEFAULT 0,
	  PRIMARY KEY CLUSTERED (produto_tamanho),
	  CONSTRAINT FK_produtoTamanho_produto FOREIGN KEY (produto) REFERENCES produto (produto)
);
GO

CREATE TABLE usuario_favorito (
	  usuario_favorito INT IDENTITY (1,1) NOT NULL,
	  usuario INT NOT NULL,
	  produto INT NOT NULL,
	  PRIMARY KEY CLUSTERED (usuario_favorito),
	  CONSTRAINT FK_usuarioFavorito_usuario FOREIGN KEY (usuario) REFERENCES usuario (usuario),
	  CONSTRAINT FK_usuarioFavorito_produto FOREIGN KEY (produto) REFERENCES produto (produto)
);
GO

CREATE TABLE pedido (
	  pedido INT IDENTITY (1,1) NOT NULL,
	  usuario INT NOT NULL,
	  valor DECIMAL(10,2) NOT NULL,
	  id_asaas VARCHAR(100) NOT NULL,
	  pagamento_realizado BIT NOT NULL DEFAULT 0,
	  data_criacao DATETIME NOT NULL,
	  data_vencimento DATETIME NOT NULL,
	  PRIMARY KEY CLUSTERED (pedido),
	  CONSTRAINT FK_pedido_usuario FOREIGN KEY (usuario) REFERENCES usuario (usuario)
);
GO

CREATE TABLE endereco (
	  endereco INT IDENTITY (1,1) NOT NULL,
	  usuario INT,
	  pedido INT,
	  uf VARCHAR(2) NOT NULL, 
	  cidade VARCHAR(100) NOT NULL,
	  bairro VARCHAR(100) NOT NULL,
	  rua VARCHAR(100) NOT NULL,
	  numero VARCHAR(100) NOT NULL,
	  complemento VARCHAR(100),
	  PRIMARY KEY CLUSTERED (endereco),
	  CONSTRAINT FK_endereco_usuario FOREIGN KEY (usuario) REFERENCES usuario (usuario),
	  CONSTRAINT FK_endereco_pedido FOREIGN KEY (pedido) REFERENCES pedido (pedido)
);
GO

CREATE TABLE pedido_produto (
	  pedido_produto INT IDENTITY (1,1) NOT NULL,
	  pedido INT NOT NULL,
	  produto INT NOT NULL,
	  valor DECIMAL(10, 2) NOT NULL,
	  PRIMARY KEY CLUSTERED (pedido_produto),
	  CONSTRAINT FK_pedidoProduto_pedido FOREIGN KEY (pedido) REFERENCES pedido (pedido),
	  CONSTRAINT FK_pedidoProduto_produto FOREIGN KEY (produto) REFERENCES produto (produto)
);
GO