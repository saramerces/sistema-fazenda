# SIG Fazenda

Sistemas de informações gerenciais para fazenda

# Banco de Dados

Está sendo utilizado o PostgreSQL como SGBD através do Docker. Na pasta
`database` estão as configurações principais relacionadas ao banco de dados como
o Dockerfile que define a imagem que é contruída a partir da imagem oficial do
Postgres e executa um SQL para iniciar o esquema do banco de dados.

Pra rodar o contêiner docker, primeiro deve-se contruir a imagem localmente:

```console
docker build ./database -t db-schema
```

`db-schema` é śo um exemplo de nome para a imagem, mas pode ser usado qualquer
outro.

Com a imagem criada, agora é possível coloca o contêiner em execução, usando:

```console
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres --name nome_container db-schema
```

A explicação de cada um dos parâmetros segue abaixo:

* `-d` define que o contêiner deve ficar executando em segundo plano.

* `-p 5432:5432` define que a porta 5432 do contêiner deve ser mapeada para a
porta 5432 do PC (5432 é a porta padrão usada pelo PostgreSQL).

* `-e` define variáveis de ambiente dentro do contêiner, nesse caso está sendo
usado para definir o usuário e senha do Postgres.

* `--name` dá um nome para se referir ao contêiner em execução.

* `db-schema` é o nome que eu dei pra image no comando de build.

