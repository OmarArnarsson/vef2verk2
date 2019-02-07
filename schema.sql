CREATE TABLE applications (
    id serial primary key,
    name varchar(64) not null,
    netfang varchar(64) not null,
    simi  int,
    texti varchar(1000),
    starf varchar(16),
    processed boolean default false,
    created timestamp without time zone not null default current_timestamp,
    updated timestamp without time zone not null default current_timestamp
);
