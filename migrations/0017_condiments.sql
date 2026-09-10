alter table menu_items add column if not exists condiments jsonb not null default '[]'::jsonb;
