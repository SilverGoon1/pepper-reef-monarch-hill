create table if not exists profiles (
  user_id text primary key,
  role text not null default 'customer',
  phone text,
  display_name text,
  totp_secret text,
  totp_enabled boolean not null default false,
  points integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists shop_settings (
  id integer primary key default 1,
  vacation_on boolean not null default false,
  vacation_message text not null default 'We are closed for vacation. See you soon.',
  vacation_until text,
  payment_placeholder text not null default 'Card payments are coming soon. Pay at pickup or on delivery for now.',
  points_per_dollar numeric not null default 1,
  redeem_rate integer not null default 100,
  welcome_bonus integer not null default 50,
  min_order_delivery numeric not null default 15,
  delivery_fee numeric not null default 3.50,
  restaurant jsonb not null default '{}',
  footer text not null default '',
  constraint shop_settings_singleton check (id = 1)
);

insert into shop_settings (id) values (1) on conflict (id) do nothing;

create table if not exists delivery_zones (
  id integer primary key default 1,
  name text not null default 'Delivery area',
  cells jsonb not null default '[]',
  updated_at timestamptz not null default now(),
  updated_by text,
  constraint delivery_zones_singleton check (id = 1)
);

insert into delivery_zones (id) values (1) on conflict (id) do nothing;

create table if not exists menu_categories (
  id text primary key,
  name text not null,
  note text,
  kind text not null,
  icon text,
  sort_order integer not null default 0
);

create table if not exists menu_items (
  id text primary key,
  category_id text not null references menu_categories(id) on delete cascade,
  name text not null,
  description text,
  prices jsonb not null,
  highlight boolean not null default false,
  sort_order integer not null default 0
);

create index if not exists menu_items_category_idx on menu_items (category_id);

create table if not exists orders (
  id text primary key,
  user_id text not null,
  status text not null default 'placed',
  fulfillment text not null default 'pickup',
  notes text,
  address_line text,
  city text,
  zip text,
  lat double precision,
  lng double precision,
  items jsonb not null,
  subtotal numeric not null,
  discount numeric not null default 0,
  delivery_fee numeric not null default 0,
  total numeric not null,
  points_earned integer not null default 0,
  points_spent integer not null default 0,
  payment_method text not null,
  created_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on orders (user_id);
create index if not exists orders_created_at_idx on orders (created_at desc);

create table if not exists two_factor_unlocks (
  user_id text primary key,
  expires_at timestamptz not null
);
