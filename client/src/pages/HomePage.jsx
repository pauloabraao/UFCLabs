import { Container, Typography, Box } from '@mui/material';
import MainNavbar from '../components/MainNavbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomePage() {
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/api/campuses')
      .then(res => setCampuses(res.data))
      .catch(() => setCampuses([]))
      .finally(() => setLoading(false));
  }, []);

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
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Campus cadastrados:
          </Typography>
          {loading ? (
            <Typography>Carregando...</Typography>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {campuses.map(campus => (
                <li key={campus.campus_id}>
                  <Typography>
                    {campus.name} - {campus.location}
                  </Typography>
                </li>
              ))}
              {campuses.length === 0 && (
                <Typography>Nenhum campus encontrado.</Typography>
              )}
            </ul>
          )}
        </Box>
      </Container>
    </>
  );
}
