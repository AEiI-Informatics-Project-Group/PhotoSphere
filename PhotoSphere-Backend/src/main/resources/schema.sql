create table IF NOT EXISTS app_user (approved boolean not null, day_of_birth date not null, id bigserial not null, email varchar(255) not null, first_name varchar(255) not null, gender varchar(255) not null, last_name varchar(255) not null, role varchar(255) not null check (role in ('USER','ADMIN')), username varchar(255) not null, primary key (id));
create table IF NOT EXISTS auth_user (app_user bigint not null unique, id bigserial not null, password varchar(255) not null, primary key (id));
create table IF NOT EXISTS refresh_token (revoked boolean not null, app_user bigint not null, id bigserial not null, token varchar(10000) not null unique, primary key (id));
-- alter table if exists auth_user add constraint FK491to7thgu5dke17h10c39563 foreign key (app_user) references "app_user";
-- alter table if exists refresh_token add constraint FKsqhr2ooxsl17ilcyuo4gl1r7c foreign key (app_user) references "app_user";