# Product Backlog - ConectaTech Summit

## Épico 1: Gestão de Identidade e Acesso
- **US01 - Registo de Utilizador**
  - *Como* visitante,
  - *Quero* criar uma conta com nome, email e password,
  - *Para* poder inscrever-me em eventos.
  - **Critérios de Aceitação**:
    - Validar email único.
    - Password encriptada.
    - Retornar token JWT após sucesso.

- **US02 - Login de Utilizador**
  - *Como* utilizador registado,
  - *Quero* autenticar-me na plataforma,
  - *Para* aceder à minha área pessoal.
  - **Critérios de Aceitação**:
    - Validar credenciais.
    - Retornar token JWT.
    - Persistir sessão no frontend.

## Épico 2: Gestão de Eventos (Público & Admin)
- **US03 - Visualizar Lista de Eventos**
  - *Como* visitante ou utilizador,
  - *Quero* ver todos os eventos disponíveis (nome, data, descrição),
  - *Para* escolher quais me interessam.
  - **Critérios de Aceitação**:
    - Listagem pública acessível sem login.
    - Mostrar detalhes básicos do evento.

- **US04 - CRUD de Eventos (Admin)**
  - *Como* administrador,
  - *Quero* criar, editar e remover eventos,
  - *Para* manter a plataforma atualizada.
  - **Critérios de Aceitação**:
    - Endpoints protegidos (role=admin ou simulado).
    - Validação de dados do evento.

## Épico 3: Gestão de Inscrições
- **US05 - Inscrever em Evento**
  - *Como* utilizador autenticado,
  - *Quero* clicar num botão "Inscrever",
  - *Para* garantir o meu lugar no evento.
  - **Critérios de Aceitação**:
    - Apenas utilizadores logados.
    - Impedir inscrição duplicada.
    - Feedback visual de sucesso.

- **US06 - Visualizar "Meus Eventos"**
  - *Como* utilizador,
  - *Quero* ver uma lista das minhas inscrições ativas,
  - *Para* gerir a minha agenda.
  - **Critérios de Aceitação**:
    - Rota privada (/dashboard).
    - Listar apenas eventos do utilizador logado.

- **US07 - Cancelar Inscrição**
  - *Como* utilizador,
  - *Quero* remover uma inscrição,
  - *Para* libertar o lugar caso não possa ir.
  - **Critérios de Aceitação**:
    - Botão "Cancelar" na lista de "Meus Eventos".
    - Atualização imediata da lista.
