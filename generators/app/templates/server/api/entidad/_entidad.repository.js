'use strict';
const <%= entityName.pascal %> = require('./<%=  entityName.kebab %>.model');

module.exports = {
  get: function() {
    return <%= entityName.pascal %>.find();
  },
  getById: function(id) {
    return <%= entityName.pascal %>.findById(id);
  },
  add: function(<%= entityName.camel %>) {
    let _<%= entityName.camel %> = new <%= entityName.pascal %>(<%= entityName.camel %>);
    return _<%= entityName.camel %>.save();
  },
  update: function(id, <%= entityName.camel %>) {
    return <%= entityName.pascal %>.findByIdAndUpdate(id, <%= entityName.camel %>, { new: true });
  },
  remove: function(id) {
    return <%= entityName.pascal %>.findByIdAndRemove(id);
  }
};
