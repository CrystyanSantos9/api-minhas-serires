# API Nodejs + Docker

## Detalhes de implementação

- #
## Testes

Detalhes de configuração podem ser vistos nesse site [Setup Mocha..](https://www.promyze.com/setup-mocha-in-watch-mode-for-tdd-in-node-js/)

Uso de Async Await podem ser vistos nesse artigo [Using Async-Await with Super Test](https://automationbro.medium.com/using-async-await-with-supertest-557701048919)

Sobre exemplos de asserções, visite a documentação do mocha [Chain Assertion...](https://www.chaijs.com/api/bdd/)

- Dependências
<pre>
  "devDependencies": {
    "chai": "^4.3.7",
    "mocha": "^10.2.0",
    "supertest": "^6.3.3"
  }
</pre>

- Script de Execução no package.json

<pre style="color: #FFD700;">
"test": "./node_modules/.bin/mocha --watch --watch-files test/*.test.js"
</pre>

- #

## Execução da Aplicação

Para a primeira execução da aplicação rode o comando:

```
docker-compose -f run-app.yml build up
```

Este comando vai gerar a imagem que será utilizada pelos containers da aplicação docker e salvar no seu registry local. Feito isso para as demais execuções rode o comando:

```
docker-compose -f run-app.yml up
```

Mais detalhes podem ser vistos em [Docker Docs](https://docs.docker.com/engine/reference/commandline/compose_build/)
