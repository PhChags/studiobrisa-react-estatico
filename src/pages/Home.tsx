import { useEffect } from 'react';

// Importando imagens
import headerImg from '../assets/images/header.png';
import formacaoImg from '../assets/images/formacao.png';
import diferenciaisImg from '../assets/images/diferenciais.png';

const HomePage = () => {
  // Inicializa o accordion
  useEffect(() => {
    document.title = "Studio Brisa";
    const accordionButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');
    accordionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const target = button.getAttribute('data-bs-target');
        if (target) {
          const collapseElement = document.querySelector(target);
          if (collapseElement) {
            collapseElement.classList.toggle('show');
          }
        }
      });
    });
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center">
        <img src={headerImg} className="img-fluid" alt="Projeto de arquitetura moderno" />
      </div>

      {/* Seção Sobre */}
      <section id="sobre" className="mb-5 mt-5">
        <div className="p-4 bg-dark-purple rounded-2 text-justify">
          <h1>Sobre</h1><br />
          <p> <strong> Mariana Costa </strong> é arquiteta e designer de interiores formada pela Universidade de São Paulo (USP), com especialização em Design Sustentável pela Politecnico di Milano (Itália). Com mais de 15 anos de experiência no mercado, já desenvolveu projetos residenciais, comerciais e corporativos premiados, sempre com foco na harmoria entre funcionalidade e estética.</p>
          <p> Fundadora do escritório <strong>Studio Brisa</strong>, Mariana acredita que bons projetos devem refletir a personalidade dos clientes enquanto criam espaços práticos e inspiradores. Seu trabalho combina técnicas tradicionais com as mais recentes inovações em materiais e tecnologias sustentáveis, atendendo principalmente ao <strong>Rio de Janeiro e região metropolitana (Niterói, São Gonçalo, Maricá)</strong>.</p>
        </div>
      </section>
      
      {/* Accordion Especialidades */}
      <section id="especialidades" className="mb-5 pt-5">
        <h1 className="text-dark-purple">Especialidades</h1>
        <div className="accordion pt-3" id="especialidades-accordion">
          <div className="card bg-purple rounded-top">
            <div className="card-header" id="header-residencial">
              <h4 className="mb-0">
                <a href="#residencial" className="text-white d-block" data-bs-toggle="collapse" aria-expanded="true" aria-controls="residencial">
                  Design Residencial
                </a>
              </h4>
            </div>
            <div id="residencial" className="collapse show" data-bs-parent="#especialidades-accordion" aria-labelledby="header-residencial">
              <div className="card-body text-justify">
                Transformamos casas e apartamentos em lares funcionais e acolhedores. Desde reformas completas até a decoração final, cuidamos de cada detalhe para criar espaços que refletem seu estilo de vida. Nossos projetos residenciais incluem planejamento de layout, seleção de materiais, iluminação e mobiliário, sempre com atenção às necessidades específicas de cada família.
              </div>
            </div>
          </div>
          
          <div className="card bg-purple">
            <div className="card-header" id="header-comercial">
              <h4 className="mb-0">
                <a href="#comercial" className="text-white d-block" data-bs-toggle="collapse" aria-expanded="false" aria-controls="comercial">
                  Arquitetura Comercial
                </a>
              </h4>
            </div>
            <div id="comercial" className="collapse" data-bs-parent="#especialidades-accordion" aria-labelledby="header-comercial">
              <div className="card-body text-justify">
                Projetamos espaços comerciais que equilibram branding, funcionalidade e experiência do cliente. De lojas a restaurantes e escritórios corporativos, criamos ambientes que comunicam a identidade da marca enquanto otimizam o fluxo de pessoas e operações. Nossa abordagem considera desde a sinalização até a acústica, criando espaços que impressionam e convertem.
              </div>
            </div>
          </div>
          
          <div className="card bg-purple">
            <div className="card-header" id="header-sustentavel">
              <h4 className="mb-0">
                <a href="#sustentavel" className="text-white d-block" data-bs-toggle="collapse" aria-expanded="false" aria-controls="sustentavel">
                  Design Sustentável
                </a>
              </h4>
            </div>
            <div id="sustentavel" className="collapse" data-bs-parent="#especialidades-accordion" aria-labelledby="header-sustentavel">
              <div className="card-body text-justify">
                Especializados em projetos eco-friendly, utilizamos materiais sustentáveis, técnicas de eficiência energética e soluções inteligentes para reduzir o impacto ambiental. Nossos projetos sustentáveis incluem desde a seleção de madeira certificada até sistemas de reaproveitamento de água e energia, provando que design de qualidade pode ser ambientalmente responsável.
              </div>
            </div>
          </div>
          
          <div className="card bg-purple rounded-bottom">
            <div className="card-header" id="header-consultoria">
              <h4 className="mb-0">
                <a href="#consultoria" className="text-white d-block" data-bs-toggle="collapse" aria-expanded="false" aria-controls="consultoria">
                  Consultoria Personalizada
                </a>
              </h4>
            </div>
            <div id="consultoria" className="collapse" data-bs-parent="#especialidades-accordion" aria-labelledby="header-consultoria">
              <div className="card-body text-justify">
                Oferecemos serviços de consultoria para quem busca orientação profissional em projetos menores ou deseja uma segunda opinião especializada. Nossas consultorias podem abranger desde a escolha de cores e materiais até a reorganização completa de espaços, proporcionando soluções práticas e criativas para qualquer desafio de design.
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção Formação */}
      <section className="pt-5" id="formacao">
        <h1 className="text-dark-purple">Formação</h1>
        <div className="blog-section row">
          <img src={formacaoImg} className="blog-item w-50" alt="Mariana Costa em seu escritório" />
          <ul className="list-group text-yellow blog-item">
            <li className="list-group-item bg-dark-purple rounded-top">Mestrado em Design Sustentável, Politecnico di Milano, Itália, 2012</li>
            <li className="list-group-item bg-dark-purple">Pós-Graduação em Lighting Design, IED Rio, 2010</li>
            <li className="list-group-item bg-dark-purple">Bacharelado em Arquitetura e Urbanismo, USP, 2006</li>
            <li className="list-group-item bg-dark-purple rounded-bottom">Certificação LEED Green Associate, 2015</li>
          </ul>
        </div>
      </section>

      {/* Seção Diferenciais */}
      <section className="pt-5" id="diferenciais">
        <h1 className="text-dark-purple">Diferenciais</h1>
        <br />
        <div className="blog-section row">
          <img src={diferenciaisImg} className="blog-item w-50" alt="Projeto premiado" />
          <ul className="list-group text-dark-purple blog-item">
            <li className="list-group-item bg-yellow rounded-top">Abordagem personalizada para cada cliente</li>
            <li className="list-group-item bg-yellow">Uso de tecnologias 3D e realidade virtual</li>
            <li className="list-group-item bg-yellow">Rede de fornecedores e artesãos qualificados</li>
            <li className="list-group-item bg-yellow">Acompanhamento completo da obra</li>
            <li className="list-group-item bg-yellow rounded-bottom">Compromisso com prazos e orçamentos</li>
          </ul>
        </div>
      </section>
          
      <br />
      <button 
        className="mt-4 mb-5 btn btn-outline-primary rounded-pill"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
        Voltar para o topo
        </button>
    </>
  );
};

export default HomePage;