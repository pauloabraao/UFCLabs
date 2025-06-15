import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import LabCard from "../components/LabCard";
import { Container, Typography } from "@mui/material";

function LabsPage() {
  const { blockId } = useParams();
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/laboratories?block_id=${blockId}`)
      .then((res) => setLabs(res.data))
      .catch(() => setLabs([]))
      .finally(() => setLoading(false));
  }, [blockId]);

  const handleLabClick = (labId) => {
    navigate(`/labs/${labId}/computers`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Link to={`/campuses/${labs[0]?.block_id}/blocks`}>
        ← Voltar para Blocos
      </Link>
      <Typography variant="h4" gutterBottom>
        Laboratórios do Bloco {blockId}
      </Typography>
      {loading ? (
        <Typography>Carregando...</Typography>
      ) : (
        <div className="labs-list">
          {labs.map((lab) => (
            <LabCard
              key={lab.lab_id}
              lab={lab}
              onClick={() => handleLabClick(lab.lab_id)}
            />
          ))}
          {labs.length === 0 && (
            <Typography>Nenhum laboratório encontrado.</Typography>
          )}
        </div>
      )}
    </Container>
  );
}

export default LabsPage;
