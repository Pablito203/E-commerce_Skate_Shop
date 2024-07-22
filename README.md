# E-commerce Skate Shop

Uma loja virtual de produtos relacionados ao skate, disponível para web, Android e iOS. O projeto também faz integração com o sistema “Asaas” via web API e 
webhook para realização de pagamentos por pix.

## Tecnologias

  - C#
  - .NET 7
  - MSSQL Server
  - Ionic
  - Capacitor
  - Angular

## Como executar o projeto

#### Pré-requisitos

  - Java jdk 18
  - Node.js 20.11.0
  - SDK .NET 7
  - Ionic CLI (após instalar o Node.js rodar "npm i -g @ionic/cli")
  - Conta digital no Sistema [Asaas](https://asaas.com/) ou [Asaas sandbox](https://sandbox.asaas.com/)

#### Back end

  - Adicionar a chave de integração do Asaas no arquivo "appsettings.json"
  - Alterar a chave de integração e url da api no arquivo "program.cs" de acordo com o sistema onde foi criado a conta digital
  - Rodar o projeto selecionando um dev tunnels público \
  ![dev tunnels](https://github.com/user-attachments/assets/8eeb9f5c-e47d-4b10-b8e1-dccd7b1459d5)

  - No sistema Asaas cadastrar um webhook para ouvir os eventos referentes a cobrança. exemplo \
  ![image](https://github.com/user-attachments/assets/999d46a9-0dd3-44bb-abb3-95d8c4f875e4)

#### Front end

  - Rodar "npm i"
  - Rodar "ionic cap sync"
  - Alterar a url em "SkateShopClient/src/app/services/api/api.service.ts", trocar para a url criada ao rodar o back end com dev tunnels público
  - Para rodar web "ionic serve"
  - Para rodar Android "ionic capacitor run android"
  - Para rodar iOS "ionic capacitor run ios"

## Demo web

https://github.com/user-attachments/assets/5198c6cf-b641-44dc-b59c-0ae042ac7d60

![editar produto](https://github.com/user-attachments/assets/321f2cc3-4391-4f31-8f3a-55e745572bb5)

## Demo Mobile

https://github.com/user-attachments/assets/22d47c89-6d8d-4dcd-ab3f-cba7e82fdfd9

![editar produto](https://github.com/user-attachments/assets/30f92e44-4ae4-4702-a529-e8d67e936345)
