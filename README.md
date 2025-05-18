# Frontend do Sistema Financeiro com Autenticação JWT

Este projeto é o frontend para um Sistema Financeiro com autenticação JWT, desenvolvido em React + Vite, que se integra com uma API Node.js + Express + MongoDB.

## Tecnologias Utilizadas

- React 18
- Vite
- React Router Dom (para roteamento)
- Axios (para requisições HTTP)
- React Toastify (para notificações)
- LocalStorage (para armazenamento do token JWT)

## Funcionalidades

### Telas Públicas

- **Tela de Cadastro**: Formulário com validação para registro de novos usuários
- **Tela de Login**: Autenticação com armazenamento de token JWT

### Área Logada (Protegida)

- **Dashboard**: Visualização de estatísticas financeiras
- **CRUD de Transações**:
  - Listagem de transações
  - Criação de novas transações
  - Edição de transações existentes
  - Exclusão de transações
- **Logout**: Remoção do token e redirecionamento para login

## Estrutura do Projeto

```
src/
├── assets/
│   └── css/           # Estilos CSS
├── components/        # Componentes reutilizáveis
├── context/          # Contextos React (Auth e Transaction)
├── pages/
│   ├── auth/         # Páginas de autenticação
│   └── dashboard/    # Páginas da área logada
├── services/         # Serviços de API
└── utils/            # Funções utilitárias
```

## Como Executar Localmente

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```
   npm run dev
   ```
4. Acesse `http://localhost:5173` no navegador

## Integração com o Backend

O frontend está configurado para se conectar ao backend em:

```
https://jwt-auth-mongodb.onrender.com/api
```

Todas as requisições autenticadas incluem automaticamente o token JWT no cabeçalho de autorização.

## Responsividade

O projeto foi desenvolvido com design responsivo, adaptando-se a diferentes tamanhos de tela, desde dispositivos móveis até desktops.
