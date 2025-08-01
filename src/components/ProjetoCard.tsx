import React from 'react';
import { type Projeto } from '../interfaces/Projeto';
import HeartIcon from './HeartIcon';
import { useFavoritosStore } from '../stores/FavoritosStore';
import useUsuarioStore from '../stores/UsuarioStore';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useCarrinhoStore } from '../stores/CarrinhoStore';

interface ProjetoCardProps {
  projeto: Projeto;
  showFavorito?: boolean;
  showComprar?: boolean; 
}

const ProjetoCard: React.FC<ProjetoCardProps> = ({ 
  projeto, 
  showFavorito = true,
  showComprar = false 
}) => {
  const usuarioId = useUsuarioStore(state => state.usuarioId);
  const { isFavorito, toggleFavorito } = useFavoritosStore();
  
  // Integração com a store do carrinho (agora com userId)
  const { adicionarAoCarrinho, atualizarQuantidade, getCarrinhoUsuario } = useCarrinhoStore();
  
  // Obter carrinho do usuário atual
  const carrinhoUsuario = usuarioId ? getCarrinhoUsuario(usuarioId) : {};
  const quantidade = carrinhoUsuario[projeto.id]?.quantidade || 0;
  
  const handleFavoritoClick = () => {
    if (!usuarioId) {
      alert('Por favor, faça login para favoritar projetos');
      return;
    }
    toggleFavorito(usuarioId, projeto.id);
  };

  // Funções para manipular o carrinho
  const adicionarAoCarrinhoHandler = () => {
    if (!usuarioId) {
      alert('Por favor, faça login para adicionar ao carrinho');
      return;
    }
    adicionarAoCarrinho(usuarioId, projeto.id, 1);
  };

  const aumentarQuantidade = () => {
    if (!usuarioId) return;
    atualizarQuantidade(usuarioId, projeto.id, quantidade + 1);
  };

  const diminuirQuantidade = () => {
    if (!usuarioId) return;
    if (quantidade > 1) {
      atualizarQuantidade(usuarioId, projeto.id, quantidade - 1);
    } else {
      // Remove completamente se quantidade for 1
      atualizarQuantidade(usuarioId, projeto.id, 0);
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="position-relative">
        <img 
          src={projeto.imagemUrl} 
          className="card-img-top" 
          alt={projeto.titulo} 
          style={{ height: '200px', objectFit: 'cover' }}
        />
        
        {/* Ícone de Favorito (condicional) */}
        {showFavorito && (
          <div className="position-absolute top-0 end-0 m-2">
            <HeartIcon 
              isFavorito={isFavorito(usuarioId, projeto.id)} 
              onClick={handleFavoritoClick}
              className="d-block bg-white rounded-circle p-1 shadow-sm"
            />
          </div>
        )}
      </div>
      
      <div className="card-body">
        <h5 className="card-title">{projeto.titulo}</h5>
        <p className="card-text text-muted">{projeto.descricao}</p>
        
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="badge bg-purple text-white">
            {projeto.categoriaNome}
          </span>
          <span className="text-pink fw-bold">
            {typeof projeto.preco === 'number' && !isNaN(projeto.preco)
              ? new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(projeto.preco)
              : 'Sob Consulta'}
          </span>
        </div>
      </div>
      
      {/* Rodapé com botões de compra (condicional) */}
      {showComprar && (
        <div className="card-footer p-0 border-top-0">
          {quantidade > 0 ? (
            <ButtonGroup className="w-100">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={diminuirQuantidade}
              >
                -
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                style={{ 
                  backgroundColor: '#6c757d', 
                  borderColor: '#6c757d',
                  cursor: 'default'
                }}
              >
                {quantidade}
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={aumentarQuantidade}
              >
                +
              </Button>
            </ButtonGroup>
          ) : (
            <Button 
              style={{ borderRadius: 0 }}
              variant="purple" 
              size="sm"
              className="w-100"
              onClick={adicionarAoCarrinhoHandler}
            >
              Comprar
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjetoCard;