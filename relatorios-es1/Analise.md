# Análise
## Descrição do sistema
&emsp; O problema da falta de mapeamento de seres invasores afeta **pesquisadores e estudantes (usuários)**, e pode ser visto pela dificuldade em mensurar o impacto ambiental causado por tais seres, dificultando assim a elaboração de soluções que possam vir a tratar problemas ambientais em uma determinada região. O FÓRUM é um site de biologia que procura mapear os _seres invasores_ de um _determinado lugar_. Nosso software procura ser informativo de maneira que o usuário consiga visualizar facilmente os seres que não fazem parte de determinado ambiente, além de possibilitar que qualquer pessoa possa ajudar a comunidade fazendo **postagens** para identificar novos invasores.

&emsp; No sistema o <ins>**usuário** poderá fazer **postagens**</ins> sobre os **seres invasores**, uma _descrição_, informações sobre a _classificação científica_ do ser em questão, **imagem** (<ins>1 por postagem</ins>, no momento), sua _geolocalização_ e _data do avistamento_. As postagens também poderão ter <ins>**hashtags** compartilhadas com outras postagens</ins> . Essa postagem poderá ser vista a partir de uma pesquisa por geolocalização com filtros (como reino, filo, classe, ordem, família, gênero e espécie - classificação científica). Os usuários também podem editar suas postagens.
&emsp; <ins>O usuário poderá fazer **comentários**</ins> de dois _tipos_: normal ou contestação. Ele poderá contestar uma postagem que não está correta, para manter os dados do site limpos
&emsp; O usuário terá um perfil onde ele poderá ver uma lista com suas postagens. O usuário terá dois _tipos_: comum e moderador, o último poderá excluir outras postagens.


## Modelo

![modelo](./modelo.drawio.svg)
