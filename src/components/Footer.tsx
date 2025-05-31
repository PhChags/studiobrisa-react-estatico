import { Container, Typography, IconButton } from '@mui/material'; // Removemos Grid
import { styled } from '@mui/material/styles';
import { 
  Instagram, 
  Facebook, 
  Pinterest, 
  LinkedIn, 
  WhatsApp 
} from '@mui/icons-material';

const Footer = () => {
  return (
    <FooterContainer>
      <GradientBar />
      
      <StyledContainer maxWidth="lg">
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem'
        }}>
          {/* Container do Mapa */}
          <MapWrapper>
            <MapContainer>
              <StyledIframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.328661885406!2d-43.1050929246879!3d-22.902557579258616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99817ee58f1c1f%3A0x4c4e3caf46a9f4b8!2sAv.%20Rio%20Branco%2C%20123%20-%20Centro%2C%20Niter%C3%B3i%20-%20RJ%2C%2024030-002!5e0!3m2!1spt-BR!2sbr!4v1689209764054!5m2!1spt-BR!2sbr" 
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </MapContainer>
          </MapWrapper>
          
          {/* Container das Informações */}
          <InfoWrapper>
            <ContentContainer>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>
                CONTATO
              </Typography>
              
              <ContactItem>
                <Typography variant="body1" sx={{ color: '#fff', textAlign: 'center' }}>
                  contato@studiobrisa.com.br
                </Typography>
              </ContactItem>
              
              <ContactItem>
                <Typography variant="body1" sx={{ color: '#fff', textAlign: 'center' }}>
                  Av. Rio Branco, 123 - Sala 501
                </Typography>
                <Typography variant="body1" sx={{ color: '#fff', textAlign: 'center' }}>
                  Centro, Niterói - RJ
                </Typography>
              </ContactItem>
              
              <ContactItem>
                <Typography variant="body1" sx={{ color: '#fff', textAlign: 'center' }}>
                  (21) 98765-4321
                </Typography>
              </ContactItem>
              
              <SocialContainer>
                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                  Siga-nos:
                </Typography>
                <SocialIconsWrapper>
                  <SocialIconButton aria-label="Instagram">
                    <Instagram sx={{ color: '#fff', fontSize: '1.8rem' }} />
                  </SocialIconButton>
                  <SocialIconButton aria-label="Facebook">
                    <Facebook sx={{ color: '#fff', fontSize: '1.8rem' }} />
                  </SocialIconButton>
                  <SocialIconButton aria-label="Pinterest">
                    <Pinterest sx={{ color: '#fff', fontSize: '1.8rem' }} />
                  </SocialIconButton>
                  <SocialIconButton aria-label="LinkedIn">
                    <LinkedIn sx={{ color: '#fff', fontSize: '1.8rem' }} />
                  </SocialIconButton>
                  <SocialIconButton aria-label="WhatsApp">
                    <WhatsApp sx={{ color: '#fff', fontSize: '1.8rem' }} />
                  </SocialIconButton>
                </SocialIconsWrapper>
              </SocialContainer>
            </ContentContainer>
          </InfoWrapper>
        </div>
        
        <CopyrightContainer>
          <Typography variant="body2" sx={{ color: '#ccc', textAlign: 'center' }}>
            © {new Date().getFullYear()} Studio Brisa Arquitetura. Todos os direitos reservados.
          </Typography>
        </CopyrightContainer>
      </StyledContainer>
    </FooterContainer>
  );
};

// Componentes estilizados
const FooterContainer = styled('footer')(({ theme }) => ({
  backgroundColor: '#6a1b9a',
  padding: theme.spacing(8, 0, 6),
  position: 'relative',
}));

// Barra degradê no topo
const GradientBar = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '5px',
  background: 'linear-gradient(90deg, #9c27b0, #ffeb3b, #9c27b0)',
  zIndex: 1,
});

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
});

// Wrappers responsivos
const MapWrapper = styled('div')(({ theme }) => ({
  flex: '1 1 45%',
  minWidth: '300px',
  maxWidth: '400px',
  [theme.breakpoints.down('sm')]: {
    flex: '1 1 100%',
  },
}));

const InfoWrapper = styled('div')(({ theme }) => ({
  flex: '1 1 45%',
  minWidth: '300px',
  maxWidth: '500px',
  [theme.breakpoints.down('sm')]: {
    flex: '1 1 100%',
  },
}));

const MapContainer = styled('div')({
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  height: '100%',
});

const StyledIframe = styled('iframe')({
  width: '100%',
  height: '300px',
  border: 'none',
  display: 'block',
});

// Container principal para o conteúdo
const ContentContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  maxWidth: '450px',
  margin: '0 auto',
  padding: theme.spacing(0, 2),
}));

// Itens de contato
const ContactItem = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  padding: theme.spacing(1, 0),
  borderBottom: '1px solid rgba(255,255,255,0.15)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
}));

// Container social 
const SocialContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
}));

const SocialIconsWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
  flexWrap: 'wrap',
  width: '100%',
});

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(255,255,255,0.1)',
  transition: 'all 0.3s ease',
  padding: theme.spacing(1.8),
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.2)',
    transform: 'translateY(-4px)',
  },
}));

const CopyrightContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(6),
  paddingTop: theme.spacing(3),
  borderTop: '1px solid rgba(255,255,255,0.15)',
  textAlign: 'center',
}));

export default Footer;