-- Script for basic database check

drop database round_robin;
create database round_robin;
use round_robin;

select * from experiment;
select * from research_center;
select * from instrument;
select * from measure;
select * from measurement;
select * from parameter;
select * from research_center;
select * from contactData;
select * from result;
select * from sample;
select * from experiment_research_center;

insert into research_center (address, email, city, country, duty_manager_name, instructions, name) values ('Los castro sn', 'UC@gmail.com', 'Santander', 'Esp', 'Jesus', 'no se', 'UC');
insert into research_center (address, email, city, country, duty_manager_name, instructions, name) values ('PCTCAN', 'atlantico@gmail.com', 'Santander', 'Esp', 'Javier', 'no se', 'Universidad del Atlantico');
insert into research_center (address, email, city, country, duty_manager_name, instructions, name) values ('Gran Via', 'madrid@gmail.com', 'Madrid', 'Esp', 'Alicia', 'no se', 'Universidad de Madrid');

#insert into research_center (address, city, country, duty_manager_name, instructions, name) values ('Los castro sn', 'Santander', 'Esp', 'Jesus', 'no se', 'UC');
#insert into research_center (address, city, country, duty_manager_name, instructions, name) values ('PCTCAN', 'Santander', 'Esp', 'Javier', 'no se', 'Universidad del Atlantico');
#insert into research_center (address, city, country, duty_manager_name, instructions, name) values ('Gran Via', 'Madrid', 'Esp', 'Alicia', 'no se', 'Universidad de Madrid');


insert into experiment (name, description, creator_center_fk) values ('First Ever Experiment', 'experiment to check if database works', 1);
insert into experiment (name, description, creator_center_fk) values ('Second Experiment', 'experiment to check if i can return 2 experiments at the time', 1);

insert into experiment_research_center (research_center_fk, experiment_fk) values (2, 1);
insert into experiment_research_center (research_center_fk, experiment_fk) values (2, 2);
insert into experiment_research_center (research_center_fk, experiment_fk) values (3, 1);
insert into experiment_research_center (research_center_fk, experiment_fk) values (1, 2);







