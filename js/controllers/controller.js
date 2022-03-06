/**
 * retrieves the 7-day forecast for a given city in $scope.city_name with the openweathermap API
 * @param {*} $scope 
 * @param {*} $http 
 */
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
      $scope.vitesse_vent = response.data.wind.speed;
      var x = response.data.wind.deg;
      if (x >= 315 || x < 45){
        $scope.orientation_vent = "North";
      } else if(x < 315 && x >= 225){
        $scope.orientation_vent = "West";
      }else if(x >= 45 && x < 135){
        $scope.orientation_vent = "Est";
      }else {
        $scope.orientation_vent = "South";
      }
      return true;
    }, function errorCallback() {
      alert("doesn't work...");
    });
}

/**
 * allows to add a city to the localStorage, checking that it exists in the openweathermap 
 * API DB, and that it does not already exist in the localStorage
 * @param {*} $scope 
 * @param {*} $http 
 */
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

/**
 * allows you to remove an item from the localStorage, and to arrange it 
 * afterwards so that there is no hole in the list.
 * @param {*} key the id of the city
 * @param {*} city the name of the city
 */
function deleteCity(key, city){
  localStorage.removeItem(key);
  for (key; key <= localStorage.length; key++){
    localStorage.setItem(key, localStorage.getItem(key +1));
    localStorage.removeItem(key+1);
  }
  location.reload();
}

/**
 * allows you to move to the next city of the localStorage if there are several.
 * @param {*} $routeParams 
 * @param {*} $route 
 */
function futur($routeParams, $route){
  var b = 1;
  if ($routeParams.cityValue >= localStorage.length){
    b = 1;
  } else {
    b = parseInt($routeParams.cityValue) + 1;
  }
  $route.updateParams({cityValue : b});
  
}

/**
 * allows to pass the previous city in the list of the localStorage
 * @param {*} $routeParams 
 * @param {*} $route 
 */
function back($routeParams, $route){
  var b = 1;
  if ($routeParams.cityValue <= 1){
    b = localStorage.length;
  } else {
    b = parseInt($routeParams.cityValue) - 1;
  }
  $route.updateParams({cityValue : b});
}