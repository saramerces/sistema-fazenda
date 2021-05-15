# SIG FAZENDA

Sistema de Informações Gerencias para gerenciamento de Fazenda

## Tecnologias e dependências

O projeto foi desenvolvido usando o framework [Nuxt.js](https://nuxtjs.org) para
um aplicação full-stack com uma API REST feita com Express.js rodando do lado do
servidor. É usado também um banco de dados PostgreSQL como SGBD com Docker.

Para executar o projeto é necessário ter instalado na máquina as seguintes
dependências:

- Node.js
- NPM (ou Yarn)
- Docker
- Docker Compose


## Como executar

Para executar o sistema localmente é necessário primeiro iniciar uma instância
de contêiner com o banco de dados Postgres usando o `docker`. Um Dockerfile
presente no diretório `database` define a imagem com a estrutura do banco de
dados da aplicação.

Primeiro, pode-se construir a imagem com:

```bash
docker build -t sig-fazenda-db ./database
```

Para executar um contêiner a partir da imagem criada, que possuirá um banco de
dados vazio:

```bash
docker run -d --rm --name fazenda_db_cont \
        -p 5432:5432 \
        -e POSTGRES_USER=postgres \
        -e POSTGRES_PASSWORD=postgres \
        sig-fazenda-db
```

Com uma instância do banco executando na porta 5432, pode-se rodar a aplicação
Nuxt usando o `npm` ou o `yarn`:

```bash
npm run dev
```

ou

```bash
yarn  dev
```

Após isso, a aplicação estará rodando no endereço http://localhost:3000.
Lembrando que esse comando deve ser usado para executar em modo de
desenvolvimento.

Para contruir a aplicação para o ambiente de produção, use:

```bash
npm run build
npm run start
```

Para mais detalhes de como as coisas funcionam, é sempre o melhor caminho dar
uma olhada na [documentação do Nuxt.js](https://nuxtjs.org).
