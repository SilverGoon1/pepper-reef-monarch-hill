alter table orders add column if not exists ticket_no integer;
create unique index if not exists orders_ticket_no_uidx on orders (ticket_no);
