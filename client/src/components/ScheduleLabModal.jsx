// src/components/ScheduleLabModal.jsx
import React from "react";

function ScheduleLabModal({ isOpen, onClose, schedule, loading }) {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
        <span className="fechar" onClick={onClose}>
          &times;
        </span>
        <h2>Horário do Laboratório</h2>
        {loading ? (
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
              {schedule.length === 0 ? (
                <tr>
                  <td colSpan={5}>Nenhum horário cadastrado.</td>
                </tr>
              ) : (
                schedule.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.day_of_week}</td>
                    <td>
                      {item.start_time && item.end_time
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
  );
}

export default ScheduleLabModal;
