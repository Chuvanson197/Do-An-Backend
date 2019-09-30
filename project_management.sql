create database if not exists `project_management`;

use `project_management`;

create table if not exists `accounts`(
	`id` int not null auto_increment primary key,
    `username` varchar(100) not null,
    `password` varchar(100) not null,
    `email` varchar(100) not null
) engine = InnoDB;

alter table `accounts` add constraint `uq_username` unique(`username`);
alter table `accounts` add constraint `uq_email` unique(`email`);

create table if not exists `customers`(
	`id` int not null auto_increment primary key,
    `name` varchar(100) not null,
    `phone_number` varchar(11) not null,
    `email` varchar(100) not null,
    `address` varchar(500) not null
) engine = InnoDB;

create table if not exists `projects`(
	`id` int not null auto_increment primary key,
    `customer_id` int not null,
    `name` varchar(150) not null,
    `status` varchar(100) not null,
    `start_time` timestamp not null,
    `end_time` timestamp,
    `service_detail` json
) engine = InnoDB;

alter table `projects` add constraint fk_projects_customers foreign key(`customer_id`) references `customers`(`id`);

create table if not exists `members`(
	`id` int not null auto_increment primary key,
    `staff_code` varchar(50) not null,
    `full_name` varchar(100) not null,
    `phone_number` varchar(11) not null,
    `email` varchar(100) not null
) engine = InnoDB;

alter table `members` add constraint `uq_staff_code` unique(`staff_code`);

create table if not exists `project_member` (
	`id` int not null auto_increment primary key,
    `project_id` int not null,
    `staff_code` varchar(100) not null,
    `member_status` varchar(50) not null,
    `role` varchar(50) not null,
    `time_in` timestamp default current_timestamp not null,
    `time_out` timestamp,
    `effort` float not null
) engine = InnoDB;

alter table `project_member` add constraint fk_projectMember_projects foreign key(`project_id`) references `projects`(`id`);
alter table `project_member` add constraint fk_projectMember_members foreign key(`staff_code`) references `members`(`staff_code`);
alter user 'root'@'localhost' identified with mysql_native_password BY '19022018';
select * from projects;
-- drop database `project_management`;

