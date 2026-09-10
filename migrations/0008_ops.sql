alter table profiles add column if not exists banned boolean not null default false;
alter table orders add column if not exists pickup_name text not null default '';
