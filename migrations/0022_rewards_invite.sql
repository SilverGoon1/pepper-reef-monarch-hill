alter table profiles add column if not exists referral_code text;
alter table profiles add column if not exists referred_by text;

create unique index if not exists profiles_referral_code_uidx
  on profiles (referral_code)
  where referral_code is not null and referral_code <> '';

create index if not exists profiles_referred_by_idx on profiles (referred_by);

alter table shop_settings add column if not exists invite_bonus integer not null default 100;
alter table shop_settings add column if not exists invitee_bonus integer not null default 50;

create table if not exists rewards_ledger (
  id text primary key,
  user_id text not null,
  kind text not null,
  points integer not null,
  note text not null default '',
  order_id text,
  created_at timestamptz not null default now()
);

create index if not exists rewards_ledger_user_idx on rewards_ledger (user_id, created_at desc);
