-- Quilometragem passa a ser opcional no cadastro do carro.

alter table cars alter column km drop not null;
