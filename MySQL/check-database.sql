-- Script for basic database check

drop database round_robin;
create database round_robin;
use round_robin;

select * from experiment;
select * from research_center;
select * from instrument;
select * from measure;
select * from measurement;

delete from measurement where id = "7";

select * from parameter;
select * from contactData;
select * from result;
select * from result_file;
select * from research_center;
select * from experiment_research_center;
select * from email_code;

insert into measure (name, instructions, experiment_fk) values ('Dureza', 'Probar a 50 grados', 2);
insert into measure (name, instructions, experiment_fk) values ('Reflectancia', 'Probar el angula maximo de reflectancia', 2);
insert into measurement (name, research_center_fk, measure_fk) values ('Atlantico Reflectancia', 2, 4);
insert into measurement (name, research_center_fk, measure_fk) values ('Atlantico Dureza', 2, 2);
insert into result (name, comments, satisfactory, measurement_fk) values ('Resultado de la prueba 1', 'La muestra mostro debilidad a mas de 130 grados', true, 1);


#delete from result where id = "1";
#delete from research_center where id = 4;
#delete from experiment_research_center where research_center_fk = 4;
#delete from email_code where id=2;









