CREATE DATABASE db_fazenda;

\connect db_fazenda;

CREATE TABLE "Produtos do estoque" (
	"id_estoque" serial(10) NOT NULL,
	"Nome" varchar(25) NOT NULL,
	"Quantidade" integer(250) NOT NULL,
	"Preço" integer(250) NOT NULL,
	"Fabricante" varchar(50) NOT NULL,
	"Tipo" varchar(50) NOT NULL,
	CONSTRAINT "Produtos do estoque_pk" PRIMARY KEY ("id_estoque")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "Animais" (
	"Sexo" BOOLEAN(25) NOT NULL,
	"identificacao" varchar(10) NOT NULL,
	"Quantidade de animais na fazenda" serial NOT NULL,
	"idade" serial NOT NULL,
	"Piquete" integer NOT NULL,
	"histórico de vacinacao" varchar(255) NOT NULL,
	"histórico de ganho de peso" varchar(255) NOT NULL,
	"identificacao_animais" varchar(255) NOT NULL,
	"id_animais" serial NOT NULL,
	CONSTRAINT "Animais_pk" PRIMARY KEY ("id_animais")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Fêmeas" (
	"identificacao" BINARY NOT NULL,
	"histórico de prenhez" varchar(250) NOT NULL,
	"id_femeas" serial NOT NULL,
	CONSTRAINT "Fêmeas_pk" PRIMARY KEY ("id_femeas")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Vacinacao" (
	"Tipo de vacina" varchar(25) NOT NULL,
	"Data de vacinacao" varchar(25) NOT NULL,
	"id_estoque" varchar(25) NOT NULL,
	"id_vacinacao" serial NOT NULL,
	CONSTRAINT "Vacinacao_pk" PRIMARY KEY ("id_vacinacao")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Ganho de peso" (
	"Ganho peso por dia" integer NOT NULL,
	"Ganho peso por mês" integer NOT NULL,
	"Ganho peso por ano" integer NOT NULL,
	"id ganho peso" serial NOT NULL,
	"id_animais" serial NOT NULL,
	CONSTRAINT "Ganho de peso_pk" PRIMARY KEY ("id ganho peso")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Pasto" (
	"id_pasto" serial NOT NULL,
	"Piquete" serial NOT NULL,
	"quantidade" integer NOT NULL,
	CONSTRAINT "Pasto_pk" PRIMARY KEY ("id_pasto")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Reproducao" (
	"Prenhez por inseminacao" integer NOT NULL,
	"Prenhez por monta" integer NOT NULL,
	"Prenhez por ano" integer NOT NULL,
	"Prenhez por estacao" integer NOT NULL,
	"id_femeas" serial NOT NULL,
	"id_reproduão" serial NOT NULL,
	CONSTRAINT "Reproducao_pk" PRIMARY KEY ("id_reproduão")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Contabilidade" (
	"Gastos com reproducao" integer NOT NULL,
	"Gastos com vacina" integer NOT NULL,
	"Gastos com nutricao" integer NOT NULL,
	"Ganho mensal" integer NOT NULL,
	"id_contabilidade" serial NOT NULL,
	"compra de animais" varchar(10) NOT NULL,
	"id_animais" varchar(10) NOT NULL,
	"id_estoque" varchar(10) NOT NULL,
	CONSTRAINT "Contabilidade_pk" PRIMARY KEY ("id_contabilidade")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Piquete" (
	"id_piquete" BINARY NOT NULL,
	"id_pasto" BINARY NOT NULL,
	"quantidade de animais" serial NOT NULL,
	CONSTRAINT "Piquete_pk" PRIMARY KEY ("id_piquete")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Animais" ADD CONSTRAINT "Animais_fk0" FOREIGN KEY ("Piquete") REFERENCES "Piquete"("id_piquete");
ALTER TABLE "Animais" ADD CONSTRAINT "Animais_fk1" FOREIGN KEY ("histórico de vacinacao") REFERENCES "Vacinacao"("Tipo de vacina");
ALTER TABLE "Animais" ADD CONSTRAINT "Animais_fk2" FOREIGN KEY ("histórico de ganho de peso") REFERENCES "Ganho de peso"("Ganho peso por dia");

ALTER TABLE "Fêmeas" ADD CONSTRAINT "Fêmeas_fk0" FOREIGN KEY ("identificacao") REFERENCES "Animais"("Sexo");
ALTER TABLE "Fêmeas" ADD CONSTRAINT "Fêmeas_fk1" FOREIGN KEY ("histórico de prenhez") REFERENCES "Reproducao"("id_femeas");

ALTER TABLE "Vacinacao" ADD CONSTRAINT "Vacinacao_fk0" FOREIGN KEY ("id_estoque") REFERENCES "Produtos do estoque"("id_estoque");

ALTER TABLE "Ganho de peso" ADD CONSTRAINT "Ganho de peso_fk0" FOREIGN KEY ("Ganho peso por dia") REFERENCES "Animais"("histórico de ganho de peso");
ALTER TABLE "Ganho de peso" ADD CONSTRAINT "Ganho de peso_fk1" FOREIGN KEY ("id_animais") REFERENCES "Animais"("identificacao");


ALTER TABLE "Reproducao" ADD CONSTRAINT "Reproducao_fk0" FOREIGN KEY ("id_femeas") REFERENCES "Fêmeas"("id_femeas");

ALTER TABLE "Contabilidade" ADD CONSTRAINT "Contabilidade_fk0" FOREIGN KEY ("Gastos com reproducao") REFERENCES "Reproducao"("id_femeas");
ALTER TABLE "Contabilidade" ADD CONSTRAINT "Contabilidade_fk1" FOREIGN KEY ("Gastos com vacina") REFERENCES "Vacinacao"("id_vacinacao");
ALTER TABLE "Contabilidade" ADD CONSTRAINT "Contabilidade_fk2" FOREIGN KEY ("Gastos com nutricao") REFERENCES "Produtos do estoque"("id_estoque");
ALTER TABLE "Contabilidade" ADD CONSTRAINT "Contabilidade_fk3" FOREIGN KEY ("id_animais") REFERENCES "Animais"("id_animais");
ALTER TABLE "Contabilidade" ADD CONSTRAINT "Contabilidade_fk4" FOREIGN KEY ("id_estoque") REFERENCES "Produtos do estoque"("id_estoque");

ALTER TABLE "Piquete" ADD CONSTRAINT "Piquete_fk0" FOREIGN KEY ("id_pasto") REFERENCES "Pasto"("Piquete");

