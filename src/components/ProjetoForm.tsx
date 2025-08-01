import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { type ProjetoDTO } from '../interfaces/Projeto';
import { type Projeto } from '../interfaces/Projeto';

interface ProjetoFormProps {
  projeto?: Projeto | null;
  onSubmit: (dto: ProjetoDTO, preco: number) => Promise<void>;
  isLoading: boolean;
  onCancel: () => void;
}

// Mapeamento fixo de categorias
const CATEGORIAS = [
  { id: 1, nome: 'Residencial' },
  { id: 2, nome: 'Comercial' },
  { id: 3, nome: 'Verde' }
];

const ProjetoForm: React.FC<ProjetoFormProps> = ({
  projeto,
  onSubmit,
  isLoading,
  onCancel
}) => {
  // Estados para os campos do formulário
  const [titulo, setTitulo] = useState(projeto?.titulo || '');
  const [descricao, setDescricao] = useState(projeto?.descricao || '');
  const [imagemUrl, setImagemUrl] = useState(projeto?.imagemUrl || '');
  const [ano, setAno] = useState<number | ''>(projeto?.ano || '');
  const [area, setArea] = useState<number | ''>(projeto?.area || '');
  const [localizacao, setLocalizacao] = useState(projeto?.localizacao || '');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>(projeto?.categoriaNome || '');
  const [preco, setPreco] = useState<number | ''>(projeto?.preco || '');

  // Estado para erros de validação
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Preenche o formulário quando o projeto para edição é alterado
  useEffect(() => {
    if (projeto) {
      setTitulo(projeto.titulo);
      setDescricao(projeto.descricao);
      setImagemUrl(projeto.imagemUrl);
      setAno(projeto.ano);
      setArea(projeto.area);
      setLocalizacao(projeto.localizacao);
      setCategoriaSelecionada(projeto.categoriaNome || '');
      setPreco(projeto.preco || '');
    } else {
      resetForm();
    }
  }, [projeto]);

  const resetForm = () => {
    setTitulo('');
    setDescricao('');
    setImagemUrl('');
    setAno('');
    setArea('');
    setLocalizacao('');
    setCategoriaSelecionada('');
    setPreco('');
    setErrors({});
  };

  // Converte o nome da categoria para ID
  const getCategoriaId = (nomeCategoria: string): number => {
    const categoria = CATEGORIAS.find(cat => cat.nome === nomeCategoria);
    return categoria ? categoria.id : 1; // Default para Residencial se não encontrado
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!titulo.trim()) newErrors.titulo = 'Título é obrigatório';
    if (!descricao.trim()) newErrors.descricao = 'Descrição é obrigatória';
    if (!imagemUrl.trim()) newErrors.imagemUrl = 'URL da imagem é obrigatória';
    if (!localizacao.trim()) newErrors.localizacao = 'Localização é obrigatória';
    
    if (ano === '' || Number(ano) < 1900 || Number(ano) > new Date().getFullYear()) {
      newErrors.ano = `Ano inválido (1900-${new Date().getFullYear()})`;
    }
    
    if (area === '' || Number(area) <= 0) {
      newErrors.area = 'Área deve ser maior que 0';
    }
    
    if (!categoriaSelecionada) {
      newErrors.categoria = 'Selecione uma categoria';
    }
    
    if (preco === '' || Number(preco) < 0) {
      newErrors.preco = 'Preço deve ser maior ou igual a 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const projetoDTO: ProjetoDTO = {
      titulo,
      descricao,
      imagemUrl,
      ano: Number(ano),
      area: Number(area),
      localizacao,
      categoriaId: getCategoriaId(categoriaSelecionada) // Converte nome para ID
    };
    
    await onSubmit(projetoDTO, Number(preco));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Título *</Form.Label>
            <Form.Control
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              isInvalid={!!errors.titulo}
            />
            <Form.Control.Feedback type="invalid">
              {errors.titulo}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Categoria *</Form.Label>
            <Form.Select
              value={categoriaSelecionada}
              onChange={(e) => setCategoriaSelecionada(e.target.value)}
              isInvalid={!!errors.categoria}
            >
              <option value="">Selecione uma categoria</option>
              {CATEGORIAS.map(categoria => (
                <option key={categoria.id} value={categoria.nome}>
                  {categoria.nome}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.categoria}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Descrição *</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          isInvalid={!!errors.descricao}
        />
        <Form.Control.Feedback type="invalid">
          {errors.descricao}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>URL da Imagem *</Form.Label>
        <Form.Control
          type="text"
          value={imagemUrl}
          onChange={(e) => setImagemUrl(e.target.value)}
          isInvalid={!!errors.imagemUrl}
        />
        <Form.Control.Feedback type="invalid">
          {errors.imagemUrl}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Ano *</Form.Label>
            <Form.Control
              type="number"
              value={ano}
              onChange={(e) => setAno(e.target.value ? parseInt(e.target.value) : '')}
              min={1900}
              max={new Date().getFullYear()}
              isInvalid={!!errors.ano}
            />
            <Form.Control.Feedback type="invalid">
              {errors.ano}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Área (m²) *</Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              value={area}
              onChange={(e) => setArea(e.target.value ? parseFloat(e.target.value) : '')}
              min={0.1}
              isInvalid={!!errors.area}
            />
            <Form.Control.Feedback type="invalid">
              {errors.area}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Preço (R$) *</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={preco}
              onChange={(e) => setPreco(e.target.value ? parseFloat(e.target.value) : '')}
              min={0}
              isInvalid={!!errors.preco}
            />
            <Form.Control.Feedback type="invalid">
              {errors.preco}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Localização *</Form.Label>
        <Form.Control
          type="text"
          value={localizacao}
          onChange={(e) => setLocalizacao(e.target.value)}
          isInvalid={!!errors.localizacao}
        />
        <Form.Control.Feedback type="invalid">
          {errors.localizacao}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
        
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : projeto ? 'Atualizar Projeto' : 'Criar Projeto'}
        </Button>
      </div>
    </Form>
  );
};

export default ProjetoForm;