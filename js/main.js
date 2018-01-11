require.config({
  paths: {
		knockout: '../node_modules/knockout/build/output/knockout-latest'
	}
});

require([
  'knockout',
  'viewmodels/app',
  'models/places'
], function (ko, ViewModel, places) {

    ko.applyBindings(new ViewModel(places.location));
});

/*
DONE1) index.html
DONE2) main.js
DONE3) Sidebar.js
DONE4) Init Map from Sidebar.js
DONE5) style map
DONE6) Show InfoWindow from marker clicker
7) Filter Coffee vs Pizza
8) Animate marker when clicked on list or map
9) Add flickr image to InfoWindow
10) Make the sidebar responsive
11) "fail gracefully" when API's are unavailable

<script async defer
    src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCB2vemkAO2DirMqzHstBCD0seBzfiODsE&v=3&callback=initMap">
</script>

//https://maps.googleapis.com/maps/api/geocode/json?address=tribute+pizza+north+park,+CA&key=AIzaSyCB2vemkAO2DirMqzHstBCD0seBzfiODsE

*/
