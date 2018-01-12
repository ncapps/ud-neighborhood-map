define([
	'knockout',
	'models/place'
], function (ko, Place) {


var ViewModel = function (Places) {
  var self = this;
	self.largeInfoWindow = new google.maps.InfoWindow();

	self.allPlaces = ko.observableArray(Places.map(function (place) {
		var newPlace = new Place(place);
		var marker = new google.maps.Marker({
			position: place.location,
			title: place.name,
			icon: "img/red-dot.png",
			animation: google.maps.Animation.DROP,
			id: place.id,
			venueID: place.venueID
		});
		newPlace.marker = marker;
		marker.addListener('click', function() {
			self.populateInfoWindow(this);
			self.toggleActiveMarker(newPlace);
		});

		return newPlace;
	}));

	self.currentPlace = ko.observable();

	self.showPlaceType = ko.observable('all');

	// Display location listings and markers of a given type (i.e. all, coffee, pizza)
	self.filteredPlaces = ko.computed(function () {
		switch (self.showPlaceType()) {
		case 'coffee':
			return self.allPlaces().filter(function (place) {
				return place.type() == 'coffee';
			});
		case 'pizza':
			return self.allPlaces().filter(function (place) {
				return place.type() == 'pizza';
			});
		default:
			return self.allPlaces();
		}
	}.bind(this));

	self.map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 32.748473, lng: -117.138784},
			zoom: 16,
			styles: gmapStyle,
			mapTypeControl: false
	});


	/*** start google map helper functions ***/
	self.addMarkers = function () {
		var bounds = new google.maps.LatLngBounds();
		var places = self.allPlaces();

		for (var i = 0; i < places.length; i++) {
			if (self.showPlaceType() == places[i].type() || self.showPlaceType() == 'all') {
				places[i].marker.setMap(self.map);
				// Extend the boundaries of the map for each marker and display the marker
				bounds.extend(places[i].marker.position);
			} else {
				places[i].marker.setMap(null);
			}

			self.map.fitBounds(bounds);
		}
	};


	self.toggleActiveMarker = function(clickedPlace) {
		self.largeInfoWindow.marker = null;
		self.largeInfoWindow.close();
		var lastSelectedPlace = self.currentPlace();
		if (self.currentPlace() !== null) {
			self.currentPlace().marker.setAnimation(null);
			self.currentPlace().marker.setIcon('img/red-dot.png');
			self.currentPlace(null);
		}

		if (clickedPlace !== null && lastSelectedPlace != clickedPlace) {
			clickedPlace.marker.setAnimation(google.maps.Animation.BOUNCE);
			clickedPlace.marker.setIcon('img/blue-dot.png');
			self.currentPlace(clickedPlace);
			self.populateInfoWindow(clickedPlace.marker);
		}
	};


	self.populateInfoWindow = function (marker) {
	  // Check to make sure the infowindow is not already opened on this marker.
		var infowindow = self.largeInfoWindow;
	  if (infowindow.marker != marker) {
	    infowindow.setContent('');
	    infowindow.marker = marker;

	    infowindow.addListener('closeclick', function() {
				self.toggleActiveMarker(null);
	    });

			// Set the marker property on this infowindow so it isn't created again.
			infowindow.marker = marker;

			var foursquareAPI = 'https://api.foursquare.com/v2/venues/' + marker.venueID;
			$.getJSON( foursquareAPI, {
				client_id:'ENIPTOP54HMOHON4OJAPMP10T2YRU1WPOSL3TFFOIVSU2A4R',
				client_secret:'RBEGKDXDZSWJDGAOW0MWVW0AWHJKCHQBD0V2TMJLMACZEEZF',
				v:'20180111'
			}, function( data ) {
				var venue = data.response.venue;

				var innerHTML = '<div>';
				if (venue.name) {
					innerHTML += '<strong> <a target="_blank" href="' +
						venue.canonicalUrl + '">' + venue.name + '</a> </strong>';
				}
				if (venue.location.address) {
					innerHTML += '<br>' + venue.location.address;
				}
				if (venue.contact.formattedPhone) {
					innerHTML += '<br>' + venue.contact.formattedPhone;
				}
				var photo = venue.bestPhoto;
				if (photo) {
					innerHTML += '<br><br><img src="' + photo.prefix + "300x100" + photo.suffix + '">';
				}
				innerHTML += '</div>';
				infowindow.setContent(innerHTML);

			}).fail(function() {
				var innerHTML = '<div>';
				innerHTML += '<strong>Oops! Something went wrong.</strong>';
				innerHTML += '<br>This content didn\'t load from Foursquare correctly.';
				innerHTML += '</div>';
				infowindow.setContent(innerHTML);

			});

			infowindow.open(self.map, marker);
	  }
	};
	/*** end google map helper functions ***/

	self.filterPlaces = function() {
		// filter markers on map and reset active marker and infowindow
		self.addMarkers();
		self.toggleActiveMarker(null);
		return true;
	};

	// initialize all markers
	self.filterPlaces();
};

return ViewModel;
});

// custom google map style
var gmapStyle = [
		{
				"featureType": "water",
				"elementType": "all",
				"stylers": [
						{
								"hue": "#ffffff"
						},
						{
								"saturation": -100
						},
						{
								"lightness": 100
						},
						{
								"visibility": "on"
						}
				]
		},
		{
				"featureType": "landscape",
				"elementType": "all",
				"stylers": [
						{
								"hue": "#ffffff"
						},
						{
								"saturation": -100
						},
						{
								"lightness": 100
						},
						{
								"visibility": "on"
						}
				]
		},
		{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [
						{
								"hue": "#000000"
						},
						{
								"saturation": -100
						},
						{
								"lightness": -100
						},
						{
								"visibility": "simplified"
						}
				]
		},
		{
				"featureType": "road",
				"elementType": "labels",
				"stylers": [
						{
								"hue": "#ffffff"
						},
						{
								"saturation": -100
						},
						{
								"lightness": 100
						},
						{
								"visibility": "simplified"
						}
				]
		},
		{
				"featureType": "poi",
				"elementType": "all",
				"stylers": [
						{
								"hue": "#ffffff"
						},
						{
								"saturation": -100
						},
						{
								"lightness": 100
						},
						{
								"visibility": "off"
						}
				]
		},
		{
				"featureType": "administrative",
				"elementType": "all",
				"stylers": [
						{
								"hue": "#ffffff"
						},
						{
								"saturation": 0
						},
						{
								"lightness": 100
						},
						{
								"visibility": "off"
						}
				]
		},
		{
				"featureType": "transit",
				"elementType": "geometry",
				"stylers": [
						{
								"hue": "#000000"
						},
						{
								"saturation": 0
						},
						{
								"lightness": -100
						},
						{
								"visibility": "on"
						}
				]
		},
		{
				"featureType": "transit",
				"elementType": "labels",
				"stylers": [
						{
								"hue": "#ffffff"
						},
						{
								"saturation": 0
						},
						{
								"lightness": 100
						},
						{
								"visibility": "off"
						}
				]
		}
];
