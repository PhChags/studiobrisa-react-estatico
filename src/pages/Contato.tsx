import { useState, useEffect } from 'react';

import contatoImage from '../assets/images/contato.png';
import instaIcon from '../assets/images/insta.png';
import faceIcon from '../assets/images/face.png';
import pintIcon from '../assets/images/pint.png';
import linkedinIcon from '../assets/images/linkedin.png';
import whatsIcon from '../assets/images/whats.png';

const ContatoPage = () => {
  useEffect(() => {
    document.title = "Contato | Studio Brisa";
  }, []);
  
  // Estados para o formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    projeto: '',
    mensagem: '',
    newsletter: false
  });

  const formatPhoneNumber = (input) => {
    // Remove tudo que não é dígito
    const cleaned = input.replace(/\D/g, '');
    
    // Limita a 11 caracteres
    const limited = cleaned.substring(0, 11);
    
    // Aplica a formatação
    const match = limited.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (match) {
      return (!match[1] ? '' : '(' + match[1]) + 
            (!match[2] ? '' : ') ' + match[2]) + 
            (!match[3] ? '' : '-' + match[3]);
    }
    
    return input;
  };
  // Manipulação de mudanças nos campos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Aplica formatação especial para o campo de telefone
    if (name === 'telefone') {
      const formattedValue = formatPhoneNumber(value);
      setFormData(prevData => ({
        ...prevData,
        [name]: formattedValue
      }));
      return;
    }

    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Manipulação do envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação do telefone
    const phoneDigits = formData.telefone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      alert('Por favor, insira um número de telefone válido com DDD (10 ou 11 dígitos)');
      return;
    }
    
    // (Aqui) adicionar a lógica de envio
    console.log('Formulário enviado:', formData);
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Reset do formulário após envio
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      projeto: '',
      mensagem: '',
      newsletter: false
    });
  };

  return (
    <>
      {/* Imagem Principal */}
      <div className="d-flex justify-content-center">
        <img src={contatoImage} className="img-fluid" alt="Atendimento personalizado" />
      </div>

      {/* Conteúdo Principal */}
      <main className="container">
        {/* Formulário para solicitação de orçamento */}
        <section className="mt-5">
        <h2 className="pb-4 mb-4 border-bottom text-dark-purple contato-titulo">
            Solicite um Orçamento
        </h2>
        <div className="modal-body">
            <form onSubmit={handleSubmit}>
            <fieldset className="form-group">
                <legend className="contato-legenda mb-4" style={{ fontWeight: 'bold' }}>Formulário de Contato</legend>

                {/* Campo Nome */}
                <div className="form-group row mb-4"> 
                <label htmlFor="nome" className="col-form-label col-lg-2 form-label">Nome*</label>
                <div className="col-lg-10">
                    <input 
                    type="text" 
                    name="nome"
                    className="form-control" 
                    placeholder="Seu nome completo" 
                    id="nome" 
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    />
                </div>
                </div>

                {/* Campo Email */}
                <div className="form-group row mb-4"> 
                <label htmlFor="email" className="col-form-label col-lg-2 form-label">Email*</label>
                <div className="col-lg-10">
                    <input 
                    type="email" 
                    id="email" 
                    name="email"
                    className="form-control" 
                    placeholder="Seu melhor e-mail" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
                </div>
                </div>

                {/* Campo Telefone */}
                <div className="form-group row mb-4"> 
                <label htmlFor="telefone" className="col-form-label col-lg-2 form-label">Telefone*</label>
                <div className="col-lg-10">
                     <input 
                        type="tel" 
                        id="telefone" 
                        name="telefone"
                        className="form-control" 
                        placeholder="(XX) XXXXX-XXXX" 
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                        maxLength={15} 
                        onKeyDown={(e) => {
                          // Garante apenas números e teclas de controle
                          if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                </div>
                </div>

                {/* Campo Tipo de Projeto */}
                <div className="form-group row mb-4"> 
                <label className="col-form-label col-lg-2 form-label">Tipo de Projeto*</label>
                <div className="col-lg-10" style={{ paddingTop: '7px' }}>
                    <div className="form-check form-check-inline">
                    <input 
                        type="radio" 
                        id="residencial" 
                        name="projeto" 
                        value="Residencial" 
                        className="form-check-input" 
                        checked={formData.projeto === 'Residencial'}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="residencial" className="form-check-label">
                        Residencial
                    </label>       
                    </div>
                    <div className="form-check form-check-inline">
                    <input 
                        type="radio" 
                        id="comercial" 
                        name="projeto" 
                        value="Comercial" 
                        className="form-check-input" 
                        checked={formData.projeto === 'Comercial'}
                        onChange={handleChange}
                    />
                    <label htmlFor="comercial" className="form-check-label">
                        Comercial
                    </label>       
                    </div>
                    <div className="form-check form-check-inline">
                    <input 
                        type="radio" 
                        id="sustentavel" 
                        name="projeto" 
                        value="Sustentável" 
                        className="form-check-input" 
                        checked={formData.projeto === 'Sustentável'}
                        onChange={handleChange}
                    />
                    <label htmlFor="sustentavel" className="form-check-label">
                        Sustentável
                    </label>       
                    </div>
                    <div className="form-check form-check-inline">
                    <input 
                        type="radio" 
                        id="outro" 
                        name="projeto" 
                        value="Outro" 
                        className="form-check-input" 
                        checked={formData.projeto === 'Outro'}
                        onChange={handleChange}
                    />
                    <label htmlFor="outro" className="form-check-label">
                        Outro
                    </label>       
                    </div>
                </div>
                </div>

                {/* Campo Mensagem */}
                <div className="form-group row mb-4"> 
                <label htmlFor="mensagem" className="col-form-label col-lg-2 form-label">Mensagem*</label>
                <div className="col-lg-10">
                    <textarea 
                    className="form-control" 
                    id="mensagem" 
                    rows={5} 
                    name="mensagem"
                    placeholder="Descreva brevemente seu projeto, necessidades e preferências." 
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    ></textarea>
                </div>
                </div>

                {/* Campo Newsletter */}
                <div className="form-group row mb-4"> 
                <div className="col-lg-10 offset-lg-2">
                    <div className="form-check">
                    <input 
                        type="checkbox" 
                        id="newsletter" 
                        name="newsletter"
                        className="form-check-input" 
                        checked={formData.newsletter}
                        onChange={handleChange}
                    />
                    <label htmlFor="newsletter" className="form-check-label">
                        Desejo receber novidades e conteúdos sobre arquitetura
                    </label>
                    </div>
                </div>
                </div>
            </fieldset>
            
            {/* Botão de Envio */}
            <div className="form-group row">
                <div className="col-lg-10 offset-lg-2">
                <button type="submit" className="btn btn-primary">
                    Enviar Mensagem
                </button>
                </div>
            </div>
            </form>
        </div>
        </section>

        {/* Seção com icones das redes sociais */}
        <section className="mt-5">
            <h2 className="pb-4 mb-4 border-bottom text-dark-purple contato-titulo">
                Redes Sociais
            </h2>
            <div className="container">
                <div className="row gx-3 gy-2"> 
                <div className="col-auto">
                    <a href="https://www.instagram.com/marianacosta.arq/" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <img className="icon" src={instaIcon} alt="Instagram" />
                    </a>
                </div>
                <div className="col-auto">
                    <a href="https://www.facebook.com/marianacosta.arq" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <img className="icon" src={faceIcon} alt="Facebook" />
                    </a>
                </div>
                <div className="col-auto">
                    <a href="https://pinterest.com/marianacosta.arq" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <img className="icon" src={pintIcon} alt="Pinterest" />
                    </a>
                </div>
                <div className="col-auto">
                    <a href="https://www.linkedin.com/in/mariana-costa-arquitetura/" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <img className="icon" src={linkedinIcon} alt="LinkedIn" />
                    </a>
                </div>
                <div className="col-auto">
                    <a href="https://wa.me/5521987654321" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <img className="icon" src={whatsIcon} alt="WhatsApp" />
                    </a>
                </div>
                </div>
            </div>
        </section>

        {/* Seção horário de atendimento */}
        <section className="mt-5 mb-5">
          <h2 className="pb-4 mb-4 border-bottom text-dark-purple contato-titulo">
            Horário de Atendimento
          </h2>
          <div className="row">
            <div className="col-md-6">
              <p className="horario-texto"><strong>Segunda a Sexta:</strong> 9h às 18h</p>
              <p className="horario-texto"><strong>Sábado:</strong> 10h às 14h (atendimento com agendamento)</p>
              <p className="horario-texto"><strong>Domingo e Feriados:</strong> Fechado</p>
            </div>
            <div className="col-md-6">
              <p className="horario-texto" style={{color: '#8a9299'}}>
                <small>
                  * Visitas técnicas e reuniões presenciais devem ser agendadas com antecedência.<br />
                  * Atendemos em todo o Rio de Janeiro e região metropolitana.
                </small>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContatoPage;