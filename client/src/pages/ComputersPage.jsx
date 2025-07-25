import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import deleteCookie from "../utils/deleteCookie"; // deletar cookie
import ComputerCard from "../components/ComputerCard";
import AddComputerModal from "../components/AddComputerModal";
import EditComputerModal from "../components/EditComputerModal";
import ComputersHeader from "../components/ComputersHeader";
import ScheduleLabModal from "../components/ScheduleLabModal";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import './ComputersPage.css';

function ComputersPage() {
  const { labId } = useParams();
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [labName, setLabName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [computerToEdit, setComputerToEdit] = useState(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [labSchedule, setLabSchedule] = useState([]);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/api/computers?lab_id=${labId}`)
      .then((res) => setComputers(res.data))
      .catch(() => setComputers([]))
      .finally(() => setLoading(false));
  }, [labId]);

  useEffect(() => {
    // Fetch lab name
    axios
      .get(`http://localhost:3000/api/laboratories/${labId}`)
      .then((res) => setLabName(res.data.name))
      .catch(() => setLabName("Laboratório"));
  }, [labId]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddComputer = (novoComputador) => {
    axios
      .post("http://localhost:3000/api/computers", {
        lab_id: parseInt(labId),
        ...novoComputador,
      })
      .then((res) => setComputers([...computers, res.data]))
      .catch(() => alert("Erro ao adicionar computador."));
  };

  const handleCardClick = (computer) => {
    setComputerToEdit(computer);
    setEditModalOpen(true);
  };

  const handleEditComputer = (updatedComputer) => {
    axios
      .put(`http://localhost:3000/api/computers/${updatedComputer.computer_id}`, updatedComputer)
      .then((res) => {
        setComputers(computers.map(c =>
          c.computer_id === updatedComputer.computer_id ? res.data : c
        ));
        setEditModalOpen(false);
        setComputerToEdit(null);
      })
      .catch(() => alert("Erro ao editar computador."));
  };

  const handleDeleteComputer = (computer) => {
    axios
      .delete(`http://localhost:3000/api/computers/${computer.computer_id}`)
      .then(() => {
        setComputers(computers.filter(c => c.computer_id !== computer.computer_id));
        setEditModalOpen(false);
        setComputerToEdit(null);
      })
      .catch(() => alert("Erro ao excluir computador."));
  };

  const handleLogout = () => {
    if (window.confirm("Você tem certeza que deseja sair?")) {
      deleteCookie('token'); //deletar cookie
      navigate("/");
    }
  };

  const handleOpenSchedule = () => {
    setIsScheduleOpen(true);
    setScheduleLoading(true);
    axios
      .get(`http://localhost:3000/api/lab-schedules/by-lab?lab_id=${labId}`)
      .then((res) => setLabSchedule(res.data))
      .catch(() => setLabSchedule([]))
      .finally(() => setScheduleLoading(false));
  };

  const handleCloseSchedule = () => {
    setIsScheduleOpen(false);
    setLabSchedule([]);
  };

  return (
    <>
      <ComputersHeader
        labName={labName}
        onOpenModal={handleOpenModal}
        onLogout={handleLogout}
        onOpenSchedule={handleOpenSchedule}
      />
      <main className="main-content">
        <Link to={`/blocks/${labId}/labs`} className="back-link"> 
            ← Voltar para Laboratórios
        </Link>
        {loading ? (
          // Animação de carregamento
          <Box className="loading-container"> 
            <CircularProgress />
            <Typography variant="h6" className="loading-text"> 
              Carregando computadores...
            </Typography>
          </Box>
        ) : computers.length === 0 ? (
          <Typography variant="h6" className="message-text"> 
            Nenhum computador encontrado para este laboratório.
          </Typography>
        ) : (
          // Exibição dos computadores
          <div className="computers-list">
            {computers.map((computer) => (
              <ComputerCard
                key={computer.computer_id}
                computer={computer}
                onEdit={() => {
                setComputerToEdit(computer);
                setEditModalOpen(true);
              }}
              />
            ))}
          </div>
        )}
      </main>
      <AddComputerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddComputer={handleAddComputer}
      />
      <EditComputerModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        computer={computerToEdit}
        onEditComputer={handleEditComputer}
        onDeleteComputer={handleDeleteComputer}
      />
      {isScheduleOpen && (
  <ScheduleLabModal
    isOpen={isScheduleOpen}
    onClose={handleCloseSchedule}
    schedule={labSchedule}
    loading={scheduleLoading}
  />
)}

    </>
  );
}

export default ComputersPage;
