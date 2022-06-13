use round_robin;

insert into research_center (address, email, city, country, duty_manager_name, instructions, name) values ('Los castro sn', 'UC@gmail.com', 'Santander', 'Esp', 'Jesus', 'no se', 'UC');
insert into research_center (address, email, city, country, duty_manager_name, instructions, name) values ('PCTCAN', 'atlantico@gmail.com', 'Santander', 'Esp', 'Javier', 'no se', 'Universidad del Atlantico');
insert into research_center (address, email, city, country, duty_manager_name, instructions, name) values ('Gran Via', 'madrid@gmail.com', 'Madrid', 'Esp', 'Alicia', 'no se', 'Universidad de Madrid');

insert into experiment (name, description, creator_center_fk, status) values 
('Resistencia del Carbono', 'Se quiere probar cual es la maxima resistencia que soporta el carbono bajo diferentes situaciones', 1, 0);
insert into experiment (name, description, creator_center_fk, status) values 
('Analisis del Diamante', 'Se quiere probar cual es la maxima resistencia que soporta el diamante bajo diferentes situaciones', 1, 0);
insert into experiment (name, description, creator_center_fk, status) values 
('Analisis del Uranio', 'Se quiere probar cual es la maxima resistencia que soporta el uranio bajo diferentes situaciones', 1, 0);
insert into experiment (name, description, creator_center_fk, status) values 
('Analisis de la fibra de vidrio', 'Se quiere probar cual es la maxima resistencia que soporta la fibra de vidrio bajo diferentes situaciones', 2, 0);
insert into experiment (name, description, creator_center_fk, status) values 
('Analisis del Oro oxidado', 'Se quiere probar cual es la maxima resistencia que soporta el oro oxidado bajo diferentes situaciones', 3, 0);


#Add participants
insert into experiment_research_center (research_center_fk, experiment_fk) values (2, 1);
insert into experiment_research_center (research_center_fk, experiment_fk) values (3, 1);
insert into experiment_research_center (research_center_fk, experiment_fk) values (2, 2);
insert into experiment_research_center (research_center_fk, experiment_fk) values (3, 2);
insert into experiment_research_center (research_center_fk, experiment_fk) values (2, 3);
insert into experiment_research_center (research_center_fk, experiment_fk) values (2, 5);



insert into measure (name, instructions, experiment_fk) values ('Dureza del Carbono', 'Someter a rayaduras con objetos de dureza exponencial', 1);
insert into measure (name, instructions, experiment_fk) values ('Presion del Carbono', 'Probar el angula maximo de reflectancia', 1);
insert into measure (name, instructions, experiment_fk) values ('Resistencia al calor del Carbono', 'Averiguar la temperatura maxima antes de derretirse', 1);

insert into measure (name, instructions, experiment_fk) values ('Dureza del Diamante', 'Someter a rayaduras con objetos de dureza exponencial', 2);
insert into measure (name, instructions, experiment_fk) values ('Presion del Diamante', 'Probar el angula maximo de reflectancia', 2);
insert into measure (name, instructions, experiment_fk) values ('Resistencia al calor del Diamante', 'Averiguar la temperatura maxima antes de derretirse', 2);



insert into measurement (name, research_center_fk, measure_fk) values ('Atlantico Dureza del Carbono', 2, 1);
insert into measurement (name, research_center_fk, measure_fk) values ('Atlantico Presion del Carbono', 2, 2);
insert into measurement (name, research_center_fk, measure_fk) values ('Atlantico Dureza del Diamante', 2, 4);

insert into measurement (name, research_center_fk, measure_fk) values ('Madrid Presion del Carbono', 3, 2);
insert into measurement (name, research_center_fk, measure_fk) values ('Madrid Presion del Diamante', 3, 5);



insert into sample (material_name, code, composition, description, measurement_fk, experiment_fk) values
('Carbono', 'Carbono 1', 'C', 'Descripcion del carbono', 1, 1);
insert into sample (material_name, code, composition, description, measurement_fk, experiment_fk) values
('Carbono', 'Carbono 2', 'C', 'Descripcion del carbono', 2, 1);
insert into sample (material_name, code, composition, description, measurement_fk, experiment_fk) values
('Diamante', 'Diamante 1', 'COF-1', 'Descripcion del diamante', 3, 2);
insert into sample (material_name, code, composition, description, measurement_fk, experiment_fk) values
('Diamante', 'Diamante 2', 'COF-1', 'Descripcion del diamante', 4, 2);


update measure set sample_fk='1' where id='1';
update measure set sample_fk='2' where id='2';


#insert into result (name, comments, satisfactory, measurement_fk) values ('Resultado de la prueba 1', 'La muestra mostro debilidad a mas de 130 grados', true, 1);
#select * from experiment;
#select * from research_center;
#select * from experiment_research_center;