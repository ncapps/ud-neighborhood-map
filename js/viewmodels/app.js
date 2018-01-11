define([
	'knockout',
	'models/place',
	'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCB2vemkAO2DirMqzHstBCD0seBzfiODsE&v=3',
	'views/gmap'
], function (ko, Place, gmap, gmapStyle) {


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
			id: place.id
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
			styles: gmapStyle.styles,
			mapTypeControl: false
	});

	/* start google map helper functions */

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
		// Stop bouncing for previously selected marker
		self.largeInfoWindow.marker = null;
		self.largeInfoWindow.close();
		var lastSelectedPlace = self.currentPlace();
		if (self.currentPlace() != null) {
			self.currentPlace().marker.setAnimation(null);
			self.currentPlace().marker.setIcon('img/red-dot.png');
			self.currentPlace(null);
		}

		if (clickedPlace != null && lastSelectedPlace != clickedPlace) {
			clickedPlace.marker.setAnimation(google.maps.Animation.BOUNCE);
			clickedPlace.marker.setIcon('img/blue-dot.png');
			self.currentPlace(clickedPlace);
			self.populateInfoWindow(clickedPlace.marker)
		}
	};

	// This function populates the infowindow when the marker is clicked. We'll only allow
	// one infowindow which will open at the marker that is clicked, and populate based
	// on that markers position.
	self.populateInfoWindow = function (marker) {
	  // Check to make sure the infowindow is not already opened on this marker.
		var infowindow = self.largeInfoWindow;
	  if (infowindow.marker != marker) {
	    // Clear the infowindow content to give the streetview time to load.
	    infowindow.setContent('');
	    infowindow.marker = marker;
	    // Make sure the marker property is cleared if the infowindow is closed.
	    infowindow.addListener('closeclick', function() {
				self.toggleActiveMarker(null);
	    });

	    var service = new google.maps.places.PlacesService(self.map);
	    service.getDetails({
	      placeId: marker.id
	    }, function(place, status) {
	      if (status === google.maps.places.PlacesServiceStatus.OK) {
	        // Set the marker property on this infowindow so it isn't created again.
	        infowindow.marker = marker;
	        var innerHTML = '<div>';
	        if (place.name) {
	          innerHTML += '<strong>' + place.name + '</strong>';
	        }
	        if (place.formatted_address) {
	          innerHTML += '<br>' + place.formatted_address;
	        }
	        if (place.formatted_phone_number) {
	          innerHTML += '<br>' + place.formatted_phone_number;
	        }
	        if (place.opening_hours) {
	          innerHTML += '<br><br><strong>Hours:</strong><br>' +
	              place.opening_hours.weekday_text[0] + '<br>' +
	              place.opening_hours.weekday_text[1] + '<br>' +
	              place.opening_hours.weekday_text[2] + '<br>' +
	              place.opening_hours.weekday_text[3] + '<br>' +
	              place.opening_hours.weekday_text[4] + '<br>' +
	              place.opening_hours.weekday_text[5] + '<br>' +
	              place.opening_hours.weekday_text[6];
	        }
	        if (place.photos) {
	          innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
	              {maxHeight: 100, maxWidth: 200}) + '">';
	        }
	        innerHTML += '</div>';
	        infowindow.setContent(innerHTML);
	      }

	      // Open the infowindow on the correct marker.
	      infowindow.open(self.map, marker);
	    });
	  }
	};

	/* end google map helper functions */

	self.filterPlaces = function() {
		// filter markers on map and reset active marker and infowindow
		self.addMarkers();
		self.toggleActiveMarker(null);

		return true;
	};

	self.setPlace = function(clickedPlace) {
			self.toggleActiveMarker(clickedPlace);
	};


	// initialize all markers
	self.filterPlaces();

};

return ViewModel;
});
