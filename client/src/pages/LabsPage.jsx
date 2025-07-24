import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import LabGrid from '../components/LabGrid';
import AddLabModal from '../components/AddLabModal';
import EditLabModal from '../components/EditLabModal';
import './LabsPage.css';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import getUserInfo from '../utils/getUserInfo'; // Importa o utilitário

function LabsPage() {
  const { blockId } = useParams();
  const navigate = useNavigate();
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
    axios.get('http://localhost:3000/api/campuses')
      .then(res => setCampuses(res.data))
      .catch(() => setCampuses([]));
  }, []);

  // Fetch blocks when campus changes
  useEffect(() => {
    if (selectedCampusId) {
      axios.get(`http://localhost:3000/api/blocks?campus_id=${selectedCampusId}`)
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
      axios.get(`http://localhost:3000/api/laboratories?block_id=${selectedBlockId}`)
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
    axios.post('http://localhost:3000/api/laboratories', {
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
    //setIsModalOpen(true);
    // Garante que apenas administradores possam abrir o modal
    if (isAdmin) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    //setIsModalOpen(false);
    isAdmin={isAdmin} // Passa a flag para o Header
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
    axios.put(`http://localhost:3000/api/laboratories/${updatedLab.lab_id}`, updatedLab)
      .then(res => {
        setLabs(labs.map(l => l.lab_id === updatedLab.lab_id ? res.data : l));
        setIsEditModalOpen(false);
        setEditLab(null);
      })
      .catch(() => alert("Erro ao editar laboratório."));
  };

  const handleDeleteLab = (lab) => {
    if (window.confirm(`Tem certeza que deseja excluir o laboratório "${lab.name}"? Esta ação não pode ser desfeita.`)) {
      axios.delete(`http://localhost:3000/api/laboratories/${lab.lab_id}`)
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