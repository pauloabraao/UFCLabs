USE LabsSystem;

-- Inserir dados na tabela Campus
INSERT INTO Campus (name, location) VALUES 
('Campus Mucambinho', 'Rua Cel. Estanislau Frota, 563 - Centro'),
('Faculdade de Medicina', 'Rua Cmte. Maurocélio Rocha Ponte, 100 - Bairro Derby');

-- Inserir dados na tabela Block
INSERT INTO Block (campus_id, name) VALUES 
(1, 'Bloco I - Engenharias'),
(1, 'Odontologia'),
(2, 'Faculdade de Medicina');

-- Inserir dados na tabela Laboratory
INSERT INTO Laboratory (block_id, name, capacity, num_computers) VALUES 
(1, 'Laboratório de Programação Computacional', 30, 30),
(1, 'Laboratório de Simulações Numéricas', 40, 40),
(1, 'Laboratório de Informática', 30, 30),
(3, 'Laboratório de Radiologia', 16, 16),
(2, 'Laboratório de Informática - Odontologia', 20, 20);

-- Inserir dados na tabela User
INSERT INTO User (campus_id, name, email, password, role) VALUES 
(1, 'Samara Lima', 'samara.lima@sobral.ufc.br', sha2('tecnico123', 256), 'tecnico'),
(1, 'Sabrina Lima', 'sabrina.lima@sobral.ufc.br', sha2('tecnico123', 256), 'tecnico'),
(1, 'Breno', 'breno@sobral.ufc.br', sha2('tecnico123', 256), 'tecnico'),
(1, 'Paulo Ricardo Sousa', 'paulo.ricardo@sobral.ufc.br', sha2('tecnico123', 256), 'tecnico'),
(1, 'Martins', 'martins@sobral.ufc.br', sha2('tecnico123', 256), 'tecnico'),
(1, 'Pedro Rian', 'pedro.rian@sobral.ufc.br', sha2('tecnico123', 256), 'tecnico'),
(1, 'Vinícius', 'vinicius@sobral.ufc.br', sha2('tecnico123', 256), 'tecnico'),
(1, 'Gabriel Lima', 'gabriel.lima@sobral.ufc.br', sha2('tecnico123', 256), 'tecnico'),
(1, 'Ederton Gabriel', 'ederton.gabriel@sobral.ufc.br',sha2('tecnico123', 256), 'tecnico'),
(1, 'Almino', 'almino@sobral.ufc.br', sha2('tecnico123', 256), 'tecnico'),
(1, 'Evilásio Costa Junior', 'junior.facanha@sobral.ufc.br',sha2('professor123', 256), 'professor'),
(1, 'Wendley Sousa', 'wendley@sobral.ufc.br',sha2('professor123', 256), 'professor'),
(1, 'Paulo Abraão', 'abraaoteles@alu.ufc.br', sha2('estudante123', 256),'estudante'),
(1, 'Anderson Mendes', 'andersantos@alu.ufc.br',sha2('estudante123', 256), 'estudante'),
(1, 'Igor Cosmo', 'igoremanuel@alu.ufc.br',sha2('estudante123', 256), 'estudante'),
(1, 'Administrador', 'admin@sobral.ufc.br', sha2('admin123', 256),'administrador');

-- Inserir dados na tabela LabSchedule

INSERT INTO LabSchedule (lab_id, time, day_of_week, discipline, teacher, status) VALUES 
-- Horário Lab. de Programação Computacional

(1, '08:00 - 10:00', 'seg', NULL, NULL, 'livre'),
(1, '10:00 - 12:00', 'seg', 'TÓPICOS ESPECIAIS EM COMPUTAÇÃO I', 'Ialis Cavalcante', 'reservado'),
(1, '13:30 - 15:30', 'seg', NULL, NULL, 'livre'),
(1, '15:30 - 17:30', 'seg', NULL, NULL, 'livre'),
(1, '18:00 - 20:00', 'seg', 'PRÁTICA INSTRUMENTAL II - VIOLÃO', 'Marcelo Mateus', 'reservado'),
(1, '20:00 - 22:00', 'seg', 'OFICINA DE MÚSICA - VIOLÃO', 'Marcelo Mateus', 'livre'),

