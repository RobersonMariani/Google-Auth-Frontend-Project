# Google Auth Frontend

Frontend SPA para autenticação via Google OAuth 2.0 com cadastro complementar e listagem de usuários, construído com Vue 3 e TypeScript.

## Funcionalidades

- Login via Google OAuth 2.0 (botão seguindo diretrizes oficiais de branding)
- Cadastro complementar com nome, CPF (máscara e validação algorítmica) e data de nascimento
- Listagem de usuários com filtros por nome e CPF (debounce 400ms) e paginação
- Validação de formulários com Zod + inferência de tipos
- Autenticação via token Sanctum (Bearer) com interceptor Axios
- Componentes UI reutilizáveis (Button, Input, Loader, Toast)
- Lazy loading de rotas
- Feedbacks visuais (loading states, toasts de erro/sucesso)
- Layout responsivo com Sass

## Stack

| Camada              | Tecnologia                   |
|---------------------|------------------------------|
| Linguagem           | TypeScript 5.9+ (strict)     |
| Framework           | Vue 3.5+                     |
| Build Tool          | Vite 7.x                     |
| Roteamento          | Vue Router 4.x               |
| Estado              | Pinia 3.x                    |
| Validação           | Zod 4.x                      |
| HTTP Client         | Axios 1.x                    |
| Estilização         | Sass (sass-embedded 1.97+)   |
| Testes              | Vitest 4.x + Vue Test Utils  |
| Container           | Docker (Nginx multi-stage)   |

## Requisitos

- Node.js 22+ e npm 10+
- Ou Docker e Docker Compose

## Instalação

### Com Node.js

```bash
git clone https://github.com/RobersonMariani/Google-Auth-Frontend-Project.git
cd Google-Auth-Frontend-Project

cp .env.example .env
npm install
npm run dev
```

### Com Docker

```bash
git clone https://github.com/RobersonMariani/Google-Auth-Frontend-Project.git
cd Google-Auth-Frontend-Project

cp .env.example .env
docker compose up -d --build
```

Após o setup, o frontend estará disponível em `http://localhost:5173`.

A API deve estar rodando separadamente (porta 8000 por padrão).

## Variáveis de Ambiente

| Variável        | Descrição                      | Valor Padrão                   |
|-----------------|--------------------------------|--------------------------------|
| `VITE_API_URL`  | URL base da API                | `http://localhost:8000/api`    |
| `FRONTEND_PORT` | Porta do frontend (Docker)     | `5173`                         |

## Telas

| Rota                    | Componente     | Descrição                                                      |
|-------------------------|----------------|----------------------------------------------------------------|
| `/`                     | LoginPage      | Botão "Entrar com Google" com branding oficial                 |
| `/register?email=...`   | RegisterPage   | Formulário de cadastro (nome, CPF com máscara, data de nascimento) |
| `/users`                | UsersPage      | Tabela de usuários com filtros e paginação                     |

`RegisterPage` e `UsersPage` utilizam lazy loading.

---

## Fluxo da Aplicação

```
LoginPage ──→ Google OAuth ──→ API Callback ──→ RegisterPage ──→ UsersPage
   │              │                  │                │              │
   │         Autenticação        Redireciona      Formulário     Listagem
   │          Google OAuth      com email via     validado por   com filtros
   └── Botão                    query param       Zod + CPF     e paginação
       "Entrar com Google"
```

---

## Endpoints Consumidos

| Método | Endpoint                 | Descrição                          |
|--------|--------------------------|------------------------------------|
| `GET`  | `/api/google/login-url`  | Obtém URL de autenticação Google   |
| `POST` | `/api/users/complete`    | Completa cadastro do usuário       |
| `GET`  | `/api/users`             | Lista usuários com filtros e paginação |

---

## DTOs e Validação

### Arquitetura DTO + Zod

- **DTOs** (`src/dtos/`): interfaces TypeScript que definem o contrato com a API
- **Schemas Zod** (`src/schemas/`): validação dos dados no frontend antes do envio
- Os schemas geram tipos com `z.infer` compatíveis com os DTOs

### DTOs Disponíveis

