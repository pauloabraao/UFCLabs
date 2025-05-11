import { Container, Typography, Box } from '@mui/material';
import MainNavbar from '../components/MainNavbar';

export default function HomePage() {
  return (
    <>
      <MainNavbar />
      <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Sistema de Gestão de Laboratórios Acadêmicos
        </Typography>
        <Typography variant="subtitle1" paragraph>
          Bem-vindo! Esta é a página inicial.
        </Typography>
      </Container>
    </>
  );
}
