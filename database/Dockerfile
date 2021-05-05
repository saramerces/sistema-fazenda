FROM postgres:13-alpine

COPY create_tables.sql /docker-entrypoint-initdb.d/00_create_tables.sql

# Comentar essa linha pra criar um banco de dados vazio
# Descomentar pra inserir alguns dados
COPY insert.sql /docker-entrypoint-initdb.d/01_insert_info.sql
