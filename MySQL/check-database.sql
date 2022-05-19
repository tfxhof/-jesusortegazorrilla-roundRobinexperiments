-- Script for basic database check

drop database round_robin;
create database round_robin;
use round_robin;

select * from experiment;
select * from instrument;
select * from measure;
select * from measurement;
select * from parameter;
select * from research_center;
select * from result;
select * from sample;

insert into experiment (name, description) values ('First Ever Experiment', 'experiment to check if database works');

insert into research_center (address, city, country, duty_manager_name, instructions, name, experiment_fk) 
values ('Los castro sn', 'Santander', 'Esp', 'Jesus', 'no se', 'UC', 1);

update experiment set creator_center_fk='1' where id=1; 





