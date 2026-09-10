alter table shop_settings add column if not exists card_text_size text not null default 'md';
alter table shop_settings add column if not exists card_text_color text not null default 'ink';
