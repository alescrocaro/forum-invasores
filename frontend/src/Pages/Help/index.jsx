import { Card, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import Layout from '../../components/Layout';
import saguiDeTufoBranco1 from '../../img/sagui-de-tufo-branco-1.png';
import saguiDeTufoBranco2 from '../../img/sagui-de-tufo-branco-2.png';
import saguiDeTufoBranco3 from '../../img/sagui-de-tufo-branco-3.png';
import ImageSlider from './imageSlider';

const TargetSpecie = () => {
  return (
    <div
      /* style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }} */
      className="flex "
    >
      <Card
        title={''}
        desc
        cover={
          <ImageSlider
            images={[
              saguiDeTufoBranco1,
              saguiDeTufoBranco2,
              saguiDeTufoBranco3,
            ]}
          />
        }
      >
        <Meta
          title="Sagui-de-tufo-branco ou muco-estrela"
          description="Callithrix jacchus"
        />
      </Card>
      <div>a</div>
      {/* <Typography.Text>
        <strong>Descrição geral: </strong>Os saguis são primatas pequenos,
        medindo aproximadamente 20 cm e pesando entre 200 a 350 gramas. Possuem
        tufos laterais brancos na cabeça, uma mancha branca na testa, cabeça
        preta ou castanho escuro e corpo cinza rajado. Possuem cauda comprida
        com faixas transversais pretas e cinzas.
      </Typography.Text>
      <Typography.Text>
        <strong>Origem da espécie:</strong> Originários do nordeste do Brasil,
        os saguis não existiam naturalmente na região sul. História da invasão:
        No sul do Brasil, os saguis chegaram por causa do tráfico ilegal para
        venda como animais de estimação, especialmente durante as décadas de
        1980 e 1990.
      </Typography.Text>
      <Typography.Text>
        <strong> Relações ecológicas: </strong>Representam uma ameaça à
        sobrevivência de espécies nativas, uma vez que se reproduzem com elas,
        gerando populações híbridas que podem levar à extinção das espécies
        nativas. Além disso, competem por alimentos e espaço, invadindo o
        território de espécies locais e cruzando-se com elas para formar
        híbridos.
      </Typography.Text>
      <Typography.Text>
        <strong>Problemática:</strong> Os saguis desenvolvem dependência de
        alimentos fornecidos por humanos, predam filhotes de aves e ovos, além
        de invadir áreas urbanas. Existe também o risco de transmissão de
        doenças entre saguis e seres humanos, e vice-versa.
      </Typography.Text> */}
    </div>
  );
};

const HelpPage = () => {
  return (
    <Layout>
      {/* <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}> */}
      <div className="flex gap-8">
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <>
          <Typography.Title>O que é uma invasora?</Typography.Title>
          <p>
            Espécies exóticas são organismos vivos encontrados fora de sua área
            de natural de distribuição, incluindo desde vírus, fungos, plantas
            como árvores e arbustos, invertebrados e vertebrados como peixes,
            anfíbios, répteis, aves e mamíferos. Quando essas espécies exóticas
            exercem um impacto negativo sobre as espécies nativas, que são
            autóctones de aquele local, são classificadas como invasoras.
          </p>
          <h2>Impacto causado</h2>
          <p>
            Esses impactos podem ser significativos, afetando a biodiversidade
            local alterando as funções dos ecossistemas, gerando competição com
            as espécies nativas e transformando os habitats. Também podem gerar
            problemas na saúde humana, na agricultura e danificando as
            infraestruturas, representando consideráveis prejuízos econômicos.
          </p>
          <h1>Identificação</h1>
          <h2>O que observar?</h2>
          <h2>Como registrar uma foto?</h2>
          <h3>
            Quais características do ambiente e físicas do ser devo incluir nas
            fotos?
          </h3>
          <h2>Como escrever uma boa descrição?</h2>
          <h1>Orientações de segurança</h1>
          <p>
            Os registros de espécies invasoras podem ser realizados em condições
            ambientais e locais muito variados, exigindo atenção e cuidados para
            manter sua segurança. Essas precauções visam garantir a segurança
            pessoal dos envolvidos durante as atividades de coleta de dados. Por
            favor, esteja sempre ciente das condições locais e das diretrizes
            específicas para minimizar quaisquer riscos potenciais.
            <ul>
              <li>
                Evite fazer trilhas em locais de difícil acesso, solitárias ou
                com tráfego intenso de veículos.
              </li>
              <li>
                Recomenda-se o uso de vestimentas adequadas, como calças e
                camisetas compridas, assim como calçados fechados, especialmente
                em áreas vegetadas, devido ao maior risco de picadas de
                mosquitos e outros insetos. O uso de repelente também é
                recomendado.
              </li>
              <li>
                Utilize protetor solar, boné e outras proteções adequadas em dia
                de ensolarados e durante períodos prolongados de exposição ao
                sol.
              </li>
              <li>
                Mantenha uma distância prudente das espécies a serem
                registradas, respeitando seu espaço e evitando qualquer tipo de
                interferência.
              </li>
            </ul>
          </p>
        </>
        <>
          <TargetSpecie />
        </>
      </div>
    </Layout>
  );
};

export default HelpPage;
