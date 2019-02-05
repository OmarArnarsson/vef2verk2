CREATE TABLE applications (
    id serial primary key,
    Nafn varchar(64) not null,
    Netfang varchar(64) not null,
    Sími  int,
    Texti varchar(1000),
    Starf varchar(16),
    processed boolean default false,
    created timestamp with time zone not null default current_timestamp,
    updated timestamp with time zone not null default current_timestamp
);
