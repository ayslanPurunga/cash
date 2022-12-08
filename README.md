## Cash API

<hr>

### Descrição:
API desenvolvida em node.js com enfâse em operações bancárias, criação de contas para o usuário com funções de cash-in e cash-out.

### Ferramentas utilizadas:
+ NodeJS
+ Postgres
+ Typescript
+ TypeORM
+ JsonWebToken

### Para rodar a aplicação: 

+ Instalar as dependências do projeto:
```
yarn install
```

+ Rodar o banco de dados através do docker:
```
docker-compose up -d
``` 
+ Gerar migration:
```
yarn migration:generate
```
+ Subir migration:
```
yarn migration:run
```
+ Rodar aplicação:
```
yarn dev
```

#### Obs: Para testar as rotas, utilizar software como Insomnia ou Postman para disparar as requisições.