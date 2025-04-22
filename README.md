# Desafio Frontend – Requisitos

Este projeto foi desenvolvido como parte de um desafio técnico proposto pela Simples Dental. A aplicação é um frontend em Angular que consome uma API protegida por JWT, permitindo o gerenciamento de usuários com controle de acesso baseado em perfis (admin/user), formulários reativos e design responsivo.

---

## 🚀 Tecnologias Utilizadas

- **Angular 19**
- **TypeScript**
- **RxJS**
- **Angular Router**
- **Angular Material + CDK**
- **Angular CLI**
- **Zone.js**
- **SCSS**
- **Docker / Docker Compose**

---

## 📁 Estrutura de Pastas Baseado na arquitetura Hexagonal

```bash
├── src/app
│   ├── core/                    # Funcionalidades centrais (auth, serviços)
│   ├── shared/                 # Componentes e pipes reutilizáveis
│   ├── features/              # Componentes por domínio do sistema
│   ├── models/                # Tipos e interfaces do sistema
│   ├── app.routes.ts          # Definição de rotas
│   ├── app.config.ts          # Configurações gerais do app
│   └── app.component.*        # Componente principal da aplicação
├── assets                # Imagens e arquivos estáticos
├── environments          # Configurações por ambiente
├── Dockerfile            # Dockerfile para build do app
├── angular.json          # Configurações do Angular CLI
├── package.json          # Dependências do projeto
├── README.md             # Este arquivo
```

---

## ⚙️ Pré-requisitos

- Node.js 18+
- Angular CLI
- Docker e Docker Compose (opcional, para execução em contêiner)

---

## ▶️ Como Executar o Projeto

### ✅ Com Docker (recomendado)

```bash
docker-compose up --build
```

- A aplicação será iniciada em: `http://localhost:8081`

### ✅ Sem Docker (ambiente local)

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
ng serve
```

- A aplicação será iniciada em: `http://localhost:4200`

---

## 🧰 Funcionalidades

- **Autenticação**: Login com JWT.
- **Produtos**: CRUD de produtos.
- **Categoria**: CRUD de categorias.
- **Controle de Acesso**: Diferenciação de perfis (admin/user).
- **Formulários Reativos**: Validação e manipulação de formulários.
- **Configuração de Rotas**: Proteção de rotas com Guards.

---

## 👨‍💻 Autor

Desenvolvido por **Rafael Leite**  
📧 rleite.developer@gmail.com  
💼 Desafio técnico - Simples Dental
