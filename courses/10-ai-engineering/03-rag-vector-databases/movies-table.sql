create extension if not exists vector;

create table if not exists movies (
  id uuid primary key default gen_random_uuid(),
  description text,
  embedding vector(1536) not null,
  created_at timestamp with time zone default now()
);