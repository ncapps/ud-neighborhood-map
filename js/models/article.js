define([
	'knockout'
], function (ko) {

var article = function(data) {
  var self = this;
  self.title = ko.observable(data.title);
  self.lat = ko.observable(data.location.lat);
  self.lng = ko.observable(data.location.lng);
};

  return article;
});
