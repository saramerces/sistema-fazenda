CREATE DATABASE fazenda_db;

\connect fazenda_db;

-- CREATE SCHEMA fazenda;

CREATE TABLE estoque (
	id serial PRIMARY KEY,
	nome varchar(50) NOT NULL,
	quantidade integer NOT NULL,
	preco integer NOT NULL,
	fabricante varchar(50) NOT NULL,
	tipo varchar(50) NOT NULL,
	nota_fiscal varchar(255) NOT NULL
);


CREATE TABLE animais (
	id serial PRIMARY KEY,
	piquete integer NOT NULL,
	pasto char(1) NOT NULL,
	femea boolean NOT NULL,
	idade integer NOT NULL,
	identidade integer NOT NULL,
  nome varchar(30)
);


CREATE TABLE vacinas (
	id serial PRIMARY KEY,
	tipo_vacina varchar(255) NOT NULL,
	data_vacina DATE default CURRENT_DATE,
	id_produto serial REFERENCES estoque(id) ON DELETE CASCADE
);


-- Criando uma tabela que relaciona animais com vacinas em N:N para armazenar um
-- evento de vacinação, assim cada animal pode ter N vacinações cadastradas no
-- sistema e cada vacina pode ter sido usada para vacinar mais de um animal
CREATE TABLE evento_vacinacao (
  id serial NOT NULL,
  id_animal serial REFERENCES animais(id) ON DELETE CASCADE,
  id_vacina serial REFERENCES vacinas(id),
  data date NOT NULL default CURRENT_DATE,
  PRIMARY KEY(id)
);


-- Tabela de reproducao
CREATE TABLE reproducao (
  id serial PRIMARY KEY,
  id_animal serial REFERENCES animais(id) ON DELETE CASCADE,
  data_parto date,
  prenhez_monta boolean NOT NULL,
  prenhez_ano boolean NOT NULL,
  prenhez_inseminacao boolean NOT NULL,
  prenhez_estacao boolean NOT NULL
);


CREATE TABLE pesagens (
  id serial PRIMARY KEY,
  id_animal serial NOT NULL REFERENCES animais(id) ON DELETE CASCADE,
  data date NOT NULL default CURRENT_DATE,
  peso real NOT NULL
);


-- TODO: Tabela de contabilidade

