function getWeatherSevenDays($scope, $http){
  $http({
    method: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+$scope.city_name+'&cnt=7&appid=ee07e2bf337034f905cde0bdedae3db8&units=metric'
  }).then(function successCallback(response) {
    var r = response.data;
    var date = new Date();
    $scope.date = (date.getDate() + $scope.x - 1)+ "/" + date.getMonth() + "/"+ date.getFullYear();
    $scope.icone = r.list[$scope.x - 1].weather[0].main;
    $scope.temp_max = r.list[$scope.x - 1].temp.max; 
    $scope.temp_min = r.list[$scope.x - 1].temp.min;
    }, function errorCallback() {
      if (localStorage.length == 0){
        console.log("doesn't work")
      } else {
        alert("doesn't work...");
      }
    }); 
}
/**
 * Get the weather JSON on openweathermap of the city name in $scope.x.name in meteovilles.html file
 * @param  $scope 
 * @param  $http 
 */
function getWeather($scope, $http){
  if (localStorage.length != 1){
    $scope.key += 1;
  }
  $http({
    method: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/weather?q='+localStorage.getItem($scope.key) +',fr&APPID=ee07e2bf337034f905cde0bdedae3db8&units=metric&lang=fr'
  }).then(function successCallback(response) {
      $scope.name = localStorage.getItem($scope.key)
      $scope.temps = response.data.weather[0].description;
      $scope.image = response.data.weather[0].main;
      $scope.temperature = response.data.main.temp;
      $scope.pression = response.data.main.pressure;
      $scope.humidite = response.data.main.humidity;
      $scope.vitesse_vent = response.data.wind.speed
      $scope.orientation_vent = "?";
      return true;
    }, function errorCallback() {
      alert("doesn't work...");
    });
}

function getCity($scope, $http){
  if ($scope.val != "" && $scope.val != undefined){
    $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?q='+$scope.val+',fr&APPID=ee07e2bf337034f905cde0bdedae3db8&units=metric&lang=fr'
    }).then(function successCallback(response) {
        alert("This city has been add to the list !");
        /** verify if the $scope.val still exists in the local storage */
        var b = false; 
        for (var i = 1; i <= localStorage.length +1 && !b; i++){
          if (localStorage.length !=0 && localStorage.getItem(i) == $scope.val){
            b = true;
          }
        }
        if (!b){
          localStorage.setItem(localStorage.length + 1, $scope.val);
        }
        $scope.val = "";
      }, function errorCallback() {
        alert("Please, enter a valid city name :)");
      });
  } else {
    alert("Please, enter a valid city name :)");
  }
}

function deleteCity(key, city){
  localStorage.removeItem(key);
  for (key; key <= localStorage.length; key++){
    localStorage.setItem(key, localStorage.getItem(key +1));
    localStorage.removeItem(key+1);
  }
  location.reload();
}

function futur($routeParams, $route){
  var b = 1;
  if ($routeParams.cityValue >= localStorage.length){
    b = 1;
  } else {
    b = parseInt($routeParams.cityValue) + 1;
  }
  $route.updateParams({cityValue : b});
  
}
function back($routeParams, $route){
  var b = 1;
  if ($routeParams.cityValue <= 1){
    b = localStorage.length;
  } else {
    b = parseInt($routeParams.cityValue) - 1;
  }
  $route.updateParams({cityValue : b});
}