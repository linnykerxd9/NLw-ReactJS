## Bem-vindo

Repositório do projeto  Let me ask da NLW onde criaremos uma aplicação SPA 100% funcional com sistema de login com o Google.



### O projeto

O projeto consiste na criação de um site onde uma pessoa poderá criar uma sala e compartilhar o código dessa sala e as pessoas que entrarem poderão fazer perguntas e os próprios usuários iriam votar nas melhores perguntas para que o dono da sala responda.

###### Exemplo

um professor está fazendo uma live de programação e  tem 500 pessoas perguntando no chat, o professor pode acabar se perdendo com tantas pessoas fazendo perguntas ao mesmo tempo e pode acabar não sabendo quem responder, o site vem justamente para solucionar esse problema e ajudar o professor a saber qual pergunta responder.



## USO DO PROJETO

Primeiro precisa-se criar o firebase pois estamos usando variáveis locais.

Link : https://console.firebase.google.com/u/0/?hl=pt

entrando nesse link você pode clicar em adicionar projeto e criar seu projeto no firebase

- Primeiro passo

após ter criado o seu projeto, vá em "Criação > authentication" clique no provedor de login com o Google, coloque o seu e-mail e ative a autenticação com o Google.



- Segundo passo

após isso vá em Realtime database e crie seu database.



- Terceiro passo

Após ter criado o database clique em "visão geral do projeto" vá em primeiros passos, coloque um nome e crie o seu firebase.



- Quarto Passo

dentro da pasta services no arquivo firebase.ts  Subistitua o firebaseConfig  que esta lá pelo seu firebaseConfig que irá aparecer quando criar o seu firebase, com isso o projeto já estará funcionando.



- Quinto passo

Apenas precisa dar yarn install e aproveitar.

