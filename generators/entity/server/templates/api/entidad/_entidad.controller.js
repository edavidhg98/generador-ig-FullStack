'use strict';
<%
  let finalLength = attributes.length - 1;
%>const repository = require('./<%= entityName.kebab  %>.repository');

function getAll(req, res) {
  repository.get()
    .then(<%= entityName.camel %>s => {
      res.json(<%= entityName.camel %>s);
    })
    .catch(handleError(res));
}

function getById(req, res) {
  const id = req.params.id;
  repository.getById(id)
    .then(<%= entityName.camel %> => {
      if (!<%= entityName.camel %>) {
        return res.status(404).json({ error: `El recurso con el id ${id} no se encuentra` });
      }
      res.json(<%= entityName.camel %>);
    })
    .catch(handleError(res));
}

function insertEntity(req, res) {
  const _<%= entityName.camel %> = {
  <%_ attributes.forEach((attribute, index) => { _%>
    <%= attribute.name %>: req.body.<%= attribute.name %>,
  <%_ }); _%>
  <%_ for (let manyToOneRelationShip of manyToOneRelationShips) { _%>
    <%= manyToOneRelationShip.fieldName %>: req.body.<%= manyToOneRelationShip.fieldName %>,
  <%_ } _%>
  };

  repository.add(_<%= entityName.camel %>)
    .then(<%= entityName.camel %> => {
      res.status(201).json(<%= entityName.camel %>);
    })
    .catch(handleError(res));
}

function updateEntity(req, res) {
  const id = req.params.id;
  const _<%= entityName.camel %> = {
  <%_ attributes.forEach((attribute, index) => { _%>
    <%= attribute.name %>: req.body.<%= attribute.name %>,
  <%_ }); _%>
  <%_ for (let manyToOneRelationShip of manyToOneRelationShips) { _%>
    <%= manyToOneRelationShip.fieldName %>: req.body.<%= manyToOneRelationShip.fieldName %>,
  <%_ } _%>
  };

  repository.update(id, _<%= entityName.camel %>)
    .then(<%= entityName.camel %> => {
      if (!<%= entityName.camel %>) {
        return res.status(404).json({ error: `El recurso con el id ${id} no se encuentra` });
      }
      res.json(<%= entityName.camel %>);
    })
    .catch(handleError(res));
}

function deleteEntity(req, res) {
  const id = req.params.id;
  repository.remove(id)
    .then(<%= entityName.camel %> => {
      if (!<%= entityName.camel %>) {
        return res.status(404).json({ error: `El recurso con el id ${id} no se encuentra` });
      }
      res.status(204).json();
    })
    .catch(handleError(res));
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ msg: `Error al realizar la petición ${err}` });
    } else {
      res.status(statusCode).json({ msg: `Ocurrión un error en el servidor ${err}` });
    }
  };
}

module.exports = {
  getAll,
  getById,
  insertEntity,
  updateEntity,
  deleteEntity
}
