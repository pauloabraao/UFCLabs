import React from "react";
import "../pages/ComputersPage.css";

function ScheduleLabModal({ isOpen, onClose, schedule, loading }) {
  if (!isOpen) return null;

  const diasSemana = ["seg", "ter", "qua", "qui", "sex"];
  const horarios = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "13:30 - 15:30",
    "15:30 - 17:30",
    "18:00 - 20:00",
    "20:00 - 22:00",
  ];

  // Organiza os dados por horário e dia
  const tabela = {};
  horarios.forEach((horario) => {
    tabela[horario] = {};
    diasSemana.forEach((dia) => {
      tabela[horario][dia] = null;
    });
  });

  schedule.forEach((item) => {
    if (tabela[item.time] && tabela[item.time][item.day_of_week]) {
      tabela[item.time][item.day_of_week] = {
        disciplina: item.discipline,
        professor: item.teacher,
      };
    } else if (tabela[item.time]) {
      tabela[item.time][item.day_of_week] = {
        disciplina: item.discipline,
        professor: item.teacher,
      };
    }
  });

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
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Horário</th>
                {diasSemana.map((dia) => (
                  <th key={dia}>{dia.charAt(0).toUpperCase() + dia.slice(1)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {horarios.map((horario) => (
                <tr key={horario}>
                  <td>{horario}</td>
                  {diasSemana.map((dia) => {
                    const celula = tabela[horario][dia];
                    return (
                      <td key={dia}>
                        {celula && celula.disciplina && (
                          <>
                            <strong>{celula.disciplina}</strong>
                            <br />
                            <small>{celula.professor}</small>
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        
        )}
      </div>
    </div>
  );
}

export default ScheduleLabModal;