| DTO                        | Descrição                                       |
|----------------------------|-------------------------------------------------|
| `RegisterUserDTO`          | Dados enviados no cadastro (name, cpf, birth_date, email) |
| `UserDTO`                  | Usuário retornado pela API                      |
| `UserFiltersDTO`           | Filtros da listagem (name, cpf, per_page, page) |
| `ApiResponseDTO<T>`        | Wrapper genérico de resposta                    |
| `AuthResponseDTO<T>`       | Resposta de cadastro com token Sanctum          |
| `ApiPaginatedResponseDTO<T>` | Resposta paginada com metadados               |
| `ApiErrorDTO`              | Formato de erro da API                          |
| `LoginUrlResponseDTO`      | URL de autenticação Google                      |

### Validações (Zod)

| Campo              | Regras                                                |
|--------------------|-------------------------------------------------------|
| `name`             | Obrigatório, máx. 255 caracteres                      |
| `cpf`              | 11 dígitos, validação algorítmica completa             |
| `birth_date`       | Obrigatória, anterior a hoje, posterior a 01/01/1900   |
| `email`            | Obrigatório, formato válido                            |

---

## Testes

**56 testes** cobrindo todas as camadas da aplicação.

| Módulo                | Testes | Cenários                                              |
|-----------------------|--------|-------------------------------------------------------|
| Utils (CPF)           | 14     | sanitize, format, validate (válido, inválido, repetido, curto) |
| Schemas (Zod)         | 12     | registerSchema + filtersSchema — campos obrigatórios, CPF, datas |
| Composables           | 5      | useFormValidation — validate, validateField, clearErrors |
| Store (Pinia)         | 5      | loadUsers, setFilters, setPage, tratamento de erro    |
| Componentes           | 13     | GoogleLoginButton, UserFilters, UserTable — renderização, eventos |
| DTOs                  | 7      | Compatibilidade de tipos para todos os DTOs           |

```bash
# Todos os testes
npm test

# Modo watch
npm run test:watch

# Cobertura
npm run test:coverage
```

## Arquitetura

O projeto segue uma **estrutura modular** com separação clara de responsabilidades:

```
src/
├── assets/styles/       # Sass global (variables, mixins, reset)
├── components/
│   ├── ui/              # Componentes reutilizáveis (AppButton, AppInput, AppLoader, AppToast)
│   ├── auth/            # GoogleLoginButton
│   └── users/           # UserFilters, UserTable, UserPagination
├── composables/         # useFormValidation (Zod), useDebounce
├── dtos/                # Interfaces TypeScript (contrato com a API)
├── layouts/             # DefaultLayout
├── pages/               # LoginPage, RegisterPage, UsersPage
├── router/              # Configuração Vue Router
├── schemas/             # Schemas Zod (registerSchema, filtersSchema)
├── services/            # Axios instance (api.ts), authService, userService
├── stores/              # Pinia stores (authStore, userStore)
└── utils/               # CPF (validação, formatação, máscara)
```

### Fluxo de dados

```
Page → Service (Axios) → API → DTO (tipagem) → Store (Pinia) → Component (reativo)
                                                     ↑
                                              Schema (Zod) — validação antes do envio
```

## Estrutura Docker

**Dockerfile** (multi-stage):

| Estágio  | Imagem              | Função                              |
|----------|---------------------|-------------------------------------|
| Build    | Node 22 Alpine      | `npm ci` → `npm run build`         |
| Produção | Nginx 1.27 Alpine   | Serve arquivos estáticos            |

**Nginx**:
- SPA fallback (`try_files $uri $uri/ /index.html`)
- Assets estáticos com cache de 1 ano
- Gzip habilitado

---

## Scripts Disponíveis

| Script              | Comando             | Descrição                       |
|---------------------|---------------------|---------------------------------|
| `npm run dev`       | `vite`              | Dev server com HMR              |
| `npm run build`     | `vue-tsc && vite build` | Build de produção          |
| `npm run preview`   | `vite preview`      | Preview do build                |
| `npm test`          | `vitest run`        | Executa todos os testes         |
| `npm run test:watch`| `vitest`            | Testes em modo watch            |
| `npm run test:coverage` | `vitest run --coverage` | Relatório de cobertura |

---

## Autor

**Roberson Mariani**
Desenvolvedor Fullstack PHP & Laravel | JS e VueJS
[LinkedIn](https://linkedin.com/in/roberson-mariani) | [GitHub](https://github.com/RobersonMariani)
