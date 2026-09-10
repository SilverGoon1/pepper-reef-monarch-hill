alter table shop_settings add column if not exists admin_totp_required boolean not null default false;
