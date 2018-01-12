require.config({
  paths: {
		knockout: '../node_modules/knockout/build/output/knockout-latest'
	}
});

require([
  'knockout',
  'viewmodels/app'
], function (ko, ViewModel) {

    var initialPlaces = [
      {name: 'Dark Horse Coffee Roasters', location: {lat: 32.7471805, lng: -117.1304319}, type: 'coffee', id: 'ChIJvQCuO_RU2YARRPzYMCgpBnE', venueID: '54e364e4498ea9b638f738f8'},
      {name: 'Communal Coffee', location: {lat: 32.7483084, lng: -117.1391773}, type: 'coffee', id: 'ChIJJ3YYMu5U2YARY3qheaa1Dlc', venueID: '5730aa5d498e72a5666a4ebb'},
      {name: 'Torque Moto Cafe', location: {lat: 32.7444375, lng: -117.1303768}, type: 'coffee', id: 'ChIJnW0t6fRU2YARqn7w6dH4vF8', venueID: '57c098b5498e1efc0ca9aede'},
      {name: 'Subterranean Coffee Boutique', location: {lat: 32.746631, lng: -117.130318}, type: 'coffee', id: 'ChIJ02CmR_RU2YAR4XU_hdozuyM', venueID: '5078977de0e22b404448ca26'},
      {name: 'URBN North Park', location: {lat: 32.7483445, lng: -117.1273912}, type: 'pizza', id: 'ChIJgSG95PVU2YARoQnpG18YK70', venueID: '4c379a7bdfb0e21ea918ada8'},
      {name: 'Mr. Moto Pizza House', location: {lat: 32.7468262, lng: -117.1297292}, type: 'pizza', id: 'ChIJOST5SfRU2YARxf4H_-PMlak', venueID: '58963cb7000bef635d0d75f2'},
      {name: 'Tribute Pizza', location: {lat: 32.7471135, lng: -117.1279531}, type: 'pizza', id: 'ChIJWe0EwPVU2YARoIaq_kstmvw', venueID: '5781784d498e010cac598ac4'}
    ];

    ko.applyBindings(new ViewModel(initialPlaces));
});
