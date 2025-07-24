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
    number_id INT NOT NULL,
    property_id VARCHAR(30) UNIQUE,
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
    password VARCHAR(100) NOT NULL,
    role ENUM('administrador', 'professor', 'estudante', 'tecnico') NOT NULL,
    FOREIGN KEY (campus_id) REFERENCES Campus(campus_id)
);

-- LabSchedule
CREATE TABLE LabSchedule (
    lab_id INT NOT NULL,
    time ENUM('08:00 - 10:00', '10:00 - 12:00', '13:30 - 15:30', '15:30 - 17:30', '18:00 - 20:00', '20:00 - 22:00') NOT NULL,
    day_of_week ENUM('seg', 'ter', 'qua', 'qui', 'sex') NOT NULL,
    discipline VARCHAR(100),
    teacher VARCHAR(100),
    status ENUM('reservado', 'livre') NOT NULL,
    PRIMARY KEY (lab_id, time, day_of_week),
    FOREIGN KEY (lab_id) REFERENCES Laboratory(lab_id)
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
    component ENUM('monitor', 'mouse', 'teclado', 'gabinete', 'internet', 'outros') NOT NULL,
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
);


