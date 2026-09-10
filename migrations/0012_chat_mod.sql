alter table chat_threads add column if not exists staff_note text not null default '';
alter table chat_threads add column if not exists muted boolean not null default false;
alter table chat_threads add column if not exists flagged boolean not null default false;
