create table if not exists bot_agents (
  id text primary key,
  name text not null unique,
  role text not null,
  token_hash text not null unique,
  scopes text[] not null default '{}',
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  last_used_at timestamptz,
  expires_at timestamptz,
  created_by text
);

create index if not exists bot_agents_enabled_idx on bot_agents (enabled);

create table if not exists bot_audit (
  id text primary key,
  agent_id text,
  path text not null,
  status integer not null,
  ip text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists bot_audit_agent_idx on bot_audit (agent_id, created_at desc);
create index if not exists bot_audit_created_idx on bot_audit (created_at desc);
