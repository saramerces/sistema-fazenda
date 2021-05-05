\connect fazenda_db;

INSERT INTO estoque
  (nome, quantidade, preco, fabricante, tipo, nota_fiscal)
  VALUES
  ('Produto 1', 10, 1000000, 'AstraZeneca', 'Vacina', '6666'),
  ('Produto 2', 50, 1300000, 'Feizer', 'Vacina', '3333');


INSERT INTO animais
  (femea, idade, piquete, pasto, identidade)
  VALUES
  (true, 10, 1, 1, '1234567890');


INSERT INTO vacinas
  (tipo_vacina, id_produto)
  VALUES
  ('Tipo 1', 1),
  ('Outro Tipo', 2);


INSERT INTO evento_vacinacao
  (id_animal, id_vacina)
  VALUES
  (1, 1),
  (1, 2);
