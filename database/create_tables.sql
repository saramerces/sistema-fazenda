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
	femea boolean NOT NULL,
	idade serial NOT NULL,
	id_piquete serial,
	historico_vacinacao varchar(255),
	historico_ganho_peso varchar(255),
	pasto integer NOT NULL,
	identidade integer NOT NULL
);


CREATE TABLE reproducao (
	id serial PRIMARY KEY,
	id_animal serial NOT NULL,
	data_parto DATE NOT NULL,
);


CREATE TABLE vacinas (
	id serial PRIMARY KEY,
	tipo_vacina varchar(255) NOT NULL,
	data_vacina DATE default CURRENT_DATE,
	id_produtos serial REFERENCES estoque(id)
);


-- Criando uma tabela que relaciona animais com vacinas em N:N para armazenar um
-- evento de vacinação, assim cada animal pode ter N vacinações cadastradas no
-- sistema e cada vacina pode ter sido usada para vacinar mais de um animal
CREATE TABLE evento_vacinacao (
  id serial NOT NULL,
  id_animal serial REFERENCES animais(id),
  id_vacina serial REFERENCES vacinas(id),
  data date NOT NULL default CURRENT_DATE,
  PRIMARY KEY(id)
);


-- ALTER TABLE fazenda.animais ADD CONSTRAINT Animais_Fk0 FOREIGN KEY (historico_vacinacao) REFERENCES fazenda.vacinas(tipo_vacina);
-- ALTER TABLE vacinas ADD CONSTRAINT Vacinas_Fk0 FOREIGN KEY (id_produtos) REFERENCES estoque(id);
-- ALTER TABLE vacinacao ADD CONSTRAINT Vacinacao_Fk0 FOREIGN KEY (id_animal) REFERENCES animais(id);
-- ALTER TABLE vacinacao ADD CONSTRAINT Vacinacao_Fk1 FOREIGN KEY (id_vacina) REFERENCES vacinas(id);

-- CREATE TABLE reproducao (
-- 	"Prenhez por inseminasao" integer NOT NULL,
-- 	"Prenhez_monta" integer NOT NULL,
-- 	"Prenhez_ano" integer NOT NULL,
--	"Prenhez_estasao" integer NOT NULL,
--	"id_reprodusao" serial NOT NULL,
--	"id_animais" integer NOT NULL,
--	"data_parto" DATE NOT NULL,
--	CONSTRAINT "Reprodusao_pk" PRIMARY KEY ("id_reprodusao")
--) WITH (
--  OIDS=FALSE
--);

--CREATE TABLE "Contabilidade" (
--	"Gastos_reprodusao" integer NOT NULL,
--	"Gastos_vacina" integer NOT NULL,
--	"Gastos_nutrisao" integer NOT NULL,
--	"Ganho_mensal" integer NOT NULL,
--	"id_contabilidade" serial NOT NULL,
--	"id_estoque" BINARY NOT NULL,
--	CONSTRAINT "Contabilidade_pk" PRIMARY KEY ("id_contabilidade")
--) WITH (
--  OIDS=FALSE
--);

-- ALTER TABLE fazenda.animais ADD CONSTRAINT "Animais_fk0" FOREIGN KEY (historico_vacinacao) REFERENCES fazenda.vacinas(tipo_vacina);
-- ALTER TABLE animais ADD CONSTRAINT "Animais_fk1" FOREIGN KEY (historico_ganho_peso) REFERENCES ""("");
-- ALTER TABLE fazenda.vacinas ADD CONSTRAINT "Vacinas_fk0" FOREIGN KEY (id_produtos) REFERENCES fazenda.estoque(id);
-- ALTER TABLE reproducao ADD CONSTRAINT "Reprodusao_fk0" FOREIGN KEY (id_animal) REFERENCES animais(sexo);

-- ALTER TABLE "Contabilidade" ADD CONSTRAINT "Contabilidade_fk0" FOREIGN KEY ("Gastos_reprodusao") REFERENCES "Reprodusao"("id_reprodusao");
-- ALTER TABLE "Contabilidade" ADD CONSTRAINT "Contabilidade_fk1" FOREIGN KEY ("Gastos_vacina") REFERENCES "Vacinas"("Id_vacina");
-- ALTER TABLE "Contabilidade" ADD CONSTRAINT "Contabilidade_fk2" FOREIGN KEY ("Gastos_nutrisao") REFERENCES "Estoque"("Id_estoque");
-- ALTER TABLE "Contabilidade" ADD CONSTRAINT "Contabilidade_fk3" FOREIGN KEY ("id_estoque") REFERENCES "Estoque"("Id_estoque");
