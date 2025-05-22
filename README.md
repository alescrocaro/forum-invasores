# Invasores

## Descrição do software
Este software tem como objetivo principal ajudar pesquisadores e estudantes de biologia a mapear seres invasores de uma determinada área. 
Uma pessoa qualquer pode postar a foto de um possível ser invasor, então uma outra pessoa pode ajudá-la a determinar se realmente é; ou o próprio usuário pode fazer uma postagem já marcando aquele ser como invasor, a postagem ficará aberta para discussão entre usuários para chegarem em um consenso. Além disso, também há a possibilidade do usuário visualizar os dados destes seres para uma área específica em um mapa.


## Principais requisitos (funcionalidades)
Para visualizar as funcionalidades definidas no início do projeto, visualize [este arquivo](./firstRequirements.md)


## Integrações com terceiros
- [GBIF](https://techdocs.gbif.org/en/openapi)
 Utilizada para pesquisar a taxonomia de um espécime a partir de seu nome comum.


## Instruções para download e execução do projeto em qualquer computador
### Dependências necessárias para executar o projeto:
- React;
- Node;
- Docker
- Docker compose


## Instalação

Faça um clone do repositório:
```sh
git clone git@github.com:alescrocaro/forum-invasores.git
```

É necessário ter instalado o docker na sua máquina. Após a instalação do docker é preciso instalar o docker compose. Caso esteja usando windows, a instalação do docker compose já vem junto com o docker.
```sh
DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
mkdir -p $DOCKER_CONFIG/cli-plugins
curl -SL https://github.com/docker/compose/releases/download/v2.4.1/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
```
Dê permissão do binário para seu usuário
```sh
chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
```
Para verificar se a instalação foi bem sucedida, execute:
```sh
docker compose version
```


Você tem duas opções:
### Utilizar as imagens docker diretamente
```sh
[forum-invasores] $
docker compose up -d
```

Agora basta acessar a URL definida (padrão 0.0.0.0:3777).


### Instalar cada componente - devs
Para subir o banco, execute os comandos (sobe instância do banco e da api, se não quiser subir a api, basta editar o Dockerfile do backend comentando as linhas referentes à API):
```sh
[forum-invasores/backend] $
sudo chmod 666 /var/run/docker.sock
docker compose -f docker-compose-db.yaml up -d
```
acesso padrão:\
usuário: admin\
senha: 123456

Para criar e migrar o banco, execute (no backend):
```sh
[forum-invasores/backend] $
npm install
npm create-db # utiliza o arquivo /src/database/config/config.json
npm migrate-db
```

Você pode criar um usuário automaticamente executando o comando:
```sh
[forum-invasores/backend] $
npx sequelize db:seed --seed seeders/20240224021706-add-first-users.js
# credenciais:
# alexandre@example.com and alexandre2@example.com
# 123456
```





#### Executar o backend:
```sh
[forum-invasores/backend] $
npm install
npm run dev
```

#### Executar o frontend:
```sh
[forum-invasores/frontend] $
npm install
npm start
```
