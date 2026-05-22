import React, { useState, useEffect } from "react";
import {
	Modal,
	Box,
	Typography,
	TextField,
	Button,
	MenuItem,
	FormControl,
	FormHelperText,
	InputLabel,
	ListSubheader,
	Select,
} from "@mui/material";

const style = {
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 380,
	bgcolor: "background.paper",
	borderRadius: 2,
	boxShadow: 24,
	p: 3,
};

function AddTicketModal({
	isOpen,
	onClose,
	onAddTicket,
	computers = [],
	components = [],
	laboratories = [],
}) {
	const [selectedComputer, setSelectedComputer] = useState("");
	const [selectedComponent, setSelectedComponent] = useState("");
	const [description, setDescription] = useState("");
	const [errors, setErrors] = useState({
		computer: "",
		component: "",
		description: "",
	});

	useEffect(() => {
		if (!isOpen) {
			setSelectedComputer("");
			setSelectedComponent("");
			setDescription("");
			setErrors({ computer: "", component: "", description: "" });
		}
	}, [isOpen]);

	const validate = () => {
		const newErrors = { computer: "", component: "", description: "" };
		let isValid = true;

		if (!selectedComputer) {
			newErrors.computer = "Selecione um computador";
			isValid = false;
		}
		if (!selectedComponent) {
			newErrors.component = "Selecione um componente";
			isValid = false;
		}
		if (!description.trim()) {
			newErrors.description = "Descrição é obrigatória";
			isValid = false;
		} else if (description.trim().length < 10) {
			newErrors.description = "Descrição muito curta (mínimo 10 caracteres)";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = () => {
		if (!validate()) return;

		onAddTicket({
			computer_id: Number(selectedComputer),
			component_id: Number(selectedComponent),
			description: description.trim(),
		});
	};

	const hasLabReference = computers.some(
		c => c.lab_id != null || c.laboratory_id != null
	);

	const labsById = laboratories.reduce((acc, lab) => {
		acc[lab.lab_id] = lab.name;
		return acc;
	}, {});

	const computersByLab = hasLabReference
		? computers.reduce((acc, computer) => {
				const labId = computer.lab_id ?? computer.laboratory_id;
				const groupKey = labId ?? "unknown";
				if (!acc[groupKey]) {
					acc[groupKey] = {
						name:
							groupKey === "unknown"
								? "Sem laboratório"
								: labsById[labId] || `Laboratório ${labId}`,
						computers: [],
					};
				}
				acc[groupKey].computers.push(computer);
				return acc;
			}, {})
		: null;

	return (
		<Modal open={isOpen} onClose={onClose}>
			<Box sx={style}>
				<Typography variant="h6" mb={2} fontWeight="bold">
					Novo Chamado
				</Typography>

				<FormControl fullWidth margin="normal" error={!!errors.computer}>
					<InputLabel id="select-computer-label">Computador</InputLabel>
					<Select
						labelId="select-computer-label"
						value={selectedComputer}
						label="Computador"
						onChange={e => {
							setSelectedComputer(e.target.value);
							setErrors(prev => ({ ...prev, computer: "" }));
						}}
					>
						{hasLabReference
							? Object.entries(computersByLab).flatMap(([labKey, lab]) => [
									<ListSubheader key={`lab-${labKey}`}>
										{lab.name}
									</ListSubheader>,
									...lab.computers.map(c => (
										<MenuItem key={c.computer_id} value={c.computer_id}>
											{`PC ${c.computer_id} - ${c.os}`}
										</MenuItem>
									)),
								])
							: // TODO: agrupar por laboratório após alinhar com back-end
								computers.map(c => (
									<MenuItem key={c.computer_id} value={c.computer_id}>
										{`PC ${c.computer_id} - ${c.os}`}
									</MenuItem>
								))}
					</Select>
					{errors.computer && (
						<FormHelperText>{errors.computer}</FormHelperText>
					)}
				</FormControl>

				<FormControl fullWidth margin="normal" error={!!errors.component}>
					<InputLabel id="select-component-label">Componente</InputLabel>
					<Select
						labelId="select-component-label"
						value={selectedComponent}
						label="Componente"
						onChange={e => {
							setSelectedComponent(e.target.value);
							setErrors(prev => ({ ...prev, component: "" }));
						}}
					>
						{components.map(comp => (
							<MenuItem key={comp.id} value={comp.id}>
								{comp.name}
							</MenuItem>
						))}
					</Select>
					{errors.component && (
						<FormHelperText>{errors.component}</FormHelperText>
					)}
				</FormControl>

				<TextField
					label="Descrição"
					placeholder="Descreva o problema em detalhes..."
					multiline
					rows={4}
					fullWidth
					margin="normal"
					value={description}
					onChange={e => {
						setDescription(e.target.value);
						setErrors(prev => ({ ...prev, description: "" }));
					}}
					error={!!errors.description}
					helperText={errors.description}
				/>

				<Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
					<Button variant="outlined" onClick={onClose}>
						Cancelar
					</Button>
					<Button variant="contained" onClick={handleSubmit}>
						Enviar Chamado
					</Button>
				</Box>
			</Box>
		</Modal>
	);
}

export default AddTicketModal;
