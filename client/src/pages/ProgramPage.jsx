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
  const [deletingId, setDeletingId] = useState(null);

  // Estado para o termo de busca
  const [termoBusca, setTermoBusca] = useState("");

  const fetchPrograms = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/computer-programs/computer/${computerId}`,
      );
      const installedPrograms = await Promise.all(
        res.data.map(async (cp) => {
          const prog = await axios.get(
            `http://localhost:3000/api/programs/${cp.program_id}`,
          );
          return prog.data;
        }),
      );
      setPrograms(installedPrograms);
    } catch {
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms(true);
  }, [computerId]);

  const handleAddProgram = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/computer-programs", data);
      await fetchPrograms(false);
      setIsModalOpen(false);
    } catch (err) {
      const msg =
        err.response?.status >= 500
          ? "Erro no servidor. Tente novamente mais tarde."
          : "Erro ao adicionar programa. Verifique os dados.";
      alert(msg);
      throw err;
    }
  };

  const handleDeleteProgram = (program) => {
    setDeletingId(program.program_id);
    setTimeout(() => {
      axios
        .delete(
          `http://localhost:3000/api/computer-programs/${computerId}/${program.program_id}`,
        )
        .then(() => {
          setDeletingId(null);
          fetchPrograms(false);
        })
        .catch(() => {
          setDeletingId(null);
          alert("Erro ao remover programa.");
        });
    }, 300);
  };

  // Filtra programas pelo termo de busca localmente
  const programasFiltrados = programs.filter(
    (program) =>
      program.name &&
      program.name.toLowerCase().includes(termoBusca.toLowerCase()),
  );

  return (
    <>
      <ProgramHeader
        computerId={computerId}
        onOpenAddProgram={() => setIsModalOpen(true)}
      />
      <main className="main-content">
        {/* Container de filtros para a barra de busca */}
        <div className="filters-container">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar programa..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
        </div>

        <Typography variant="h5" gutterBottom>
          Programas Instalados no Computador {computerId}
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : programasFiltrados.length === 0 ? (
          <Typography>Nenhum programa encontrado.</Typography>
        ) : (
          <div className="programs-list">
            {programasFiltrados.map((program) => (
              <ProgramCard
                key={program.program_id}
                program={program}
                onDelete={handleDeleteProgram}
                isDeleting={deletingId === program.program_id}
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
        installedPrograms={programs}
      />
    </>
  );
}

export default ProgramPage;
