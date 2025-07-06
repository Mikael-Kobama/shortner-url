# 🔗 Encurtador de URL

Este é um projeto simples de encurtador de URLs desenvolvido com:

- Backend: **Node.js + Express + TypeScript**
- Banco de dados: **MongoDB** (rodando via Docker Desktop)
- Frontend: **HTML + JavaScript puro** (sem frameworks)

---

## 🚀 Como funciona

- Você envia uma URL original através do formulário HTML
- O backend gera um `shortId` aleatório
- A URL original é armazenada no MongoDB com o `shortId`
- Ao acessar `http://localhost:3002/{shortId}`, você é redirecionado para a URL original

---

## 📦 Requisitos

- [Node.js](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- MongoDB rodando como container

---

## 🐳 Subindo o MongoDB com Docker Desktop

1. Crie um container MongoDB:

```bash
docker run -d \
  --name mongo \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  mongo

```