(1, '08:00 - 10:00', 'ter', 'REDES DE COMPUTADORES', 'Wendley Sousa', 'reservado'),
(1, '10:00 - 12:00', 'ter', NULL, NULL, 'livre'),
(1, '13:30 - 15:30', 'ter', 'COMPUTAÇÃO GRÁFICA', 'Ialis Cavalcante', 'reservado'),
(1, '15:30 - 17:30', 'ter', 'SISTEMAS EMBARCADOS', 'Jermana Lopes', 'reservado'),
(1, '18:00 - 20:00', 'ter', 'PESQUISA EM MÚSICA', 'João Emanoel', 'reservado'),
(1, '20:00 - 22:00', 'ter', 'PESQUISA EM MÚSICA', 'João Emanoel', 'reservado'),

(1, '08:00 - 10:00', 'qua', NULL, NULL, 'livre'),
(1, '10:00 - 12:00', 'qua', 'TÓPICOS ESPECIAIS EM COMPUTAÇÃO I', 'Ialis Cavalcante', 'livre'),
(1, '13:30 - 15:30', 'qua', 'ARQUITETURA E ORGANIZAÇÃO DE COMPUTADORES', 'Wendley Sousa', 'reservado'),
(1, '15:30 - 17:30', 'qua', 'ENGENHARIA DE SOFTWARE', 'Evilásio Júnior', 'reservado'),
(1, '18:00 - 20:00', 'qua', 'PRÁTICA INSTRUMENTAL Ii - VIOLÃO', 'Marcelo Mateus', 'reservado'),
(1, '20:00 - 22:00', 'qua', 'OFICINA DE MÚSICA - VIOLÃO', 'Marcelo Mateus', 'reservado'),

(1, '08:00 - 10:00', 'qui', 'MICROPROCESSADORES', 'Marcelo Simões', 'reservado'),
(1, '10:00 - 12:00', 'qui', NULL, NULL, 'livre'),
(1, '13:30 - 15:30', 'qui', 'COMPUTAÇÃO GRÁFICA', 'Ialis Cavalcante', 'reservado'),
(1, '15:30 - 17:30', 'qui', 'SISTEMAS EMBARCADOS', 'Jermana Lopes', 'reservado'),
(1, '18:00 - 20:00', 'qui', NULL, NULL, 'livre'),
(1, '20:00 - 22:00', 'qui', NULL, NULL, 'livre'),

(1, '08:00 - 10:00', 'sex', 'MICROPROCESSADORES', 'Marcelo Simões', 'reservado'),
(1, '10:00 - 12:00', 'sex', 'MICROPROCESSADORES', 'Marcelo Simões', 'reservado'),
(1, '13:30 - 15:30', 'sex', NULL, NULL, 'livre'),
(1, '15:30 - 17:30', 'sex', 'ENGENHARIA DE SOFTWARE', 'Evilásio Júnior', 'livre'),
(1, '18:00 - 20:00', 'sex', NULL, NULL, 'livre'),
(1, '20:00 - 22:00', 'sex', 'METODOLOGIA EM EDUCAÇÃO MUSICAL', 'Regis Luis', 'reservado');

INSERT INTO LabSchedule (lab_id, time, day_of_week, discipline, teacher, status) VALUES 
-- Horário Lab. de Simulações
(2, '08:00 - 10:00', 'seg', NULL, NULL, 'livre'),
(2, '10:00 - 12:00', 'seg', NULL, NULL, 'livre'),
(2, '13:30 - 15:30', 'seg', 'ARQUITETURA E ORGANIZAÇÃO DE COMPUTADORES', 'Wendley Sousa', 'reservado'),
(2, '15:30 - 17:30', 'seg', NULL, NULL, 'livre'),
(2, '18:00 - 20:00', 'seg', NULL, NULL, 'livre'),
(2, '20:00 - 22:00', 'seg', NULL, NULL, 'livre'),

