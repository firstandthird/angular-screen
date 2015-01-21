app = angular.module('example-app', ['ftScreen']);

app.controller('Controller1', function($scope, $screen){
  $scope.screen = $screen;
});

app.controller('Controller2', function($scope, $screen){
  $scope.screen = $screen;
});
