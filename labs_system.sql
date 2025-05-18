CREATE DATABASE IF NOT EXISTS LabsSystem;
USE LabsSystem;

-- Campus
CREATE TABLE Campus (
    campus_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL
);

-- Block
CREATE TABLE Block (
    block_id INT AUTO_INCREMENT PRIMARY KEY,
    campus_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    FOREIGN KEY (campus_id) REFERENCES Campus(campus_id)
);

-- Laboratory
CREATE TABLE Laboratory (
    lab_id INT AUTO_INCREMENT PRIMARY KEY,
    block_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    num_computers INT NOT NULL,
    FOREIGN KEY (block_id) REFERENCES Block(block_id)
);

-- Computer
CREATE TABLE Computer (
    computer_id INT AUTO_INCREMENT PRIMARY KEY,
    lab_id INT NOT NULL,
    os VARCHAR(100),
    cpu VARCHAR(100),
    ram VARCHAR(50),
    storage VARCHAR(50),
    status ENUM('disponivel', 'fora de servico', 'em reparo') NOT NULL,
    FOREIGN KEY (lab_id) REFERENCES Laboratory(lab_id)
);

-- User
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    campus_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('administrador', 'professor', 'estudante', 'tecnico') NOT NULL,
    FOREIGN KEY (campus_id) REFERENCES Campus(campus_id)
);

-- ScheduleSlot
CREATE TABLE ScheduleSlot (
    slot_id INT AUTO_INCREMENT PRIMARY KEY,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

-- LabSchedule
CREATE TABLE LabSchedule (
    lab_id INT NOT NULL,
    slot_id INT NOT NULL,
    day_of_week ENUM('seg', 'ter', 'qua', 'qui', 'sex') NOT NULL,
    discipline VARCHAR(100),
    teacher VARCHAR(100),
    status ENUM('Reservado', 'Livre') NOT NULL,
    PRIMARY KEY (lab_id, slot_id, day_of_week),
    FOREIGN KEY (lab_id) REFERENCES Laboratory(lab_id),
    FOREIGN KEY (slot_id) REFERENCES ScheduleSlot(slot_id)
);

-- Program
CREATE TABLE Program (
    program_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    version VARCHAR(50) NOT NULL
);

-- LabProgramRequest
CREATE TABLE LabProgramRequest (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    lab_id INT NOT NULL,
    requested_by INT NOT NULL,
    program_name VARCHAR(100) NOT NULL,
    version VARCHAR(50) NOT NULL,
    status ENUM('pendente', 'instalado', 'negado') NOT NULL,
    request_date DATE NOT NULL,
    FOREIGN KEY (lab_id) REFERENCES Laboratory(lab_id),
    FOREIGN KEY (requested_by) REFERENCES User(user_id)
    -- Observação: a filtragem por role (Professor) deverá ser feita via lógica de aplicação
);

-- ComputerProgram
CREATE TABLE ComputerProgram (
    computer_id INT NOT NULL,
    program_id INT NOT NULL,
    PRIMARY KEY (computer_id, program_id),
    FOREIGN KEY (computer_id) REFERENCES Computer(computer_id),
    FOREIGN KEY (program_id) REFERENCES Program(program_id)
);

-- ComputerIssue
CREATE TABLE ComputerIssue (
    issue_id INT AUTO_INCREMENT PRIMARY KEY,
    computer_id INT NOT NULL,
    reported_by INT NOT NULL,
    description TEXT NOT NULL,
    date_reported DATE NOT NULL,
    status ENUM('aberto', 'em andamento', 'resolvido') NOT NULL,
    component ENUM('Monitor', 'mouse', 'teclado', 'gabinete', 'outros') NOT NULL,
    FOREIGN KEY (computer_id) REFERENCES Computer(computer_id),
    FOREIGN KEY (reported_by) REFERENCES User(user_id)
);

-- MaintenanceRequest
CREATE TABLE MaintenanceRequest (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    computer_id INT NOT NULL,
    description TEXT NOT NULL,
    requested_by INT NOT NULL,
    status ENUM('pendente', 'em reparo', 'concluido') NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (computer_id) REFERENCES Computer(computer_id),
    FOREIGN KEY (requested_by) REFERENCES User(user_id)
    -- Observação: a filtragem por role (Técnico ou Administrador) deverá ser feita via lógica de aplicação
);

