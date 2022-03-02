var app = angular.module("meteo", ["ngRoute"]);
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "./partials/meteovilles.html",
    controller : "controllerRepeat"
  })
  .when("/ville", {
    templateUrl : "./partials/villes.html",
    controller : "controllerCity"
  })
  .when("/prevision/:cityValue", {
    templateUrl : "./partials/previsions.html",
    controller : "controllerPrevision"
  })
  .otherwise({redirectTo:'/'});
});

/* controller meteovilles.html */
app.controller('controllerRepeat', function($scope){
  $scope.villes = localStorage;
  $scope.delete_city = function(key, city){
    deleteCity(key, city)
  }
  $scope.deleteAll = function(){
    localStorage.clear()
  }
});

app.controller('controllerMeteo', getWeather); 

/* controller prevision.html */
app.controller('controllerPrevision', ['$scope', '$routeParams', '$route',function($scope, $routeParams, $route) {
  $scope.week = [1, 2, 3, 4, 5, 6, 7];
  var s = $routeParams.cityValue;
  if (localStorage.length != 0 && !isNaN(s) && s <= localStorage.length && s > 0){
    $scope.city_name = localStorage.getItem(s);
  }
  $scope.back = function(){
    back($routeParams, $route);
  }
  $scope.futur = function(){
    futur($routeParams, $route);
  }

}]);
app.controller('controllerSevenDays', ['$scope', '$http','$timeout', function($scope, $http, $timeout){
  if (localStorage.length == 0){
    if ($scope.x == 1){
      $timeout(function(){
        alert("You must add a city before");
        let newURL = document.createElement('a');
        newURL.href = "#!/ville";
        document.body.appendChild(newURL);
        newURL.click();
      });
    }
  } else {
      getWeatherSevenDays($scope, $http);
    
  }
}]); 

/* controller villes.html */
app.controller('controllerCity', ['$scope', '$http', function($scope, $http) {
  $scope.clicSurButton = function(){
      getCity($scope, $http);
  }}]);