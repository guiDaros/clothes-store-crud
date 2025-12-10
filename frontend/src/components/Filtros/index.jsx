import React from 'react';
import { 
  FiltrosContainer, 
  TituloFiltros, 
  FiltrosGrid, 
  GrupoFiltro, 
  Label, 
  Select, 
  Option,
  BotaoLimpar 
} from './styles';

function Filtros({ 
  categorias, 
  marcas, 
  categoriaSelecionada, 
  marcaSelecionada,
  onCategoriaChange,
  onMarcaChange,
  onLimparFiltros 
}) {
  return (
    <FiltrosContainer>
      <TituloFiltros>Filtrar Produtos</TituloFiltros>
      
      <FiltrosGrid>
        <GrupoFiltro>
          <Label htmlFor="categoria">Categoria:</Label>
          <Select 
            id="categoria"
            value={categoriaSelecionada || ''}
            onChange={(e) => onCategoriaChange(e.target.value || null)}
          >
            <Option value="">Todas as categorias</Option>
            {categorias.map(categoria => (
              <Option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </Option>
            ))}
          </Select>
        </GrupoFiltro>

        <GrupoFiltro>
          <Label htmlFor="marca">Marca:</Label>
          <Select 
            id="marca"
            value={marcaSelecionada || ''}
            onChange={(e) => onMarcaChange(e.target.value || null)}
          >
            <Option value="">Todas as marcas</Option>
            {marcas.map(marca => (
              <Option key={marca.id} value={marca.id}>
                {marca.nome}
              </Option>
            ))}
          </Select>
        </GrupoFiltro>
      </FiltrosGrid>

      {(categoriaSelecionada || marcaSelecionada) && (
        <BotaoLimpar onClick={onLimparFiltros}>
          Limpar Filtros
        </BotaoLimpar>
      )}
    </FiltrosContainer>
  );
}

export default Filtros;