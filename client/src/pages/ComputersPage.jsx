import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ComputerCard from "../components/ComputerCard";
import { Container, Typography } from "@mui/material";

function ComputersPage() {
  const { labId } = useParams();
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/computers?lab_id=${labId}`)
      .then((res) => setComputers(res.data))
      .catch(() => setComputers([]))
      .finally(() => setLoading(false));
  }, [labId]);

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Link to={`/blocks/${computers[0]?.lab_id}/labs`}>
        ← Voltar para Laboratórios
      </Link>
      <Typography variant="h4" gutterBottom>
        Computadores do Laboratório {labId}
      </Typography>
      {loading ? (
        <Typography>Carregando...</Typography>
      ) : (
        <div className="computers-list">
          {computers.map((computer) => (
            <ComputerCard key={computer.computer_id} computer={computer} />
          ))}
          {computers.length === 0 && (
            <Typography>Nenhum computador encontrado.</Typography>
          )}
        </div>
      )}
    </Container>
  );
}

export default ComputersPage;