(2, '08:00 - 10:00', 'ter', 'TECNOLOGIAS WEB', 'Thiago Iachiley', 'reservado'),
(2, '10:00 - 12:00', 'ter', NULL, NULL, 'livre'),
(2, '13:30 - 15:30', 'ter', 'TECNOLOGIAS WEB II', 'Thiago Iachiley', 'reservado'),
(2, '15:30 - 17:30', 'ter', 'TÉCNICAS DE PROGRAMAÇÃO', 'Thiago Iachiley', 'reservado'),
(2, '18:00 - 20:00', 'ter', NULL, NULL, 'livre'),
(2, '20:00 - 22:00', 'ter', NULL, NULL, 'livre'),

(2, '08:00 - 10:00', 'qua', 'PROGRAMAÇÃO COMPUTACIONAL PARA ENGENHARIA', 'Erick Donato', 'reservado'),
(2, '10:00 - 12:00', 'qua', 'PROGRAMAÇÃO COMPUTACIONAL PARA ENGENHARIA', 'Erick Donato', 'reservado'),
(2, '13:30 - 15:30', 'qua', 'DESENHO PARA ENGENHARIA', 'Nilena Dias', 'reservado'),
(2, '15:30 - 17:30', 'qua', 'DESENHO PARA ENGENHARIA', 'Nilena Dias', 'reservado'),
(2, '18:00 - 20:00', 'qua', 'MÉTODOS COMPUTACIONAIS APLICADOS', 'Fernando Mayorga', 'reservado'),
(2, '20:00 - 22:00', 'qua', 'MÉTODOS COMPUTACIONAIS APLICADOS', 'Fernando Mayorga', 'reservado'),

(2, '08:00 - 10:00', 'qui', 'PROGRAMAÇÃO COMPUTACIONAL PARA ENGENHARIA', 'Fernando Rodrigues', 'reservado'),
(2, '10:00 - 12:00', 'qui', 'PROGRAMAÇÃO COMPUTACIONAL PARA ENGENHARIA', 'Fernando Rodrigues', 'reservado'),
(2, '13:30 - 15:30', 'qui', 'TECNOLOGIAS WEB II', 'Thiago Iachiley', 'reservado'),
(2, '15:30 - 17:30', 'qui', 'TÉCNICAS DE PROGRAMAÇÃO', 'Thiago Iachiley', 'reservado'),
(2, '18:00 - 20:00', 'qui', NULL, NULL, 'livre'),
(2, '20:00 - 22:00', 'qui', NULL, NULL, 'livre'),

(2, '08:00 - 10:00', 'sex', 'DESENHO PARA ENGENHARIA', 'Nilena Dias', 'reservado'),
(2, '10:00 - 12:00', 'sex', 'DESENHO PARA ENGENHARIA', 'Nilena Dias', 'reservado'),
(2, '13:30 - 15:30', 'sex', NULL, NULL, 'livre'),
(2, '15:30 - 17:30', 'sex', NULL, NULL, 'livre'),
(2, '18:00 - 20:00', 'sex', NULL, NULL, 'livre'),
(2, '20:00 - 22:00', 'sex', NULL, NULL, 'livre');

-- Inserir dados na tabela Program
INSERT INTO Program (name, version) VALUES 
('Visual Studio Code', '1.85.2'),
('Netbeans', '11'),
('Java', '8'),
('R', '4.3.2'),
('RStudio', '2023.12.0'),
('QGIS', '3.34'),
('GeoDA', '1.20'),
('GeoDaSpace', '1.0'),
('TerraView', '5.0'),
('Dev C++', '5.11'),
('Wireshark', '3.0'),
('MySQL Workbench', '8.0'),
('MySQL Community Edition', '8.0'),
('Stata', '18'),
('Python', '3.11'),
('Musescore', '4.0'),
('PSPP', '1.6.2'),
('PSIM', '9.1'),
('PROTEUS', '8.13'),
('Matlab', 'R2023b'),
('Sublime Text', '3'),
('Arduino IDE', '2.2.1'),
('WinPCap', '4.1.3'),
('Scilab', '6.1.1'),
('Octave', '8.3.0'),
('Autocad', '2024'),
('PyCharm Community', '2023.3'),
('DOSVOX', '4.2'),
('NVDA', '2023.3'),
('NodeJS', '20.10.0'),
('NPM', '10.2.3'),
('Eclipse', '2023-12'),
('Jamovi', '2.3.28'),
('Chrome', '120.0.6099.130'),
('Firefox', '121.0');

