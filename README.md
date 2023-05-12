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

### Colocando Socket.io 

- Dependecias

<pre>
   "socket.io": "^4.6.1",
   "socket.io-client": "^4.6.1",
</pre>

Para começar a usar socket.io, comunicação em tempo real siga o passo a passo desse artigo [Building a chat app with..](lastCountTotal)

Um ponto importante, para que os eventos possam ser notificados ao seus remetentes, é criar o evento de "join" é ele o responsável por armazenar
os dados de identificação desse cliente.

```javascript
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log("join com userId --->>>", userId);
  });
```

Do lado do cliente, ele tem que emitir esse evento, fazendo sua identificação ao servidor

```javascript
socketClient.emit("join", "645c08e4d2973c4a00def49f");
```

Com isso, eventos destinados a esse cliente, que estiverem com sua identificação, e com uma conexão estabelecida, serão direcionados adequadamente a este cliente. 

Por exemplo, digamos que este tenha efetuando um saque, uma operação do tipo POST é feita a um serviço REST e ao final dessa operação, é feito a sinalização do evento que processa o valor total de contas desse usuário e o notifica em seguida, em tempo real.

```javascript
try {
    await count.save();
    res.statusCode = 201;
    res.send(count);
    socketClient.emit("newCount", req.body.user_id);
  } catch (e) {
    res.statusCode = 500;
    res.send({
      success: false,
      errors: Object.keys(e.errors),
    });
  }
```

Perceba que o evento recebe a identificação do cliente, a mesma que é enviada durante o evento de join.

Logo, o servidor receberá esse evento, realizará as consultas e processamento dos dados, e ao final emitirá um novo evento enviando os dados finais do processamento especificamente para esse cliente

```javascript
  socket.on("newCount", (userId) => {
    Count.find({})
      .where(userId)
      .then((counts) => {
        return balance(counts);
      })
      .then((total) => {
        console.log("Novo total sendo emitido --->>>", total);
        socket.to(userId).emit("newCountTotal", total);
      });
  });
  ```
Do lado do cleinte, ele vai criar um evento de escuta com a mesma chave do evento emitido pelo servidor, e recepcionará esses dados

```javascript
  socket.emit("join", "645c08e4d2973c4a00def49f");

  useEffect(() => {
    socket.on("newCountTotal", async (newTotal) => {
      await AsyncStorage.setItem("newCountTotal", JSON.stringify(newTotal));
      setTotal(newTotal);
      setRefreshScreen(true);
      console.log(newTotal);
    });

    // console.log(socket);
  }, [socket]);
  ```

  Para mais detalhes visite a documentação oficial do [Socket.io](https://socket.io/get-started/chat)