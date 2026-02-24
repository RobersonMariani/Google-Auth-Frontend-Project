# Google Auth Frontend

Frontend em **Vue 3** com **TypeScript** para o sistema de autenticação Google OAuth 2.0, com cadastro complementar e listagem de usuários.

## Stack Tecnológica

| Tecnologia | Versão | Função |
|---|---|---|
| Vue 3 | 3.5+ | Framework reativo |
| TypeScript | 5.9+ | Tipagem estática (strict mode) |
| Vite | 7.x | Build tool e dev server |
| Sass | 1.97+ | Pré-processador CSS |
| Vue Router | 4.x | Roteamento SPA |
| Pinia | 3.x | Gerenciamento de estado |
| Zod | 4.x | Validação de schemas + inferência de tipos |
| Axios | 1.x | HTTP client com interceptors |
| Vitest | 4.x | Framework de testes unitários |
| Vue Test Utils | 2.x | Utilitários de teste para Vue |

## Estrutura Modular

```
src/
├── assets/styles/       # Sass global (variables, mixins, reset)
├── components/
│   ├── ui/              # AppButton, AppInput, AppLoader, AppToast
│   ├── auth/            # GoogleLoginButton
│   └── users/           # UserFilters, UserTable, UserPagination
├── composables/         # useFormValidation (Zod), useDebounce
├── dtos/                # RegisterUserDTO, UserDTO, UserFiltersDTO, ApiResponseDTO
├── layouts/             # DefaultLayout
├── pages/               # LoginPage, RegisterPage, UsersPage
├── router/              # Configuração Vue Router
├── schemas/             # Schemas Zod (registerSchema, filtersSchema)
├── services/            # Axios instance (api.ts), authService, userService
├── stores/              # Pinia stores (authStore, userStore)
└── utils/               # CPF (validação, formatação, máscara)
```

## Fluxo da Aplicação

```
LoginPage ──→ Google OAuth ──→ API Callback ──→ RegisterPage ──→ UsersPage
   │              │                  │                │              │
   │         Autenticação        Redireciona      Formulário     Listagem
   │          Google OAuth      com email via     validado por   com filtros
   └── Botão                    query param       Zod + CPF     e paginação
       "Entrar com Google"
```

### Telas

1. **LoginPage** (`/`) — Botão "Entrar com Google" seguindo diretrizes de branding do Google
2. **RegisterPage** (`/register?email=...`) — Formulário com nome, CPF (máscara XXX.XXX.XXX-XX) e data de nascimento
3. **UsersPage** (`/users`) — Tabela com filtros por nome/CPF (debounce 400ms) e paginação

## DTOs e Validação

### Arquitetura DTO + Zod

- **DTOs** (`src/dtos/`): Interfaces TypeScript que definem o contrato com a API
- **Schemas Zod** (`src/schemas/`): Validação dos dados no frontend antes do envio
- Os schemas geram tipos com `z.infer` compatíveis com os DTOs
- Os services usam os DTOs para tipar parâmetros e retornos

### DTOs Disponíveis

| DTO | Descrição |
|---|---|
| `RegisterUserDTO` | Dados enviados no cadastro (name, cpf, birth_date, email) |
| `UserDTO` | Usuário retornado pela API |
| `UserFiltersDTO` | Filtros da listagem (name, cpf, per_page, page) |
| `ApiResponseDTO<T>` | Wrapper genérico de resposta |
| `AuthResponseDTO<T>` | Resposta de cadastro com token Sanctum |
| `ApiPaginatedResponseDTO<T>` | Resposta paginada com metadados |
| `ApiErrorDTO` | Formato de erro da API |
| `LoginUrlResponseDTO` | URL de autenticação Google |

### Validações (Zod)

| Campo | Regras |
|---|---|
| Nome | Obrigatório, máx 255 caracteres |
| CPF | 11 dígitos, validação algorítmica completa |
| Data de Nascimento | Obrigatória, anterior a hoje, posterior a 01/01/1900 |
| E-mail | Obrigatório, formato válido, único no sistema |

## Pré-requisitos

- Node.js 22+
- npm 10+

## Instalação

```bash
git clone <repo-url>
cd Google-Auth-Frontend-Project

cp .env.example .env
npm install
```

### Variáveis de Ambiente

```env
VITE_API_URL=http://localhost:8000/api
FRONTEND_PORT=5173
```

### Executar em Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173`.

### Build para Produção

```bash
npm run build
npm run preview
```

## Docker

O frontend possui seu próprio `Dockerfile` (multi-stage com Nginx) e `docker-compose.yml` independente:

```bash
cp .env.example .env
docker compose up -d --build
```

O frontend estará disponível em `http://localhost:5173` (porta configurável via `FRONTEND_PORT`).

A API deve estar rodando separadamente no seu próprio container (porta 8000 por padrão).
A comunicação entre frontend e API é feita via `VITE_API_URL`.

## Testes Automatizados

```bash
# Rodar todos os testes
npm test

# Modo watch
npm run test:watch
```

### Cobertura de Testes

| Módulo | Testes | Cenários |
|---|---|---|
| Utils (CPF) | 14 | sanitize, format, validate (válido, inválido, repetido, curto) |
| Schemas (Zod) | 12 | registerSchema + filtersSchema — campos obrigatórios, CPF, datas |
| Composables | 5 | useFormValidation — validate, validateField, clearErrors |
| Store (Pinia) | 5 | loadUsers, setFilters, setPage, tratamento de erro, loading state |
| Componentes | 13 | GoogleLoginButton, UserFilters, UserTable — renderização, eventos |
| DTOs | 7 | Compatibilidade de tipos para todos os DTOs |
| **Total** | **56** | |

## Endpoints Consumidos

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/google/login-url` | Obtém URL de autenticação Google |
| `POST` | `/api/users/complete` | Completa cadastro do usuário |
| `GET` | `/api/users` | Lista usuários com filtros e paginação |

## Diferenciais Entregues

- TypeScript strict mode em toda a aplicação
- DTOs dedicados para tipagem do contrato com a API
- Validação com Zod + inferência de tipos (elimina duplicação)
- Composable genérico de validação (`useFormValidation`) reutilizável
- Debounce nos filtros para evitar requisições excessivas
- Validação algorítmica de CPF completa no frontend
- Máscara de CPF em tempo real
- Componentes UI reutilizáveis (AppButton, AppInput, AppLoader, AppToast)
- Layout responsivo com Sass (variables, mixins, reset)
- Botão Google seguindo diretrizes oficiais de branding
- Lazy loading de rotas (RegisterPage, UsersPage)
- Tratamento centralizado de erros HTTP via interceptor Axios
- Feedbacks visuais (loading states, toasts de erro/sucesso)
- 56 testes automatizados cobrindo todas as camadas
- Docker multi-stage com Nginx para produção
- Autenticação via token Sanctum (Bearer) armazenado em localStorage
- Integração com docker-compose da API
