import React, { useState, useEffect } from "react";
import TicketsHeader from "../components/TicketsHeader";
import TicketsTable from "../components/TicketsTable";
import AddTicketModal from "../components/AddTicketModal";
import "./TicketsPage.css";
import api from "../utils/api";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

function TicketsPage() {
	const [loading, setLoading] = useState(true);
	const [tickets, setTickets] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [statusFilter, setStatusFilter] = useState("todos");
	const [currentPage, setCurrentPage] = useState(1);
	const [computers, setComputers] = useState([]);
	const [laboratories, setLaboratories] = useState([]);

	const ITEMS_PER_PAGE = 10;

	const components = [
		{ id: 1, name: "Monitor", value: "Monitor" },
		{ id: 2, name: "Teclado", value: "teclado" },
		{ id: 3, name: "Mouse", value: "mouse" },
		{ id: 4, name: "Gabinete", value: "gabinete" },
		{ id: 5, name: "Internet", value: "internet" },
		{ id: 6, name: "Outros", value: "outros" },
	];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [ticketsRes, computersRes, labsRes] = await Promise.all([
					api.get("/computer-issues"),
					api.get("/computers"),
					api.get("/laboratories"),
				]);

				setTickets(ticketsRes.data);
				setComputers(computersRes.data);
				setLaboratories(labsRes.data);
			} catch (error) {
				console.error("Erro ao buscar dados:", error);
				alert("Erro ao carregar dados");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		setCurrentPage(1);
	}, [statusFilter]);

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	const handleAddTicket = newTicket => {
		const component = components.find(c => c.id === newTicket.component_id);
		const componentValue = component?.value || "outros";
		const computerId = Number(newTicket.computer_id);

		const payload = {
			computer_id: Number.isFinite(computerId)
				? computerId
				: newTicket.computer_id,
			reported_by: 1,
			description: newTicket.description,
			date_reported: new Date().toISOString().split("T")[0],
			status: "aberto",
			component: componentValue,
		};

		api
			.post("/computer-issues", payload)
			.then(res => {
				setTickets([...tickets, res.data]);
				setIsModalOpen(false);
			})
			.catch(() => alert("Erro ao abrir chamado."));
	};

	const handleEditTicket = async (issueId, newStatus) => {
		try {
			const ticket = tickets.find(t => t.issue_id === issueId);
			if (!ticket) return;

			const payload = {
				computer_id: ticket.computer_id,
				reported_by: ticket.reported_by,
				description: ticket.description,
				date_reported: ticket.date_reported,
				status: newStatus,
				component: ticket.component,
			};

			const response = await api.put(`/computer-issues/${issueId}`, payload);

			setTickets(
				tickets.map(t => (t.issue_id === issueId ? response.data : t))
			);
			alert("Status atualizado com sucesso!");
		} catch (error) {
			console.error("Erro ao atualizar chamado:", error);
			alert("Erro ao atualizar chamado");
		}
	};

	const handleDeleteTicket = async issueId => {
		try {
			await api.delete(`/computer-issues/${issueId}`);
			setTickets(tickets.filter(t => t.issue_id !== issueId));
			alert("Chamado deletado com sucesso!");
		} catch (error) {
			console.error("Erro ao deletar chamado:", error);
			alert("Erro ao deletar chamado");
		}
	};

	const filteredTickets =
		statusFilter === "todos"
			? tickets
			: tickets.filter(ticket => ticket.status.toLowerCase() === statusFilter);

	const totalPages = Math.max(
		1,
		Math.ceil(filteredTickets.length / ITEMS_PER_PAGE)
	);

	const paginatedTickets = filteredTickets.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	return (
		<>
			<TicketsHeader />
			<Button
				variant="contained"
				color="primary"
				startIcon={<AddIcon />}
				className="fab-inferior-direito"
				onClick={handleOpenModal}
			>
				Abrir chamado
			</Button>

			<main className="main-content">
				<div className="filtro-status">
					{["todos", "aberto", "em andamento", "resolvido"].map(status => (
						<button
							key={status}
							onClick={() => setStatusFilter(status)}
							className={`filtro-botao ${statusFilter === status ? "ativo" : ""}`}
						>
							{status.charAt(0).toUpperCase() + status.slice(1)}
						</button>
					))}
				</div>

				{loading ? (
					<Typography>Carregando...</Typography>
				) : (
					<>
						<TicketsTable
							tickets={paginatedTickets}
							computers={computers}
							laboratories={laboratories}
							onEdit={handleEditTicket}
							onDelete={handleDeleteTicket}
						/>
						<div className="pagination-controls">
							<Button
								variant="outlined"
								onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
								disabled={currentPage === 1}
							>
								Anterior
							</Button>
							<span className="pagination-info">
								Página {currentPage} de {totalPages}
							</span>
							<Button
								variant="outlined"
								onClick={() =>
									setCurrentPage(page => Math.min(page + 1, totalPages))
								}
								disabled={currentPage === totalPages}
							>
								Próxima
							</Button>
						</div>
					</>
				)}
			</main>

			<AddTicketModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onAddTicket={handleAddTicket}
				computers={computers}
				components={components}
			/>
		</>
	);
}

export default TicketsPage;
