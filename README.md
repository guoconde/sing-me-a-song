# Sing me a Song

### Descritivo:

Já pediu para alguém alguma recomendação de música? Chegou a hora de transformar isso em código. Nessa semana, você vai construir a rede Sing me a Song. Ou melhor, os testes desta rede!

Sing me a song é uma aplicação para recomendação anômina de músicas. Quanto mais as pessoas curtirem uma recomendação, maior a chance dela ser recomendada para outras pessoas 🙂

Neste projeto você receberá um front-end e back-end completamente implementados! 😱

- Projeto original: https://github.com/driven-projects/sing-me-a-song

Seu trabalho será implementar os testes do projeto 🙂

# Requisitos

- Siga as boas práticas de construção de projetos (ESLint e/ou Prettier, Variáveis de Ambiente e Readme)
- Escreva testes ponta a ponta (E2E) para os fluxos de uso do sistema
- Escreva testes de integração para todas as rotas
- Escreva testes unitários para a camada de Services com 100% de coverage
  - Atenção para mockar a camada de Repositories e dependências externas (dica: `Math.random`)

## Comandos necessários:

#### Para executar a aplicação:

#### Clonar a aplicação para seu ambiente:

- git clone

#### Instalar todas as dependências do projeto:

- npm i (faça isso tanto para a pasta de front-end quanto back end - certifique-se que está rodando dentro da pasta correta)

#### Criar as migrações no ambiente de testes:

- Acesse a pasta do back-end e rode o comando:
- npm run migrate:test

#### Iniciar o servidor no ambiente de testes:

- Ainda dentro da pasta do back-end rode o comando:
- npm run dev:test

#### Rodar os testes do jest:

- Ainda dentro da pasta do back-end rode o comando:
- npm test
- Acompanhe o terminal enquanto os testes são feitos.

#### Iniciar os testes de front-end com cypress:

- Certifique-se que esta dentro da pasta do front-end e ja tenha instalado as dependências, como descrito na segunda instrução
- Rode o comando abaixo para abrir a interface gráfica do crypress:
- npx cypress open

#### Na plataforma do cypress escolha o teste que deseja iniciar e click na desejada:

- downvote (para testar a função de dislike)
- upvote (para testar a função de like)
- home (para testar a função de inserir três recomendações de videos)
- random (para testar a função receber uma recomendação aleatória)
- top (para testar a função dos top videos)

### Qualquer dúvida, problemas ou sugestões por favor entre em contato.

## Tecnologias utilizadas:

<p align="left">
  <a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> 
  <a href="https://www.w3.org/html/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> 
  <a href="https://www.postgresql.org/" target="_blank"> <img src="https://icongr.am/devicon/react-original.svg?size=128&color=currentColor" alt="react" width="40" height="40"/> </a> 
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> 
  <a href="https://expressjs.com/pt-br/" target="_blank"> <img src="https://icongr.am/devicon/typescript-original.svg?size=128&color=currentColor" alt="typescript" width="40" height="40"/> </a> 
  <a href="https://nodejs.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> 
  <a href="https://expressjs.com/pt-br/" target="_blank"> <img src="https://icongr.am/devicon/express-original-wordmark.svg?size=128&color=currentColor" alt="express" width="40" height="40"/> </a> 
  <a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a>
  <a href="https://www.linux.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" alt="linux" width="40" height="40"/> </a> 
</p>
