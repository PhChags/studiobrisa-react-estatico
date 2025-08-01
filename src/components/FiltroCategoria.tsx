// src/components/FiltroCategoria/FiltroCategoria.tsx
import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { type Categoria } from '../interfaces/Categoria';

interface FiltroCategoriaProps {
  categorias: Categoria[];
  categoriaSelecionada: string;
  onCategoriaChange: (categoria: string) => void;
}

const FiltroCategoria: React.FC<FiltroCategoriaProps> = ({ 
  categorias, 
  categoriaSelecionada,
  onCategoriaChange 
}) => {
  return (
    <div className="mb-4">
      <ButtonGroup className="w-100" aria-label="Filtro de categorias">
        <Button
          variant={categoriaSelecionada === 'Todas' ? 'purple' : 'outline-purple'}
          onClick={() => onCategoriaChange('Todas')}
          className="rounded-0 border-end-0"
        >
          Todas
        </Button>
        
        {categorias.map((categoria, index) => (
          <Button
            key={categoria.id}
            variant={categoriaSelecionada === categoria.nome ? 'purple' : 'outline-purple'}
            onClick={() => onCategoriaChange(categoria.nome)}
            className={`
              rounded-0 
              ${index === categorias.length - 1 ? 'rounded-end' : ''}
              ${index === 0 ? 'border-left-0' : 'border-left-0 border-right-0'}
            `}
          >
            {categoria.nome}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default FiltroCategoria;