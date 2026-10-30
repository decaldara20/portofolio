create table if not exists public.ngl_messages (
  id uuid primary key default gen_random_uuid(),
  sender_name text not null check (char_length(btrim(sender_name)) between 1 and 40),
  message text not null check (char_length(btrim(message)) between 1 and 400),
  is_anonymous boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.ngl_messages enable row level security;

grant select, insert on table public.ngl_messages to anon, authenticated;

drop policy if exists "Public can read NGL messages" on public.ngl_messages;
create policy "Public can read NGL messages"
  on public.ngl_messages
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Public can send NGL messages" on public.ngl_messages;
create policy "Public can send NGL messages"
  on public.ngl_messages
  for insert
  to anon, authenticated
  with check (
    char_length(btrim(sender_name)) between 1 and 40
    and char_length(btrim(message)) between 1 and 400
  );