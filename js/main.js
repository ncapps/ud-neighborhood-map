requirejs.config({
  paths:{
    knockout: '../node_modules/knockout/build/output/knockout-latest',
    jquery: '../node_modules/jquery/dist/jquery',
    underscore: '../node_modules/underscore/underscore'
  }
});

requirejs([
  'knockout',
  'viewmodels/article',
  'jquery',
  'underscore'
], function (ko, ArticleViewModel) {
  ko.applyBindings(new ArticleViewModel([]));
});
