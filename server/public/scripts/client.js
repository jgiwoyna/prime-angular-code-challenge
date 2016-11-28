var app = angular.module('myApp',['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/heroes', {
      templateUrl: '/views/templates/heroes.html',
      controller: 'HeroesController',
      controllerAs: 'hc'
    })
    .when('/powers' ,{
      templateUrl: '/views/templates/powers.html',
      controller: 'PowersController',
      controllerAs: 'pc'
    })
    .otherwise({
      redirectTo: 'heroes'
    });

}]);

app.controller('HeroesController', ['$http', function($http) {
  console.log('heroes controller running');
  var self = this;
  self.heroes = {};
  getHeroes();

  function getHeroes(){
    $http.get('/heroes')
      .then(function(res) {
        self.heroes = res.data;
        console.log('self.heroes', self.heroes);
      })
    }

  self.addHero = function() {
  console.log('new hero: ', self.newHero);
  $http.post('/heroes', self.newHero)
    .then(function(response) {
      console.log('POST finished.');
      self.newHero = {};
      getHeroes();
    });
}

self.removeHero = function(id) {
  $http.delete('/heroes/' + id)
    .then(function(response) {
      getHeroes();
    });
}

}]);

app.controller('PowersController', ['$http', function($http) {
  console.log('powers controller running');
  var self = this;
  self.pc = {};

// function getPowers(){
//   $http.get('/superpowers')
//     .then(function(res) {
//       self.pc = res.data;
//       console.log('self.pc', self.pc);
//     })
//   }
}]);
