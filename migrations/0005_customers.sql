alter table orders add column if not exists tip numeric not null default 0;

create table if not exists chat_threads (
  id text primary key,
  user_id text not null,
  status text not null default 'open',
  last_message text not null default '',
  last_at timestamptz not null default now(),
  unread_admin integer not null default 0,
  unread_customer integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists chat_threads_user_idx on chat_threads (user_id);
create index if not exists chat_threads_last_at_idx on chat_threads (last_at desc);

create table if not exists chat_messages (
  id text primary key,
  thread_id text not null references chat_threads(id) on delete cascade,
  sender_id text not null,
  sender_role text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_thread_idx on chat_messages (thread_id, created_at);
