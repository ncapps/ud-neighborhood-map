define([
	'knockout'
], function (ko) {

  var Place = function(data) {
    var self = this;
    self.title = ko.observable(data.title);
    self.location = ko.observable(data.location);
    self.type = ko.observable(data.type);
  };

	return Place;
});
