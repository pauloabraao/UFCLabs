import React from "react";
import { Card, CardContent, Typography, IconButton, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";

function ProgramCard({ program, onDelete, isDeleting }) {
  return (
    <Card
      className={isDeleting ? "card-deleting" : "card-entering"}
      sx={{
        position: "relative",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(20, 80, 133, 0.12)",
        border: "1px solid rgba(30, 136, 229, 0.08)",
        borderLeft: "4px solid #58c4c4",
        minHeight: "160px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 20px rgba(30, 136, 229, 0.25)",
        },
      }}
    >
      <IconButton
        aria-label="Remover programa"
        onClick={() => onDelete(program)}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "action.active",
          padding: "6px",
          zIndex: 2,
          "&:hover": { color: "#d32f2f" },
        }}
        size="small"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>

      <CardContent sx={{ paddingRight: "2.5rem", overflow: "hidden" }}>
        <DescriptionIcon
          sx={{
            fontSize: 40,
            color: "#58c4c4",
            mb: 1,
            display: "block",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            overflowWrap: "break-word",
            wordBreak: "break-word",
            fontWeight: 600,
          }}
        >
          {program.name}
        </Typography>
        <Chip
          label={`V - ${program.version}`}
          size="small"
          sx={{
            mt: 1,
            backgroundColor: "#e3f2fd",
            color: "#1e88e5",
            fontWeight: 500,
          }}
        />
      </CardContent>
    </Card>
  );
}

export default ProgramCard;
