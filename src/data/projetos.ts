// src/data/projetos.ts
import residencial1 from '../assets/images/residencial1.jpg';
import residencial2 from '../assets/images/residencial2.jpg';
import residencial3 from '../assets/images/residencial3.jpg';
import residencial4 from '../assets/images/residencial4.jpg';
import comercial1 from '../assets/images/comercial1.jpg';
import comercial2 from '../assets/images/comercial2.jpg';
import comercial3 from '../assets/images/comercial3.jpg';
import comercial4 from '../assets/images/comercial4.jpg';
import verde1 from '../assets/images/verde1.jpg';
import verde2 from '../assets/images/verde2.jpeg';
import verde3 from '../assets/images/verde3.jpg';
import verde4 from '../assets/images/verde4.jpg';

import { type Projeto } from '../interfaces/Projeto';

const projetos: Projeto[] = [
  {
    id: 1,
    titulo: "Casa Moderna - Niterói",
    descricao: "Projeto completo para residência de 350m² com integração de ambientes e vista para o mar.",
    imagemUrl: residencial1,
    ano: 2023,
    area: 350.00,
    localizacao: "Niterói, RJ",
    likes: 12,
    dislikes: 2,
    dataCadastro: "2025-06-18",
    categoriaNome: "Residencial",
    preco: 125000
  },
  {
    id: 2,
    titulo: "Apartamento Leblon",
    descricao: "Reforma completa de 180m² com integração sala-jantar e varanda gourmet.",
    imagemUrl: residencial2,
    ano: 2025,
    area: 180.00,
    localizacao: "Leblon, RJ",
    likes: 18,
    dislikes: 1,
    dataCadastro: "2025-06-18",
    categoriaNome: "Residencial",
    preco: 95000
  },
  {
    id: 3,
    titulo: "Casa Colonial - São Gonçalo",
    descricao: "Restauro de casa histórica com 280m² mantendo características originais.",
    imagemUrl: residencial3,
    ano: 2022,
    area: 280.00,
    localizacao: "São Gonçalo, RJ",
    likes: 9,
    dislikes: 0,
    dataCadastro: "2025-06-18",
    categoriaNome: "Residencial",
    preco: 110000
  },
  {
    id: 4,
    titulo: "Cobertura Barra",
    descricao: "Projeto de 320m² com terraço panorâmico e piscina infinita.",
    imagemUrl: residencial4,
    ano: 2023,
    area: 320.00,
    localizacao: "Barra da Tijuca, RJ",
    likes: 14,
    dislikes: 2,
    dataCadastro: "2025-06-18",
    categoriaNome: "Residencial",
    preco: 185000
  },
  {
    id: 5,
    titulo: "Escritório Corporativo - Centro",
    descricao: "Ambiente de trabalho moderno e funcional para 50 colaboradores.",
    imagemUrl: comercial1,
    ano: 2022,
    area: 300.00, // Atualizado de null para valor
    localizacao: "Centro, RJ",
    likes: 8,
    dislikes: 1,
    dataCadastro: "2025-06-18",
    categoriaNome: "Comercial",
    preco: 85000
  },
  {
    id: 6,
    titulo: "Restaurante Temático - Ipanema",
    descricao: "Ambiente com 150m² inspirado na cultura carioca, com iluminação cenográfica.",
    imagemUrl: comercial2,
    ano: 2023,
    area: 150.00,
    localizacao: "Ipanema, RJ",
    likes: 11,
    dislikes: 0,
    dataCadastro: "2025-06-18",
    categoriaNome: "Comercial",
    preco: 75000
  },
  {
    id: 7,
    titulo: "Loja Conceito - Shopping Leblon",
    descricao: "Design de 120m² para marca de moda sustentável com elementos reciclados.",
    imagemUrl: comercial3,
    ano: 2023,
    area: 120.00,
    localizacao: "Leblon, RJ",
    likes: 9,
    dislikes: 1,
    dataCadastro: "2025-06-18",
    categoriaNome: "Comercial",
    preco: 65000
  },
  {
    id: 8,
    titulo: "Clínica Médica - Botafogo",
    descricao: "Projeto de 300m² com 8 consultórios, recepção acolhedora e fluxo otimizado.",
    imagemUrl: comercial4,
    ano: 2023,
    area: 300.00,
    localizacao: "Botafogo, RJ",
    likes: 6,
    dislikes: 0,
    dataCadastro: "2025-06-18",
    categoriaNome: "Comercial",
    preco: 98000
  },
  {
    id: 9,
    titulo: "Casa Sustentável - Maricá",
    descricao: "Projeto com certificação LEED, utilizando energia solar e materiais reciclados.",
    imagemUrl: verde1,
    ano: 2022,
    area: 280.00, // Atualizado de null para valor
    localizacao: "Maricá, RJ",
    likes: 15,
    dislikes: 0,
    dataCadastro: "2025-06-18",
    categoriaNome: "Design Verde",
    preco: 135000
  },
  {
    id: 10,
    titulo: "Edifício Sustentável - Centro",
    descricao: "Prédio comercial com certificação LEED Platinum, 1500m².",
    imagemUrl: verde2,
    ano: 2023,
    area: 1500.00,
    localizacao: "Centro, RJ",
    likes: 10,
    dislikes: 0,
    dataCadastro: "2025-06-18",
    categoriaNome: "Design Verde",
    preco: 420000
  },
  {
    id: 11,
    titulo: "Casa Container - Itaboraí",
    descricao: "Residência de 120m² feita com containers reciclados e energia solar.",
    imagemUrl: verde3,
    ano: 2021,
    area: 120.00,
    localizacao: "Itaboraí, RJ",
    likes: 21,
    dislikes: 2,
    dataCadastro: "2025-06-18",
    categoriaNome: "Design Verde",
    preco: 88000
  },
  {
    id: 12,
    titulo: "Escritório Verde - Jardim Botânico",
    descricao: "Escritório de 200m² com telhado verde e sistema de reaproveitamento de água.",
    imagemUrl: verde4,
    ano: 2024,
    area: 200.00,
    localizacao: "Jardim Botânico, RJ",
    likes: 12,
    dislikes: 0,
    dataCadastro: "2025-06-18",
    categoriaNome: "Design Verde",
    preco: 105000
  }
];

export default projetos;