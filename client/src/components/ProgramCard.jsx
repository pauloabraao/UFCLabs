import React from "react";
import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function ProgramCard({ program, onDelete }) {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        backgroundColor: "#f9f9f9",
        position: "relative",
        paddingRight: "2.5rem",
      }}
    >
      <IconButton
        aria-label="Remover programa"
        onClick={() => onDelete(program)}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "#f44336",
          color: "white",
          padding: "6px",
          zIndex: 2,
        }}
        size="small"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
      <CardContent>
        <Typography variant="h6">{program.name}</Typography>
        <Typography color="text.secondary">Versão: {program.version}</Typography>
      </CardContent>
    </Card>
  );
}

export default ProgramCard;
