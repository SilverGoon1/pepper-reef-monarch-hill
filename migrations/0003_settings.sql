alter table shop_settings add column if not exists tax_rate numeric not null default 6.625;
alter table shop_settings add column if not exists prep_minutes integer not null default 25;
alter table shop_settings add column if not exists delivery_minutes integer not null default 40;
alter table shop_settings add column if not exists weekly_hours jsonb not null default '{
  "sun":{"closed":false,"open":"11:00","close":"20:00"},
  "mon":{"closed":false,"open":"11:00","close":"20:00"},
  "tue":{"closed":false,"open":"11:00","close":"20:00"},
  "wed":{"closed":false,"open":"11:00","close":"20:00"},
  "thu":{"closed":false,"open":"11:00","close":"20:00"},
  "fri":{"closed":false,"open":"11:00","close":"20:00"},
  "sat":{"closed":false,"open":"11:00","close":"20:00"}
}'::jsonb;
alter table shop_settings add column if not exists tagline text not null default 'Egg Harbor Township, New Jersey';
alter table shop_settings add column if not exists show_mark boolean not null default true;

alter table orders add column if not exists tax numeric not null default 0;