-- Inserir dados na tabela Computer para o Laboratório de Informática (Bloco I)
INSERT INTO Computer (lab_id, number_id, property_id, os, cpu, ram, storage, status) VALUES 
(1, 1, '2020004455', 'Ubuntu 18.04.6 LTS', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(1, 2, NULL, 'Ubuntu 18.04.6 LTS', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(1, 3, '2020004458', 'Ubuntu 22.04.4 LTS', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(1, 4, '2020004449', 'Ubuntu 18.04.6 LTS', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(1, 5, '2020004456', 'Ubuntu 18.04.6 LTS', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(1, 6, '2020004450', 'Ubuntu 22.04.4 LTS', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(1, 7, '2020004452', 'Lubuntu 18.04.6 LTS', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(1, 8, '2020004454', 'Ubuntu 20.04.6 LTS', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(1, 9, '2020004453', 'Ubuntu 18.04.6 LTS', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(1, 10, '285566', 'Linux Mint 21.2 Cinanmona', 'Intel Core 2 Quad Q9650', '4GB', '250GB', 'fora de servico'),
(1, 11, '264592', 'Linux Mint 21.2 Cinanmona', 'Intel Core 2 Duo E7500', '2GB', '250GB', 'fora de servico'),
(1, 12, '265828', 'Linux Mint 21.2 Cinanmona', 'Intel Core 2 Quad Q9650', '4GB', '250GB', 'disponivel');

-- Inserir dados na tabela Computer para o Laboratório de Simulações Numéricas
INSERT INTO Computer (lab_id, number_id, property_id, os, cpu, ram, storage, status) VALUES 
(2, 1, '2024001330', 'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 2, '2024001356', 'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 3, '2024001336', 'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 4, '2024001319', 'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 5, '2024001224', 'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 6, '2024001214', 'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 7, '2024001358', 'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 8, '2024001220', 'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 9, '2024001345', 'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 10, '2024001326', 'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 11, '2024001323', 'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 12, '2024001347', 'Windows 11', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 13, '2024001327', 'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 14, '2024001338', 'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 15, '2024001360', 'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 16, '2024001324', 'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 17, '2024001340', 'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 18, '2024001328', 'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 19, '2024001361', 'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 20, '2024001331','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 21, '2024001349','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 22,'2024001341' ,'Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 23, '2024001321','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 24, '2024001216','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 25, '2024001337','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 26, '2024001353','Windows 11', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 27, '2024001339','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 28, '2024001219','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 29, '2024001325','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 30, '2024001335','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 31, '2024001348','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 32, '2024001346','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 33, '2024001350','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 34, '2024001225','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 35, '2024001222','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 36, '2024001212','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 37, '2024001334','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 38, '2024001218','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 39, '2024001333','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(2, 40, '2024001217','Windows 10', 'Intel Core i5', '8GB', '500GB', 'disponivel');

-- Inserir dados na tabela Computer para o Laboratório de Programação Computacional
INSERT INTO Computer (lab_id, number_id, property_id, os, cpu, ram, storage, status) VALUES 
(3, 1,'346813','Windows 8.1 Pro / Ubuntu 20.04.6 LTS', 'Intel Core i5-3470', '8GB', '365GB', 'disponivel'),
(3, 2,'346777','Windows 7 Professional / Linux Mint 19.3 Tricia', 'Intel Core i5-3470', '8GB', '353GB', 'disponivel'),
(3, 3,'346785','Windows 8.1 Pro / Linux Mint 19.2 Tina', 'Intel Core i5-3470', '8GB', '372GB', 'disponivel'),
(3, 4,'346765','Windows 8.1 Pro / Linux Mint 19.2 Tina', 'Intel Core i5-3470', '8GB', '263GB', 'disponivel'),
(3, 5,'346750','Windows 8.1 Pro / Linux Mint 19.2 Tina', 'Intel Core i5-3470', '8GB', '262GB', 'disponivel'),
(3, 6,'346783','Windows 8.1 Pro / Linux Mint 19.2 Tina', 'Intel Core i5-3470', '8GB', '260GB', 'disponivel'),
(3, 7,'346767','Windows 10 Pro / Linux Mint 19.2 Cinnamon', 'Intel Core i5-3470', '8GB', '244GB', 'disponivel'),
(3, 8,'346740','Windows 8.1 Pro', 'Intel Core i5-3470', '8GB', '148GB', 'disponivel'),
(3, 9,'346795','Windows 8.1 Pro / Linux Mint 19.2 Cinnamon', 'Intel Core i5-3470', '8GB', '372GB', 'disponivel'),
(3, 10,'346727','Windows 8.1 Pro / Linux Mint 19.2 Tina', 'Intel Core i5-3470', '8GB', '372GB', 'disponivel'),
(3, 11,'346814','Windows 8.1 Pro / Linux Mint 19.3 Tricia', 'Intel Core i5-3470', '8GB', '279GB', 'disponivel'),
(3, 12,'346731','Windows 8.1 Pro / Linux Mint 19.2 Tina', 'Intel Core i5-3470', '8GB', '259GB', 'disponivel'),
(3, 13,'346790','Windows 8.1 Pro / Linux Mint 19.2 Tina', 'Intel Core i5-3470', '8GB', '259GB', 'disponivel'),
(3, 14,'346812','Windows 8.1 Pro / Linux Mint 19.2 Tina', 'Intel Core i5-3470', '8GB', '373GB', 'disponivel'),
(3, 15,'346723','Windows 8.1 Pro / Linux Mint 19.2 Tina', 'Intel Core i5-3470', '8GB', '373GB', 'disponivel'),
(3, 16,'346756','Windows 8.1 Pro / Linux Mint 19.2 Cinnamon', 'Intel Core i5-3470', '8GB', '372GB', 'disponivel'),
(3, 17,'346804','Windows 8.1 Pro / Linux Mint 19.2 Cinnamon', 'Intel Core i5-3470', '8GB', '259GB', 'disponivel'),
(3, 18,'346805','Windows 8.1 Pro / Ubuntu 20.04.4 LTS', 'Intel Core i5-3470', '8GB', '247GB', 'fora de servico'),
(3, 19,'346771','Windows 8.1 Pro / Linux Mint 19.2 Tina', 'Intel Core i5-3470', '8GB', '372GB', 'disponivel'),
(3, 20,'346732','Windows 8.1 Pro / Linux Mint 19.3 Tricia', 'Intel Core i5-3470', '8GB', '290GB', 'disponivel'),
(3, 21, NULL,'Windows 7 Professional / Linux Mint 21.02 Cinanmon', 'Intel Core 2 Quad Q9650', '4GB', '250GB', 'disponivel'),
(3, 22,'346766','Ubuntu 22.04.4 LTS', 'Intel Core i5-3470', '8GB', '500GB', 'fora de servico'),
(3, 23,'346772','Windows 8.1 Pro / Linux Mint 19.3 Tricia', 'Intel Core i5-3470', '8GB', '278GB', 'disponivel'),
(3, 24,'346798','Windows 8.1 Pro / Linux Mint 19.2 Tina', 'Intel Core i5-3470', '8GB', '260GB', 'fora de servico'),
(3, 25,'346781','Windows 8.1 Pro / Linux Mint 19.2 Tina', 'Intel Core i5-3470', '8GB', '370GB', 'disponivel'),
(3, 26,'346725','Windows 8.1 Pro / Linux Mint 19.3 Tricia', 'Intel Core i5-3470', '8GB', '278GB', 'disponivel'),
(3, 27,'346728','Windows 8.1 Pro / Linux Mint 19.2 Tina', 'Intel Core i5-3470', '8GB', '259GB', 'disponivel'),
(3, 28,'346816','Windows 8.1 Pro / Linux Mint 19.2 Tina', 'Intel Core i5-3470', '8GB', '259GB', 'disponivel'),
(3, 29,'346806','Windows 8.1 Pro / Linux Mint 19.2 Cinnamon', 'Intel Core i5-3470', '8GB', '366GB', 'disponivel'),
(3, 30,'346787','Windows 8.1 Pro / Linux Mint 19.2 Cinnamon', 'Intel Core i5-3470', '8GB', '260GB', 'disponivel');

-- Inserir dados na tabela Computer para o Laboratório de Radiologia
INSERT INTO Computer (lab_id, number_id, property_id, os, cpu, ram, storage, status) VALUES 
(4, 1,'313099','Windows', 'Intel Core i5', '8GB', '500GB', 'fora de servico'),
(4, 2,'313065','Windows', 'Intel Core i5', '8GB', '500GB', 'fora de servico'),
(4, 3,'313106','Windows', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(4, 4,'313086','Windows', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(4, 5,'313061','Windows', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(4, 6,'313108','Windows', 'Intel Core i5', '8GB', '500GB', 'fora de servico'),
(4, 7,'313060','Windows', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(4, 8,'313102','Windows', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(4, 9,'313083','Windows', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(4, 10,'313096','Windows', 'Intel Core i5', '8GB', '500GB', 'fora de servico'),
(4, 11,'313100','Windows', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(4, 12,'313063','Windows', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(4, 13,'313092','Windows', 'Intel Core i5', '8GB', '500GB', 'fora de servico'),
(4, 14,'313079','Windows', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(4, 15,'313075','Windows', 'Intel Core i5', '8GB', '500GB', 'disponivel'),
(4, 16,'313087','Windows', 'Intel Core i5', '8GB', '500GB', 'fora de servico');

-- Inserir relacionamentos entre computadores e programas (ComputerProgram)
-- Laboratório de Informática
INSERT INTO ComputerProgram (computer_id, program_id) VALUES 
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 34),
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 34),
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 34),
(4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 34),
(5, 1), (5, 2), (5, 3), (5, 4), (5, 5), (5, 34),
(6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (6, 34),
(7, 1), (7, 2), (7, 3), (7, 4), (7, 5), (7, 34),
(8, 1), (8, 2), (8, 3), (8, 4), (8, 5), (8, 34),
(9, 1), (9, 2), (9, 3), (9, 4), (9, 5), (9, 34),
(10, 1), (10, 2), (10, 3), (10, 4), (10, 5), (10, 34),
(11, 1), (11, 2), (11, 3), (11, 4), (11, 5), (11, 34),
(12, 1), (12, 2), (12, 3), (12, 4), (12, 5), (12, 34);

-- Laboratório de Simulações Numéricas
INSERT INTO ComputerProgram (computer_id, program_id) VALUES 
(13, 1), (13, 4), (13, 5), (13, 15), (13, 24), (13, 32), (13, 33),
(14, 1), (14, 4), (14, 5), (14, 15), (14, 24), (14, 32), (14, 33),
(15, 1), (15, 4), (15, 5), (15, 15), (15, 24), (15, 32), (15, 33),
(16, 1), (16, 4), (16, 5), (16, 15), (16, 24), (16, 32), (16, 33),
(17, 1), (17, 4), (17, 5), (17, 15), (17, 24), (17, 32), (17, 33),
(18, 1), (18, 4), (18, 5), (18, 15), (18, 24), (18, 32), (18, 33),
(19, 1), (19, 4), (19, 5), (19, 15), (19, 24), (19, 32), (19, 33),
(20, 1), (20, 4), (20, 5), (20, 15), (20, 24), (20, 32), (20, 33),
(21, 1), (21, 4), (21, 5), (21, 15), (21, 24), (21, 32), (21, 33),
(22, 1), (22, 4), (22, 5), (22, 15), (22, 24), (22, 32), (22, 33),
(23, 1), (23, 4), (23, 5), (23, 15), (23, 24), (23, 32), (23, 33),
(24, 1), (24, 4), (24, 5), (24, 15), (24, 24), (24, 32), (24, 33),
(25, 1), (25, 4), (25, 5), (25, 15), (25, 24), (25, 32), (25, 33),
(26, 1), (26, 4), (26, 5), (26, 15), (26, 24), (26, 32), (26, 33),
(27, 1), (27, 4), (27, 5), (27, 15), (27, 24), (27, 32), (27, 33),
(28, 1), (28, 4), (28, 5), (28, 15), (28, 24), (28, 32), (28, 33),
(29, 1), (29, 4), (29, 5), (29, 15), (29, 24), (29, 32), (29, 33),
(30, 1), (30, 4), (30, 5), (30, 15), (30, 24), (30, 32), (30, 33),
(31, 1), (31, 4), (31, 5), (31, 15), (31, 24), (31, 32), (31, 33),
(32, 1), (32, 4), (32, 5), (32, 15), (32, 24), (32, 32), (32, 33),
(33, 1), (33, 4), (33, 5), (33, 15), (33, 24), (33, 32), (33, 33),
(34, 1), (34, 4), (34, 5), (34, 15), (34, 24), (34, 32), (34, 33),
(35, 1), (35, 4), (35, 5), (35, 15), (35, 24), (35, 32), (35, 33),
(36, 1), (36, 4), (36, 5), (36, 15), (36, 24), (36, 32), (36, 33),
(37, 1), (37, 4), (37, 5), (37, 15), (37, 24), (37, 32), (37, 33),
(38, 1), (38, 4), (38, 5), (38, 15), (38, 24), (38, 32), (38, 33),
(39, 1), (39, 4), (39, 5), (39, 15), (39, 24), (39, 32), (39, 33),
(40, 1), (40, 4), (40, 5), (40, 15), (40, 24), (40, 32), (40, 33),
(41, 1), (41, 4), (41, 5), (41, 15), (41, 24), (41, 32), (41, 33),
(42, 1), (42, 4), (42, 5), (42, 15), (42, 24), (42, 32), (42, 33),
(43, 1), (43, 4), (43, 5), (43, 15), (43, 24), (43, 32), (43, 33),
(44, 1), (44, 4), (44, 5), (44, 15), (44, 24), (44, 32), (44, 33),
(45, 1), (45, 4), (45, 5), (45, 15), (45, 24), (45, 32), (45, 33),
(46, 1), (46, 4), (46, 5), (46, 15), (46, 24), (46, 32), (46, 33),
(47, 1), (47, 4), (47, 5), (47, 15), (47, 24), (47, 32), (47, 33),
(48, 1), (48, 4), (48, 5), (48, 15), (48, 24), (48, 32), (48, 33);

-- Inserir dados na tabela LabProgramRequest
INSERT INTO LabProgramRequest (lab_id, requested_by, program_name, version, status, request_date) VALUES 
(1, 11, 'GeoDA', '1.20', 'instalado', '2025-01-15'),
(2, 14, 'Jamovi', '2.3.28', 'instalado', '2025-02-20'),
(3, 13, 'QGIS', '3.34', 'instalado', '2025-03-10'),
(1, 11, 'PROTEUS', '8.13', 'negado', '2025-04-05'),
(2, 14, 'Matlab', 'R2023b', 'pendente', '2025-05-12');

-- Inserir dados na tabela ComputerIssue
INSERT INTO ComputerIssue (computer_id, reported_by, description, date_reported, status, component) VALUES 
(10, 15, 'Computador não liga, fica bipando', '2025-05-19', 'resolvido', 'gabinete'),
(11, 16, 'Computador reiniciando direto', '2025-05-19', 'em andamento', 'gabinete'),
(18, 15, 'Computador não está ligando', '2025-04-28', 'aberto', 'gabinete'),
(19, 6, 'Internet lenta em um dos PCs', '2025-04-24', 'em andamento', 'internet'),
(24, 7, 'Computador com problemas de rede', '2025-04-28', 'aberto', 'internet');

-- Inserir dados na tabela MaintenanceRequest
INSERT INTO MaintenanceRequest (computer_id, description, requested_by, status, created_at) VALUES 
(10, 'Trocar fonte de alimentação', 1, 'concluido', '2025-05-19 14:30:00'),
(11, 'Verificar problema de reinicialização', 2, 'em reparo', '2025-05-19 14:35:00'),
(18, 'Diagnosticar problema de não ligar', 6, 'pendente', '2025-04-28 17:05:00'),
(45, 'Windows corrompido - necessária reinstalação', 10, 'pendente', '2025-01-06 14:15:00'),
(50, 'Windows corrompido - necessária reinstalação', 10, 'pendente', '2025-01-06 14:20:00');
