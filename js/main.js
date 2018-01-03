require.config({
  paths: {
		knockout: '../node_modules/knockout/build/output/knockout-latest'
	}
});

require([
  'knockout',
  'viewmodels/place'
], function (ko, ListViewModel) {
    //foo and bar are loaded according to requirejs
    //config, but if not found, then node's require
    //is used to load the module.
    ko.applyBindings(new ListViewModel());
});
