----------------------------------------- <a href="#link">Link site</a> |  <a href="#fotoProj">Screenshots do projeto  </a>  |  <a href="#apresentacao">Apresentação do projeto</a> --------------------

--------------------------------------------------- <a href="#tecnologias">Tecnologias</a> | <a href="#uso">uso do projeto em localhost</a> -------------------------------------------

​	

## <p id="inicio">Bem-vindo</p>

Repositório do projeto  Let me ask da NLW onde criaremos uma aplicação SPA 100% funcional com sistema de login com o Google.

<img src="https://user-images.githubusercontent.com/72765913/123464441-2d488b00-d5c3-11eb-8dd7-40c5a61bae7b.png" width="600">



 <h3 id="link">Links</h3>
Link para o site hospedado pelo firebase:

https://letmeask-d87c4.web.app



Link para a minha sala onde você pode escrever comentários ou feedbacks para mim, estarei sempre olhando essa página:

https://letmeask-d87c4.web.app/rooms/-Md0GZ3OPeuuDcxrP4yf 



## <p id="fotoProj">Tela do dono da sala</p>

<img src="https://user-images.githubusercontent.com/72765913/123464724-93351280-d5c3-11eb-8c2c-3f0f940218a6.jpeg" width="600">



## Tela do usuário:



<img src="https://user-images.githubusercontent.com/72765913/123465203-34bc6400-d5c4-11eb-8f1e-bf0002c64583.jpeg" width="600">





### <p id="apresentacao">O projeto</p>

O projeto consiste na criação de um site onde uma pessoa poderá criar uma sala e compartilhar o código dessa sala e as pessoas que entrarem poderão fazer perguntas e os próprios usuários iriam votar nas melhores perguntas para que o dono da sala responda.

###### Exemplo

um professor está fazendo uma live de programação e  tem 500 pessoas perguntando no chat, o professor pode acabar se perdendo com tantas pessoas fazendo perguntas ao mesmo tempo e pode acabar não sabendo quem responder, o site vem justamente para solucionar esse problema e ajudar o professor a saber qual pergunta responder.

 

### <p id="tecnologias">Tecnologia usadas: <p>

- Reactjs

- Firebase
  - autenticação
  - database realTime
  - hosting



## <p id="uso">USO DO PROJETO</p>

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

