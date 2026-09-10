alter table orders add column if not exists scheduled_for timestamptz;
alter table shop_settings add column if not exists notify_audio text not null default '';

create table if not exists password_reset_codes (
  id text primary key,
  user_id text not null,
  email text not null,
  code_hash text not null,
  salt text not null,
  expires_at timestamptz not null,
  attempts integer not null default 0,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists password_reset_codes_user_idx on password_reset_codes (user_id, created_at desc);
