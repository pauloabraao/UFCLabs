import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import LabGrid from '../components/LabGrid';
import AddLabModal from '../components/AddLabModal';
import './LabsPage.css';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

function LabsPage() {
  const { blockId } = useParams();
  const navigate = useNavigate();
  const [labs, setLabs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
      name: novoLab.nome,
      capacity: parseInt(novoLab.capacidade),
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
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          <LabGrid labs={labs} />
        )}
      </main>
      <AddLabModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddLab={handleAddLab}
      />
    </>
  );
}

export default LabsPage;