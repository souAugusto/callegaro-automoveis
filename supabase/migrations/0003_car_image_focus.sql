-- Ponto de foco por foto do carro (object-position), pra decidir qual
-- parte da imagem fica visível quando ela é exibida cortada no site.
-- Mapa { url_da_foto: { x, y } }, x/y em porcentagem (0-100).

alter table cars add column if not exists image_focus jsonb not null default '{}'::jsonb;
