define([
	'knockout',
  'models/place'
], function (ko, Place) {

// 16 ZOOM for GoogleMaps latlngs

var initialPlaces = [
  {title: 'Dark Horse Coffee Roasters', location: {lat: 32.7471805, lng: -117.1304319}, type: 'Coffee', id: 'dark-horse-coffee-roasters-san-diego-6'},
  {title: 'Communal Coffee', location: {lat: 32.7483084, lng: -117.1391773}, type: 'Coffee'},
  {title: 'Torque Moto Cafe', location: {lat: 32.7444375, lng: -117.1303768}, type: 'Coffee'},
  {title: 'Subterranean Coffee Boutique', location: {lat: 32.746631, lng: -117.130318}, type: 'Coffee'},
  {title: 'URBN North Park', location: {lat: 32.7483445, lng: -117.1273912}, type: 'Pizza'},
  {title: 'Mr. Moto Pizza House', location: {lat: 32.7468262, lng: -117.1297292}, type: 'Pizza'},
  {title: 'Tribute Pizza', location: {lat: 32.7471135, lng: -117.1279531}, type: 'Pizza'}
];

var viewModel = function () {
  var self = this;

  self.placeList = ko.observableArray([]);

  initialPlaces.forEach(function(location) {
    self.placeList.push(new Place(location));
  });

	self.setPlace = function(location) {
		console.log(location.title());
	};

};

  return viewModel;
});
