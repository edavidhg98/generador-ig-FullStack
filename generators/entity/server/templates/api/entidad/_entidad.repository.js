const <%= entityName.pascal %> = require('./<%=  entityName.kebab %>.model');

module.exports = {
  <%_ if(pagination){_%>
    get(query) {
      const PAGE = parseInt(query.page);
      const ELEMENTS_BY_PAGE = parseInt(query.size);
      let TOTAL_ENTITIES = 0;

      return <%= entityName.pascal %>.find().count().then((number) => {
          TOTAL_ENTITIES = number;
          const SKIP_ENTITIES = PAGE * ELEMENTS_BY_PAGE;
          return <%= entityName.pascal %>.find().skip(SKIP_ENTITIES).limit(ELEMENTS_BY_PAGE);
        })
        .then((<%= entityName.camel %>s) => { return { totalCount: TOTAL_ENTITIES, <%= entityName.camel %>s }
    });
  },
  <%_} else if(paginationGlobal){_%>
    get(query) {
      const PAGE = parseInt(query.page);
      const ELEMENTS_BY_PAGE = parseInt(query.size);
      let TOTAL_ENTITIES = 0;

      return <%= entityName.pascal %>.find().count().then((number) => {
          TOTAL_ENTITIES = number;
          const SKIP_ENTITIES = PAGE * ELEMENTS_BY_PAGE;
          return <%= entityName.pascal %>.find().skip(SKIP_ENTITIES).limit(ELEMENTS_BY_PAGE);
        })
        .then((<%= entityName.camel %>s) => { return { totalCount: TOTAL_ENTITIES, <%= entityName.camel %>s }
    });
  },
  <%_} else {_%>
    get(query) {
      const PAGE = parseInt(query.page);
      const ELEMENTS_BY_PAGE = parseInt(query.size);
      let TOTAL_ENTITIES = 0;

      return <%= entityName.pascal %>.find().count().then((number) => {
          TOTAL_ENTITIES = number;
          const SKIP_ENTITIES = PAGE * ELEMENTS_BY_PAGE;
          return <%= entityName.pascal %>.find().skip(SKIP_ENTITIES).limit(ELEMENTS_BY_PAGE);
        })
        .then((<%= entityName.camel %>s) => { return { totalCount: TOTAL_ENTITIES, <%= entityName.camel %>s }
    });
  },
  <%_}_%>
  getById(id) {
    return <%= entityName.pascal %>.findById(id)
          <% manyToOneRelationShips.forEach(relationship => { %>.populate('<%= relationship.entityRef.camel %>')<% }); %>
          <% oneToManyRelationShips.forEach(relationship => { %>.populate('<%= relationship.entityRef.camel %>s')<% }); %>
  },
  add(<%= entityName.camel %>) {
    const _<%= entityName.camel %> = new <%= entityName.pascal %>(<%= entityName.camel %>);
    return _<%= entityName.camel %>.save();
  },
  update(id, <%= entityName.camel %>) {
    return <%= entityName.pascal %>.findByIdAndUpdate(id, <%= entityName.camel %>, { new: true, runValidators: true });
  },
  remove(id) {
    return <%= entityName.pascal %>.findByIdAndRemove(id);
  }
};
