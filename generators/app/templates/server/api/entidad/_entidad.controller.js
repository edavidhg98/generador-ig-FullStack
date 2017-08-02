'use strict';
<%
  let attributesKeys = Object.keys(attributes);
  let finalLength = attributesKeys.length;
  let counter;
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
  <% counter = 0; %>
  const _<%= entityName.camel %> = {<%attributesKeys.forEach((attributeKey) => {%>
    <%=attributeKey%>: req.body.<%=attributeKey%><%if(counter++ < finalLength) {%>,<%}%><%});%>
  };

  repository.add(_<%= entityName.camel %>)
    .then(<%= entityName.camel %> => {
      res.status(201).json(<%= entityName.camel %>);
    })
    .catch(handleError(res));
}

function updateEntity(req, res) {
  const id = req.params.id;
  <% counter = 0; %>
  const _<%= entityName.camel %> = {<%attributesKeys.forEach((attributeKey) => {%>
    <%=attributeKey%>: req.body.<%=attributeKey%><%if(counter++ < finalLength) {%>,<%}%><%});%>
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
    res.status(statusCode).json({ msg: `Error al realizar la petición ${err}` });
  };
}

module.exports = {
  getAll,
  getById,
  insertEntity,
  updateEntity,
  deleteEntity
}
