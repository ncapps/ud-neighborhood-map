define([
	'knockout',
	'models/place'
], function (ko, Place) {


// 16 ZOOM for GoogleMaps latlngs
var initialPlaces = [
  {title: 'Dark Horse Coffee Roasters', location: {lat: 32.7471805, lng: -117.1304319}, type: 'Coffee', id: 'dark-horse-coffee-roasters-san-diego-6'},
  {title: 'Communal Coffee', location: {lat: 32.7483084, lng: -117.1391773}, type: 'Coffee', id: ''},
  {title: 'Torque Moto Cafe', location: {lat: 32.7444375, lng: -117.1303768}, type: 'Coffee', id: ''},
  {title: 'Subterranean Coffee Boutique', location: {lat: 32.746631, lng: -117.130318}, type: 'Coffee', id: ''},
  {title: 'URBN North Park', location: {lat: 32.7483445, lng: -117.1273912}, type: 'Pizza', id: ''},
  {title: 'Mr. Moto Pizza House', location: {lat: 32.7468262, lng: -117.1297292}, type: 'Pizza', id: ''},
  {title: 'Tribute Pizza', location: {lat: 32.7471135, lng: -117.1279531}, type: 'Pizza', id: ''}
];


/** VIEW MODEL **/
var ListViewModel = function () {
  var self = this;

  self.placeList = ko.observableArray([]);

  initialPlaces.forEach(function(location) {
    self.placeList.push(new Place(location));
  });

	self.setPlace = function(location) {
		var yelpKey = 'O6HNX1ScuOuTLZ0zl8euUKsK-JogPCj36D6JYK9w-hx17aY_QTrdsP8_UD9ydwdnJCi52gEn4y7BFTAPzDAnM9SImhx-04E4k4NE8HUVHn9MK8KTNlBHvIuc3YBKWnYx';
		var url = 'https://api.yelp.com/v3/businesses/' + location.id();
		var RequestTimeout = setTimeout(function() {
				console.log('Could not reach yelp');
		}, 16000);

		$.ajax({
				url: url,
				headers: {
					'Authorization': 'Bearer ' + yelpKey
				},
				dataType: 'jsonp',
				jsonp: 'callback',
				success: function( data ) {
					console.log(data);
					clearTimeout(RequestTimeout);
				}
			});

	};
};

return ListViewModel;
});
