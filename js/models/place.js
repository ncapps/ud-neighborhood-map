define([
  'knockout'
], function(ko) {

  var Place = function(data) {
    var self = this;
    self.name = data.name;
    self.type = ko.observable(data.type);
    self.marker = null;
  };

  return Place;
});
