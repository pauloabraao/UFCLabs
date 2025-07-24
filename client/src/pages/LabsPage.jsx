import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import LabGrid from '../components/LabGrid';
import AddLabModal from '../components/AddLabModal';
import EditLabModal from '../components/EditLabModal';
import './LabsPage.css';
import api from '../utils/api'; // Usar a instância do axios configurada
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import getUserInfo from '../utils/getUserInfo'; // Importa o utilitário

function LabsPage() {
  const { blockId } = useParams(); // blockId da URL, se houver
  const [labs, setLabs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editLab, setEditLab] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Verifica a role do usuário a partir do token
  const userInfo = getUserInfo();
  const isAdmin = userInfo?.role === 'administrador';

  // New state for campuses and blocks
  const [campuses, setCampuses] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [selectedCampusId, setSelectedCampusId] = useState('');
  const [selectedBlockId, setSelectedBlockId] = useState(blockId || '');

  // Fetch campuses on mount
  useEffect(() => {
    api.get('/campuses')
      .then(res => setCampuses(res.data))
      .catch(() => setCampuses([]));
  }, []);

  // Fetch blocks when campus changes
  useEffect(() => {
    if (selectedCampusId) {
      api.get(`/blocks?campus_id=${selectedCampusId}`)
        .then(res => setBlocks(res.data))
        .catch(() => setBlocks([]));
    } else {
      setBlocks([]);
    }
    setSelectedBlockId('');
  }, [selectedCampusId]);

  // Fetch labs when block changes
  useEffect(() => {
    if (selectedBlockId) {
      setLoading(true);
      api.get(`/laboratories?block_id=${selectedBlockId}`)
        .then(res => setLabs(res.data))
        .catch(() => setLabs([]))
        .finally(() => setLoading(false));
    } else {
      setLabs([]);
      setLoading(false);
    }
  }, [selectedBlockId]);

  // If blockId is in URL, set as selectedBlockId
  useEffect(() => {
    if (blockId) {
      setSelectedBlockId(blockId);
    }
  }, [blockId]);

  const handleAddLab = (novoLab) => {
    api.post('/laboratories', {
      block_id: parseInt(selectedBlockId),
      name: novoLab.name,
      capacity: parseInt(novoLab.capacity),
      num_computers: novoLab.num_computers
    })
      .then(res => {
        setLabs([...labs, res.data]);
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error("Erro ao adicionar laboratório:", error);
        alert("Erro ao adicionar laboratório.");
      });
  };

  const handleOpenModal = () => {
    // Garante que apenas administradores possam abrir o modal
    if (isAdmin) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Edit handlers
  const handleEditLab = (lab) => {
    setEditLab(lab);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditLab(null);
    setIsEditModalOpen(false);
  };

  const handleUpdateLab = (updatedLab) => {
    api.put(`/laboratories/${updatedLab.lab_id}`, updatedLab)
      .then(res => {
        setLabs(labs.map(l => l.lab_id === updatedLab.lab_id ? res.data : l));
        setIsEditModalOpen(false);
        setEditLab(null);
      })
      .catch(() => alert("Erro ao editar laboratório."));
  };

  const handleDeleteLab = (lab) => {
    if (window.confirm(`Tem certeza que deseja excluir o laboratório "${lab.name}"? Esta ação não pode ser desfeita.`)) {
      api.delete(`/laboratories/${lab.lab_id}`)
        .then(() => {
          setLabs(labs.filter(l => l.lab_id !== lab.lab_id));
          setIsEditModalOpen(false);
          setEditLab(null);
        })
        .catch(() => alert("Erro ao excluir laboratório."));
    }
  };

  // Handle campus select change
  const handleCampusChange = (campusId) => {
    setSelectedCampusId(campusId);
    setSelectedBlockId('');
    setLabs([]);
    // Optionally, navigate to a route if needed
  };

  // Handle block select change
  const handleBlockChange = (blockId) => {
    setSelectedBlockId(blockId);
    // Optionally, navigate to a route if needed
    // navigate(`/blocks/${blockId}/labs`);
  };

  return (
    <>
      <Header
        onOpenModal={handleOpenModal}
        campuses={campuses}
        blocks={blocks}
        selectedCampusId={selectedCampusId}
        selectedBlockId={selectedBlockId}
        onCampusChange={handleCampusChange}
        onBlockChange={handleBlockChange}
        isAdmin={isAdmin}
      />
      <main className="main-content">
        {loading ? (
          <Typography>Carregando...</Typography>
        ) : (
          <LabGrid
            labs={labs}
            onEditLab={handleEditLab}
            onDeleteLab={handleDeleteLab}
          />
        )}
      </main>
      <AddLabModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddLab={handleAddLab}
      />
      <EditLabModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        lab={editLab}
        onEditLab={handleUpdateLab}
        onDeleteLab={handleDeleteLab}
      />
    </>
  );
}

export default LabsPage;