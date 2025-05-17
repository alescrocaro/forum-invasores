import { Card, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { AlertTriangleIcon, BinocularsIcon, BugIcon, CameraIcon, EyeIcon, InfoIcon, SquarePlusIcon, TargetIcon } from 'lucide-react';
import HelpLPLayout from '../../components/Help/layout';
import saguiDeTufoBranco1 from '../../img/sagui-de-tufo-branco-1.png';
import saguiDeTufoBranco2 from '../../img/sagui-de-tufo-branco-2.png';
import saguiDeTufoBranco3 from '../../img/sagui-de-tufo-branco-3.png';
import ImageSlider from './imageSlider';

const TargetSpecie = () => {
  return (
    <div className="sticky top-4 bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <Typography.Title level={2} className="!mb-4 flex items-center gap-2">
        <TargetIcon className="w-6 h-6" />
        Espécie em alta
      </Typography.Title>
      <Typography.Text className="!mb-4">
        <span className="text-gray">Atualmente, este é o espécime que os administradores estão monitorando. Ele deve ser focado para a coleta de dados.</span>
      </Typography.Text>
      <Card
        className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
          className="!mb-10"
        />
      </Card>
    </div>
  );
};

const HelpPage = () => {
  return (
    <HelpLPLayout>
      <div id="features" className="block h-0 -mt-[var(--header-height)] pt-[var(--header-height)] invisible" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <Typography.Title level={2} className="!mb-4 flex items-center gap-2">
                <BugIcon className="w-6 h-6" />
                O que é uma invasora?
              </Typography.Title>
              <div className="max-w-none">
                <p className="text-md leading-relaxed">
                  Espécies exóticas são organismos vivos encontrados fora de sua área
                  de natural de distribuição, incluindo desde vírus, fungos, plantas
                  como árvores e arbustos, invertebrados e vertebrados como peixes,
                  anfíbios, répteis, aves e mamíferos. Quando essas espécies exóticas
                  exercem um impacto negativo sobre as espécies nativas, que são
                  autóctones de aquele local, são classificadas como invasoras.
                </p>

                <Typography.Title level={4} className="!mt-6 !mb-4 flex items-center gap-2">
                  <InfoIcon className="w-6 h-6" />
                  Impacto causado
                </Typography.Title>
                <p className="text-gray-700 leading-relaxed">
                  Esses impactos podem ser significativos, afetando a biodiversidade
                  local alterando as funções dos ecossistemas, gerando competição com
                  as espécies nativas e transformando os habitats. Também podem gerar
                  problemas na saúde humana, na agricultura e danificando as
                  infraestruturas, representando consideráveis prejuízos econômicos.
                </p>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <Typography.Title level={2} className="!mb-4 flex items-center gap-2">
                <EyeIcon className="w-6 h-6" />
                O que devo observar para diferenciar a invasora?
              </Typography.Title>
              <div className="max-w-none">
                <p className="text-md leading-relaxed mb-4">
                  Para identificar uma espécie invasora, observe as seguintes características:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Aparência física distinta das espécies nativas locais</li>
                  <li>Comportamento agressivo ou dominante em relação a outras espécies</li>
                  <li>Crescimento ou reprodução rápida e descontrolada</li>
                  <li>Presença em ambientes onde não é comumente encontrada</li>
                  <li>Ausência de predadores naturais na região</li>
                  <li>Capacidade de sobreviver em diferentes condições ambientais</li>
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <Typography.Title level={2} className="!mb-4 flex items-center gap-2">
                <CameraIcon className="w-6 h-6" />
                Como devo registrar a foto?
              </Typography.Title>
              <div className="max-w-none">
                <p className="text-md leading-relaxed mb-4">
                  Para um registro fotográfico eficiente, considere:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Fotografe o organismo por diferentes ângulos</li>
                  <li>Capture detalhes específicos como coloração, textura e tamanho</li>
                  <li>Inclua elementos do ambiente ao redor para contexto</li>
                  <li>Use algum objeto de referência para escala (quando possível)</li>
                  <li>Evite fotos desfocadas ou com pouca iluminação</li>
                  <li>Registre características únicas que possam ajudar na identificação</li>
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <Typography.Title level={2} className="!mb-4 flex items-center gap-2">
                <BinocularsIcon className="w-6 h-6" />
                Qual hábito observar?
              </Typography.Title>
              <div className="max-w-none">
                <p className="text-md leading-relaxed mb-4">
                  Ao observar uma espécie potencialmente invasora, preste atenção em:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Padrões de alimentação e tipo de alimento consumido</li>
                  <li>Horários de maior atividade (diurno/noturno)</li>
                  <li>Comportamento social (solitário ou em grupo)</li>
                  <li>Interações com outras espécies</li>
                  <li>Locais preferidos para abrigo ou nidificação</li>
                  <li>Padrões de movimento e dispersão</li>
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <Typography.Title level={2} className="!mb-4 flex items-center gap-2">
                <AlertTriangleIcon className="w-6 h-6" />
                Qual cuidado tomar
              </Typography.Title>
              <div className="max-w-none">
                <p className="text-md leading-relaxed mb-4">
                  Os registros de espécies invasoras podem ser realizados em condições
                  ambientais e locais muito variados, exigindo atenção e cuidados para
                  manter sua segurança. Essas precauções visam garantir a segurança
                  pessoal dos envolvidos durante as atividades de coleta de dados.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Evite fazer trilhas em locais de difícil acesso, solitárias ou com tráfego intenso de veículos</li>
                  <li>Use vestimentas adequadas: calças e camisetas compridas, calçados fechados</li>
                  <li>Utilize protetor solar, boné e outras proteções em dias ensolarados</li>
                  <li>Mantenha distância segura das espécies a serem registradas</li>
                  <li>Use equipamentos de proteção específicos quando necessário</li>
                  <li>Evite contato direto com espécies potencialmente perigosas</li>
                </ul>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <Typography.Title level={2} className="!mb-4 flex items-center gap-2">
                <SquarePlusIcon className="w-6 h-6" />
                Como realizar uma postagem?
              </Typography.Title>
              <div className="max-w-none">
                <p className="text-md leading-relaxed mb-4">
                  Uma boa descrição deve incluir:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Data e hora da observação</li>
                  <li>Localização precisa do avistamento</li>
                  <li>Características físicas detalhadas do organismo</li>
                  <li>Comportamento observado</li>
                  <li>Condições ambientais (clima, temperatura, etc.)</li>
                  <li>Qualquer característica única ou incomum notada</li>
                </ul>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <TargetSpecie />
          </div>
        </div>
      </div>
    </HelpLPLayout>
  );
};

export default HelpPage;
