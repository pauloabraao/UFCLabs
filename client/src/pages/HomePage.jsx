import { Container, Typography, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MainNavbar from '../components/MainNavbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/campuses')
      .then(res => setCampuses(res.data))
      .catch(() => setCampuses([]))
      .finally(() => setLoading(false));
  }, []);

  const handleCampusClick = (campusId) => {
    navigate(`/campuses/${campusId}/blocks`);
  };

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
            <List>
              {campuses.map(campus => (
                <ListItem key={campus.campus_id} disablePadding>
                  <ListItemButton onClick={() => handleCampusClick(campus.campus_id)}>
                    <ListItemText primary={`${campus.name} - ${campus.location}`} />
                  </ListItemButton>
                </ListItem>
              ))}
              {campuses.length === 0 && (
                <Typography>Nenhum campus encontrado.</Typography>
              )}
            </List>
          )}
        </Box>
      </Container>
    </>
  );
}
