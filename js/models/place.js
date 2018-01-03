define([
	'knockout'
], function (ko) {
	'use strict';

  var Place = function(data) {
  	var self = this;
  	self.title = ko.observable(data.title);
  	self.location = ko.observable(data.location);
  	self.type = ko.observable(data.type);
  	self.id = ko.observable(data.id);
  };

  return Place;
});
