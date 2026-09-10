alter table shop_settings add column if not exists card_desc_color text not null default 'muted';
alter table shop_settings add column if not exists card_price_color text not null default 'ink';
