import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ComputerCard from "../components/ComputerCard";
import AddComputerModal from "../components/AddComputerModal";
import EditComputerModal from "../components/EditComputerModal";
import ComputersHeader from "../components/ComputersHeader";
import { Container, Typography } from "@mui/material";
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

  const handleLogout = () => {
    if (window.confirm("Você tem certeza que deseja sair?")) {
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
          <Link to={`/blocks/${computers[0]?.lab_id || ""}/labs`}>
            ← Voltar para Laboratórios
          </Link>
          {loading ? (
            <Typography>Carregando...</Typography>
          ) : (
            <div className="computers-list">
              {computers.map((computer) => (
                <ComputerCard
                  key={computer.computer_id}
                  computer={computer}
                  onClick={() => handleCardClick(computer)}
                />
              ))}
              {computers.length === 0 && (
                <Typography>Nenhum computador encontrado.</Typography>
              )}
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
      />
      {/* LabSchedule Modal */}
      {isScheduleOpen && (
        <div className="modal" onClick={handleCloseSchedule}>
          <div className="modal-conteudo" onClick={e => e.stopPropagation()}>
            <span className="fechar" onClick={handleCloseSchedule}>&times;</span>
            <h2>Horário do Laboratório</h2>
            {scheduleLoading ? (
              <p>Carregando...</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>Dia</th>
                    <th>Horário</th>
                    <th>Disciplina</th>
                    <th>Professor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {labSchedule.length === 0 ? (
                    <tr>
                      <td colSpan={5}>Nenhum horário cadastrado.</td>
                    </tr>
                  ) : (
                    labSchedule.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.day_of_week}</td>
                        <td>
                          {(item.start_time && item.end_time)
                            ? `${item.start_time} - ${item.end_time}`
                            : `Slot ${item.slot_id}`}
                        </td>
                        <td>{item.discipline || "-"}</td>
                        <td>{item.teacher || "-"}</td>
                        <td>{item.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ComputersPage;
