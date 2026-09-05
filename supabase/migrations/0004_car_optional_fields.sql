-- Câmbio e número de portas passam a ser opcionais no cadastro do carro.
-- O check constraint de transmission já aceita NULL (uma checagem
-- "coluna in (...)" só falha quando o valor não é nulo e não está na
-- lista), então só precisamos remover o not null das duas colunas.

alter table cars alter column transmission drop not null;
alter table cars alter column doors drop not null;
