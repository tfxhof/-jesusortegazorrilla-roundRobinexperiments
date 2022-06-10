use round_robin;

insert into research_center (address, email, city, country, duty_manager_name, instructions, name) values ('Los castro sn', 'UC@gmail.com', 'Santander', 'Esp', 'Jesus', 'no se', 'UC');
insert into research_center (address, email, city, country, duty_manager_name, instructions, name) values ('PCTCAN', 'atlantico@gmail.com', 'Santander', 'Esp', 'Javier', 'no se', 'Universidad del Atlantico');
insert into research_center (address, email, city, country, duty_manager_name, instructions, name) values ('Gran Via', 'madrid@gmail.com', 'Madrid', 'Esp', 'Alicia', 'no se', 'Universidad de Madrid');

insert into experiment (name, description, creator_center_fk, status) values ('First Ever Experiment', 'experiment to check if database works', 1, 0);
insert into experiment (name, description, creator_center_fk, status) values ('Second Experiment', 'experiment to check if i can return 2 experiments at the time', 1, 0);

insert into experiment_research_center (research_center_fk, experiment_fk) values (2, 1);
insert into experiment_research_center (research_center_fk, experiment_fk) values (2, 2);
insert into experiment_research_center (research_center_fk, experiment_fk) values (3, 1);
insert into experiment_research_center (research_center_fk, experiment_fk) values (1, 2);

select * from experiment;
select * from research_center;
select * from experiment_research_center;