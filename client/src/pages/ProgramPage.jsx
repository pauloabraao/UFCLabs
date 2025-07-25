import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import ProgramCard from "../components/ProgramCard";
import ProgramHeader from "../components/ProgramHeader";
import AddProgramModal from "../components/AddProgramModal";
import "./ProgramPage.css";

function ProgramPage() {
  const { computerId } = useParams();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/api/computer-programs/computer/${computerId}`);
      const installedPrograms = await Promise.all(
        res.data.map(async (cp) => {
          const prog = await axios.get(`http://localhost:3000/api/programs/${cp.program_id}`);
          return prog.data;
        })
      );
      setPrograms(installedPrograms);
    } catch {
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, [computerId]);

  const handleAddProgram = (data) => {
    axios
      .post("http://localhost:3000/api/computer-programs", data)
      .then(() => {
        fetchPrograms(); // Atualiza a lista após adição
        setIsModalOpen(false);
      })
      .catch(() => alert("Erro ao adicionar programa."));
  };

  const handleDeleteProgram = (program) => {
  axios
    .delete(`http://localhost:3000/api/computer-programs/${computerId}/${program.program_id}`)
    .then(() => fetchPrograms())
    .catch(() => alert("Erro ao remover programa."));
  };


  return (
    <>
      <ProgramHeader
        computerId={computerId}
        onOpenAddProgram={() => setIsModalOpen(true)}
      />
      <main className="main-content">
        <Typography variant="h5" gutterBottom>
          Programas Instalados no Computador {computerId}
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : programs.length === 0 ? (
          <Typography>Nenhum programa encontrado.</Typography>
        ) : (
          <div className="programs-list">
            {programs.map((program) => (
              <ProgramCard
                key={program.program_id}
                program={program}
                onDelete={handleDeleteProgram}
/>
            ))}
          </div>
        )}
      </main>

      <AddProgramModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        computerId={computerId}
        onAddProgram={handleAddProgram}
      />
    </>
  );
}

export default ProgramPage;
