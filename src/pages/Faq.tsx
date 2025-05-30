
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import faqImage from '../assets/images/faq.png';

const FaqPage = () => {
  useEffect(() => {
      document.title = "FAQ | Studio Brisa";
    }, []);
  return (
    <>
      {/* Imagem Principal */}
      <div className="d-flex justify-content-center">
        <img src={faqImage} className="img-fluid" alt="Perguntas Frequentes" />
      </div>

      {/* Conteúdo Principal */}
      <main className="container">
        <section className="mt-5 mb-5">
          <h1 className="text-dark-purple mb-5">Perguntas Frequentes</h1>
          
          <div className="faq-accordion" id="faqAccordion">
            {/* Item 1 */}
            <div className="card faq-card">
              <div className="card-header faq-header" id="headingOne">
                <h2 className="mb-0">
                  <button 
                    className="btn btn-link faq-btn collapsed" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#collapseOne" 
                    aria-expanded="false" 
                    aria-controls="collapseOne"
                  >
                    Porque contratar um arquiteto?
                    <i className="fas fa-chevron-down arrow-icon"></i>
                  </button>
                </h2>
              </div>
              <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#faqAccordion">
                <div className="card-body faq-body">
                  Contratar um arquiteto transforma suas ideias em realidade de maneira eficiente e inovadora. Eles não só garantem a estética do projeto, mas também a funcionalidade e valorização do seu imóvel. Com um arquiteto, você economiza tempo e dinheiro, evitando erros comuns e aproveitando ao máximo o potencial do seu espaço.
                </div>
              </div>
            </div>
            
            {/* Item 2 */}
            <div className="card faq-card">
              <div className="card-header faq-header" id="headingTwo">
                <h2 className="mb-0">
                  <button 
                    className="btn btn-link faq-btn collapsed" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#collapseTwo" 
                    aria-expanded="false" 
                    aria-controls="collapseTwo"
                  >
                    O que está incluído nos serviços de um arquiteto?
                    <i className="fas fa-chevron-down arrow-icon"></i>
                  </button>
                </h2>
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#faqAccordion">
                <div className="card-body faq-body">
                  Nossos serviços abrangem todas as etapas do projeto: desde a concepção inicial, desenvolvimento de plantas, até o acompanhamento e gestão da obra. Incluímos também a coordenação com outros profissionais e a obtenção de todas as licenças necessárias.
                </div>
              </div>
            </div>
            
            {/* Item 3 */}
            <div className="card faq-card">
              <div className="card-header faq-header" id="headingThree">
                <h2 className="mb-0">
                  <button 
                    className="btn btn-link faq-btn collapsed" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#collapseThree" 
                    aria-expanded="false" 
                    aria-controls="collapseThree"
                  >
                    Quanto tempo leva para concluir um projeto arquitetônico?
                    <i className="fas fa-chevron-down arrow-icon"></i>
                  </button>
                </h2>
              </div>
              <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#faqAccordion">
                <div className="card-body faq-body">
                  O tempo para concluir um projeto depende da complexidade e do tamanho. No entanto, nosso compromisso é com a eficiência. Projetos residenciais simples podem ser concluídos em 3 a 6 meses, enquanto projetos maiores podem variar.
                </div>
              </div>
            </div>
            
            {/* Item 4 */}
            <div className="card faq-card">
              <div className="card-header faq-header" id="headingFour">
                <h2 className="mb-0">
                  <button 
                    className="btn btn-link faq-btn collapsed" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#collapseFour" 
                    aria-expanded="false" 
                    aria-controls="collapseFour"
                  >
                    O que é um projeto arquitetônico sustentável?
                    <i className="fas fa-chevron-down arrow-icon"></i>
                  </button>
                </h2>
              </div>
              <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#faqAccordion">
                <div className="card-body faq-body">
                  Projetos sustentáveis são aqueles que utilizam recursos de forma eficiente e minimizam impactos ambientais. Isso inclui o uso de materiais eco-friendly, soluções para economia de energia e água, além de designs que promovem a saúde e o bem-estar dos ocupantes. Investir em sustentabilidade é investir no futuro e na valorização do seu imóvel.
                </div>
              </div>
            </div>
            
            {/* Item 5 */}
            <div className="card faq-card">
              <div className="card-header faq-header" id="headingFive">
                <h2 className="mb-0">
                  <button 
                    className="btn btn-link faq-btn collapsed" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#collapseFive" 
                    aria-expanded="false" 
                    aria-controls="collapseFive"
                  >
                    O que é necessário para começar um projeto de arquitetura?
                    <i className="fas fa-chevron-down arrow-icon"></i>
                  </button>
                </h2>
              </div>
              <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#faqAccordion">
                <div className="card-body faq-body">
                  Para começar, você precisa de uma visão clara das suas necessidades e desejos, documentos do imóvel, e um orçamento inicial. Agende uma reunião conosco para discutir suas ideias e objetivos. Vamos guiar você em todas as etapas, do conceito ao acabamento, garantindo que seu projeto seja exatamente como imaginou.
                </div>
              </div>
            </div>
            
            {/* Item 6 */}
            <div className="card faq-card">
              <div className="card-header faq-header" id="headingSix">
                <h2 className="mb-0">
                  <button 
                    className="btn btn-link faq-btn collapsed" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#collapseSix" 
                    aria-expanded="false" 
                    aria-controls="collapseSix"
                  >
                    Como um projeto arquitetônico pode aumentar o valor do meu imóvel?
                    <i className="fas fa-chevron-down arrow-icon"></i>
                  </button>
                </h2>
              </div>
              <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#faqAccordion">
                <div className="card-body faq-body">
                  Um projeto arquitetônico bem planejado pode aumentar significativamente o valor do seu imóvel. Arquitetos criam soluções inovadoras que melhoram a funcionalidade e a estética do espaço, tornando-o mais atrativo para potenciais compradores ou investidores.
                </div>
              </div>
            </div>
            
            {/* Item 7 */}
            <div className="card faq-card">
              <div className="card-header faq-header" id="headingSeven">
                <h2 className="mb-0">
                  <button 
                    className="btn btn-link faq-btn collapsed" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#collapseSeven" 
                    aria-expanded="false" 
                    aria-controls="collapseSeven"
                  >
                    Vocês oferecem serviços personalizados de acordo com minhas necessidades?
                    <i className="fas fa-chevron-down arrow-icon"></i>
                  </button>
                </h2>
              </div>
              <div id="collapseSeven" className="collapse" aria-labelledby="headingSeven" data-parent="#faqAccordion">
                <div className="card-body faq-body">
                  Sim, oferecemos serviços totalmente personalizados para atender às suas necessidades específicas. Cada projeto é único, e nosso objetivo é transformar sua visão em realidade. Trabalhamos em estreita colaboração com você para entender suas preferências, estilo de vida e orçamento.
                </div>
              </div>
            </div>
            
            {/* Item 8 */}
            <div className="card faq-card">
              <div className="card-header faq-header" id="headingEight">
                <h2 className="mb-0">
                  <button 
                    className="btn btn-link faq-btn collapsed" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#collapseEight" 
                    aria-expanded="false" 
                    aria-controls="collapseEight"
                  >
                    Como a tecnologia é utilizada em seus projetos arquitetônicos?
                    <i className="fas fa-chevron-down arrow-icon"></i>
                  </button>
                </h2>
              </div>
              <div id="collapseEight" className="collapse" aria-labelledby="headingEight" data-parent="#faqAccordion">
                <div className="card-body faq-body">
                  Utilizamos tecnologia de ponta em nossos projetos para garantir precisão e eficiência. Ferramentas como BIM (Modelagem de Informação da Construção) permitem a criação de modelos digitais detalhados, facilitando a visualização do projeto e a detecção de possíveis problemas antes da construção.
                </div>
              </div>
            </div>
            
            {/* Item 9 */}
            <div className="card faq-card">
              <div className="card-header faq-header" id="headingNine">
                <h2 className="mb-0">
                  <button 
                    className="btn btn-link faq-btn collapsed" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#collapseNine" 
                    aria-expanded="false" 
                    aria-controls="collapseNine"
                  >
                    Quais são os custos associados à contratação de um arquiteto?
                    <i className="fas fa-chevron-down arrow-icon"></i>
                  </button>
                </h2>
              </div>
              <div id="collapseNine" className="collapse" aria-labelledby="headingNine" data-parent="#faqAccordion">
                <div className="card-body faq-body">
                  Os custos variam dependendo da complexidade e do tamanho do projeto, mas investir em um arquiteto geralmente resulta em economia a longo prazo. Os arquitetos evitam erros caros, garantem o cumprimento de prazos e ajudam na escolha de materiais e soluções que cabem no seu orçamento. Oferecemos uma consulta inicial gratuita para discutir suas necessidades e fornecer uma estimativa detalhada dos custos envolvidos.
                </div>
              </div>
            </div>
          </div>
          
          {/* Botão de Orçamento */}
          <div className="text-center mt-5">
            <Link to="/contato" className="btn btn-primary btn-orcamento">Solicite um orçamento agora</Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default FaqPage;