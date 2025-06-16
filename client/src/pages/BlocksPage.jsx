import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Container, Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

function BlocksPage() {
  const { campusId } = useParams();
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/blocks?campus_id=${campusId}`)
      .then(res => setBlocks(res.data))
      .catch(() => setBlocks([]))
      .finally(() => setLoading(false));
  }, [campusId]);

  const handleBlockClick = (blockId) => {
    navigate(`/blocks/${blockId}/labs`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Link to="/">← Voltar para Campi</Link>
      <Typography variant="h4" gutterBottom>Blocos do Campus {campusId}</Typography>
      {loading ? (
        <Typography>Carregando...</Typography>
      ) : (
        <List>
          {blocks.map(block => (
            <ListItem key={block.block_id} disablePadding>
              <ListItemButton onClick={() => handleBlockClick(block.block_id)}>
                <ListItemText primary={block.name} />
              </ListItemButton>
            </ListItem>
          ))}
          {blocks.length === 0 && (
            <Typography>Nenhum bloco encontrado.</Typography>
          )}
        </List>
      )}
    </Container>
  );
}

export default BlocksPage;
