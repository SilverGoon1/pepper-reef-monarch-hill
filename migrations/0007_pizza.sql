alter table shop_settings add column if not exists xl_enabled boolean not null default false;
alter table shop_settings add column if not exists xl_inches text not null default '18"';
alter table shop_settings add column if not exists xl_price_add numeric not null default 2;
alter table shop_settings add column if not exists topping_price_sm numeric not null default 1.5;
alter table shop_settings add column if not exists topping_price_md numeric not null default 1.75;
alter table shop_settings add column if not exists topping_price_lg numeric not null default 2;
alter table shop_settings add column if not exists topping_price_xl numeric not null default 2.5;
