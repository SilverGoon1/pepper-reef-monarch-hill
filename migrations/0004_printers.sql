alter table shop_settings add column if not exists printers jsonb not null default '[]'::jsonb;
alter table shop_settings add column if not exists receipt_options jsonb not null default '{
  "taxId":"",
  "footer":"Thank you for dining with us. Keep this receipt for your records.",
  "autoPrintOnAccept":true
}'::jsonb;

alter table orders add column if not exists accepted_at timestamptz;
