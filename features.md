# Possíveis funcionalidades
Estas funcionalidades foram mapeadas através de uma série de trocas de emails entre professores da área.\
Abaixo, elas estão separadas em tópicos, que poderiam ser diferentes milestones no desenvolvimento.



## Identificação de invasores
Identificar espécies pode ser desafiador até mesmo para pesquisadores da área, portanto é importante garantir que os usuários sejam guiados apropriadamente ao utilizar a plataforma, principalmente para publicar observações. Dessa forma, diminuimos esforços desnecessários, como contestar publicações de seres que não são invasores.

- Em um primeiro contato do usuário com a plataforma, poderíamos dar informações às pessoas sobre o que são as invasoras, a fim de facilitar o entendimento sobre o que pode ser publicado na plataforma, e qual o propósito da plataforma - algo como uma landing page de primeiro acesso. 
  - Criar uma espécie de check list para nortear o que subir ou não na plataforma, que foto tirar
    - elimina uma parte das fotos aleatórias
  - Dar exemplos de espécies no Paraná que são consideradas invasoras
    - Exemplos chamativos, com fotos, explicando origem da espécie, algo do histórico de invasão, relações ecológicas, distribuição. Em formato de cards.

- Seletividade da busca
  - Para o usuário, buscar por espécies exóticas e invasoras pode ser como procurar uma agulha no palheiro
  - Ao contrario de plataformas de biodiversidade (iNaturalist), lidar com espécies exóticas e invasoras requer que a busca deva ser direcionada para alguns seres em específico ou para organismos com potencial de invasão para o estado
  - É necessária uma lista inicial para a busca de espécies
  - Importante selecionar espécies chave para um treinamento de identificação
    - Por exemplo, em  aves, qual parte (cor, forma, tamanho...etc) observar para inferir a espécie? e para plantas? e para peixes? e para vertebrados?
    > Para isso, poderíamos adicionar missões iniciais, como identificar uma invasora de cada reino (uma missão para cada reino), identificar 3 invasoras de determinado reino, ou algo do tipo.
    - Nesse sentido, cards para as espécies é uma ideia bem interessante. Lembrando que organismos sesseis são mais fáceis de serem observados em relação aos vágeis, então pode ser que a busca não resulte em observação, o que pode ser um estimulo negativo para o usuário. Porém, penso que é importante para o log da plataforma.
    > Seguindo nessa ideia de cards, eles poderiam estar destacados na página inicial, com uma barra de progresso para completar as missões citadas acima

    ![image](https://github.com/alescrocaro/forum-invasores/assets/37521313/ce950725-97a0-40b8-bb7a-a1e28a6597bd)

- As espécies escolhidas para serem consideradas espécies-chave teriam que ser fáceis de identificar e poderíamos até discutir a possibilidade de incluir invasoras "carismáticas" para facilitar essa parte inicial do treinamento de identificação.
- Também seria possível usar uma amostragem dos dados de espécies exóticas e invasoras do Paraná - até o momento tem ~500 espécies - para orientar a atividade do usuário. O usuário poderia ter primeiramente uma fase de treinamento, na qual procura por registros de espécies já detectadas e depois pode contribuir para a potencial detecção de novas espécies (espécies de outros estados que em tese não deveriam ocorrer no Paraná).


Com isso, podemos extrair os principais pontos:
- Ao acessar a plataforma, o usuário visualiza uma página com as seguintes informações:
  - Objetivo da plataforma
  - O que é uma espécie invasora
  - Orientações sobre o que subir na plataforma, como tirar fotos melhores para a identificação, como identificar uma invasora, entre outras informações
  - Botão "Continuar" que só fica disponível ao rolar por todas informações, redireciona o usuário para a página inicial (listagem de postagens)
- Tour pela página inicial (utilizar componente do antdesign de tour para mostrar informações sobre o que são os cards iniciais, como fazer uma publicação, como visualizar publicações mapa e listagem, como filtrar publicações)
- Adicionar botão em algum lugar na Home para voltar à landing page de infos (que servirá como uma forma de documentação, com tópicos de cada assunto)
- Utilizar uma lista inicial de espécies para criar missões, fazendo com que o usuário vá a campo encontrar essas invasoras
  - Devem ser espécies de fácil identificação no início


## Engajamento
- Desafio mensal para que os usuários procurem por espécies específicas
- Mostrar estatísticas ao usuário em forma de conquistas, para serem mostradas em seu perfil, com o intuito de fazer com que um usuário não-pesquisador se interesse pela plataforma e continue contribuindo


### Auxílio ao usuário
Adicionar dicas durante a criação do post. Ex. dicas para criar um título de publicação: "\<invasor\> em \<local/bioma\>", ou instruções de como saber o clima/bioma do local da observação, entre outras.


### Outros
- Eu acho que faz sentido que as pessoas consigam mandar mais fotos do que no final vão ficar como parte do registro, e ser efetivamente classificadas como invasoras.
> Pesquisadores podem discutir na postagem sobre quais fotos deveriam ser mantidas ou não.
> quantas fotos devem ser mantidas? 1 basta? se sim, usuário deve poder escolher qual foto deve ser mantida para relatórios

