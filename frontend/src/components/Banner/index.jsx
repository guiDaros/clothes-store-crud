import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { 
  BannerWrapper, 
  LoadingContainer,
  ErrorContainer 
} from './styles';
import { apiService } from '../../services/api';

function Banner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarBanners = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiService.getBanners();
        let dados = [];
        
        if (response.data.results && Array.isArray(response.data.results)) {
          dados = response.data.results;
        } else if (Array.isArray(response.data)) {
          dados = response.data;
        }
        
        const bannersAtivos = dados
          .filter(banner => banner.ativo !== false)
          .sort((a, b) => a.ordem - b.ordem);
        
        setBanners(bannersAtivos);
        
      } catch (err) {
        console.error('Erro ao carregar banners:', err);
        setError('Erro ao carregar banners');
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    carregarBanners();
  }, []);

  // Se não há banners, não mostra nada
  if (banners.length === 0 && !loading && !error) {
    return null;
  }

  if (loading) {
    return (
      <BannerWrapper>
        <LoadingContainer>
          Carregando...
        </LoadingContainer>
      </BannerWrapper>
    );
  }

  if (error) {
    return (
      <BannerWrapper>
        <ErrorContainer>
          {error}
        </ErrorContainer>
      </BannerWrapper>
    );
  }

  // Se só tem 1 banner, mostra estático
  if (banners.length === 1) {
    return (
      <BannerWrapper>
        <img 
          src={banners[0].imagem} 
          alt="Banner"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '400px',
            objectFit: 'contain'
          }}
        />
      </BannerWrapper>
    );
  }

  return (
    <BannerWrapper>
      <Swiper
        modules={[Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={500}
        allowTouchMove={false} // Desabilita swipe
        noSwiping={true}
        noSwipingClass="swiper-slide"
        style={{
          width: '100%',
          maxWidth: '100vw'
        }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img 
              src={banner.imagem} 
              alt="Banner"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '400px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </BannerWrapper>
  );
}

export default Banner;