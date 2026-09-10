alter table profiles add column if not exists address_line text not null default '';
alter table profiles add column if not exists city text not null default '';
alter table profiles add column if not exists zip text not null default '';
