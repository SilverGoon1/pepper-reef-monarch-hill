alter table shop_settings add column if not exists card_size text not null default 'md';
alter table shop_settings add column if not exists card_bg text not null default 'paper';
