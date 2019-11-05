create database if not exists `project_management`;

use `project_management`;

create table if not exists `customers`(
	`id` int not null auto_increment primary key,
    `name` varchar(100) not null,
    `phone_number` varchar(50) not null,
    `email` varchar(100) not null,
    `address` varchar(500) not null,
    `hidden` boolean default false
) engine = InnoDB;

create table if not exists `projects`(
	`id` int not null auto_increment primary key,
    `customer_id` int not null,
    `name` varchar(150) not null,
    `status` varchar(100) not null,
    `start_time` timestamp not null,
    `end_time` timestamp,
    `service_detail` json,
    `hidden` boolean default false
) engine = InnoDB;

alter table `projects` add constraint fk_projects_customers foreign key(`customer_id`) references `customers`(`id`);

create table if not exists `members`(
	`id` int not null auto_increment primary key,
    `staff_code` varchar(50) unique not null,
    `full_name` varchar(100) not null,
    `phone_number` varchar(50) not null,
    `email` varchar(100) unique not null,
    `permission` varchar(50) not null default 'view',
    `type` varchar(50) not null default 'normal',
    `access_token` text,
    `refresh_token` text,
    `last_auth` timestamp,
	`hidden` boolean default false
) engine = InnoDB;

create table if not exists `project_member` (
	`id` int not null auto_increment primary key,
    `project_id` int not null,
    `staff_code` varchar(100) not null,
    `member_status` varchar(50) not null,
    `role` varchar(50) not null,
    `time_in` timestamp default current_timestamp not null,
    `time_out` timestamp,
    `effort` float not null,
    `hidden` boolean default false
) engine = InnoDB;

alter table `project_member` add constraint fk_projectMember_projects foreign key(`project_id`) references `projects`(`id`);
alter table `project_member` add constraint fk_projectMember_members foreign key(`staff_code`) references `members`(`staff_code`);
alter user 'root'@'localhost' identified with mysql_native_password BY '19022018';

-- drop database `project_management`;

