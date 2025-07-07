# 🚀 SideMock

**SideMock** é uma ferramenta de desenvolvimento frontend que atua como um servidor proxy local. Ela permite mockar respostas de APIs específicas e redirecionar todas as demais requisições para um backend real. Também é possível simular delays nas respostas, útil para testar comportamentos com latência.

---

## ✨ Funcionalidades

* 🔁 Redireciona requisições para um backend real
* 🧪 Retorna respostas mockadas para endpoints específicos
* ⏱️ Suporte a simulação de delay artificial
* 🧹 Ideal para ambientes de desenvolvimento e testes frontend

---

## 📦 Instalação

Você pode clonar este repositório e instalar as dependências localmente:

```bash
git clone https://github.com/seu-usuario/sidemock.git
cd sidemock
npm install
npm run build
```

---

## ▶️ Uso

Execute o servidor com:

```bash
./bin/sidemock -b https://example.api.com
```

Por padrão, o servidor roda em `http://localhost:5000` e redireciona requisições para o backend definido através do parametro obrigatório (ex: `-b, --backend <backend-url>`).

Você pode configurar:

* Os **mocks** no arquivo `mocks.json`
* O **delay simulado** editando o valor manualmente ou dinamicamente via CLI (futuro)

---

## 📁 Estrutura dos mocks

Os mocks são definidos em um arquivo `mocks.json` na raiz do projeto. A chave é composta pelo método e o caminho da requisição.

### Exemplo:

```json
{
  "GET /api/users": [
    { "id": 1, "name": "Rafael" },
    { "id": 2, "name": "Ethan" }
  ],
  "POST /api/login": {
    "dalay": 2000, // Aplica delay na resposta da requisição de 2seg.
    "data": {
      "token": "abc123",
      "expires_in": 3600
    }
  },
  "GET /api/users/:id/profile": { // :id espera um dado enviado via parametro.
    "token": "abc123",
    "expires_in": 3600
  }
}
```

---

## ⚙️ Como funciona

1. Ao iniciar, o SideMock carrega o arquivo `mocks.json`
2. Ao receber uma requisição:

   * Se houver um mock correspondente (`método caminho`), ele responde com o mock
   * Se **não houver**, a requisição é redirecionada para o backend real
3. Caso configurado, um **delay** (ex: 1500ms) é adicionado antes da resposta

---

## 📌 Roadmap

Funcionalidades planejadas:

* ⏺ Gravação automática de respostas reais como mocks (`--record`)
* 🌐 Dashboard web para visualizar e editar mocks
* 📆 Suporte a múltiplos arquivos de mocks (por endpoint)
* 📄 Histórico de requisições recebidas

---

## 🥪 Desenvolvimento

Você pode rodar o projeto com live reload usando:

```bash
npm run dev
```

(Assumindo que você usa `nodemon` ou `tsx watch`)

---

## 🛠️ Requisitos

* Node.js 18+
* npm ou yarn
* (Opcional) `ts-node` e `nodemon` para desenvolvimento
