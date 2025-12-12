import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import {
  Container,
  TituloContainer,
  Titulo,
  LinhaVermelha,
  CarouselContainer,
  CardProduto,
  ImagemContainer,
  ImagemProduto,
  InfoProduto,
  NomeProduto,
  MarcaProduto,
  PrecoProduto,
  LoadingContainer,
  ErrorContainer
} from './styles';
import { useProdutos } from '../../hooks/useProdutos';
import ProdutoModal from '../ProdutoModal';

function ProdutosDestaque() {
  const { produtos, loading, error } = useProdutos(true);
  const [produtoModal, setProdutoModal] = useState(null);

  // Se não há produtos em destaque, não renderiza nada
  if (!loading && !error && produtos.length === 0) {
    return null;
  }

  if (loading) {
    return (
      <Container>
        <TituloContainer>
          <Titulo>Produtos em Destaque</Titulo>
          <LinhaVermelha />
        </TituloContainer>
        <LoadingContainer>
          Carregando produtos em destaque...
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <TituloContainer>
          <Titulo>Produtos em Destaque</Titulo>
          <LinhaVermelha />
        </TituloContainer>
        <ErrorContainer>
          {error}
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <TituloContainer>
        <Titulo>Produtos em Destaque</Titulo>
        <LinhaVermelha />
      </TituloContainer>

      <CarouselContainer>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={true}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 15
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 25
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30
            }
          }}
          style={{
            width: '100%',
            padding: '10px 5px 30px 5px'
          }}
        >
          {produtos.map((produto) => (
            <SwiperSlide key={produto.id}>
              <CardProduto onClick={() => setProdutoModal(produto)}>
                <ImagemContainer>
                  <ImagemProduto 
                    src={produto.imagem} 
                    alt={produto.nome}
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/300x300/e5e5e5/999999?text=Imagem+Indisponível';
                    }}
                  />
                </ImagemContainer>
                
                <InfoProduto>
                  <NomeProduto>{produto.nome}</NomeProduto>
                  
                  {produto.marca_nome && (
                    <MarcaProduto>{produto.marca_nome}</MarcaProduto>
                  )}
                  
                  <PrecoProduto>R$ {parseFloat(produto.preco).toFixed(2)}</PrecoProduto>
                </InfoProduto>
              </CardProduto>
            </SwiperSlide>
          ))}
        </Swiper>
      </CarouselContainer>

      <ProdutoModal
        produto={produtoModal}
        aberto={!!produtoModal}
        onFechar={() => setProdutoModal(null)}
      />
    </Container>
  );
}

export default ProdutosDestaque;