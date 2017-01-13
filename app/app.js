var myDogApp = angular.module('myDogApp', ['ngRoute', 'ngAnimate']);

myDogApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    //$locationProvider.html5Mode(true);

    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'myDogController'
        })

    .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'contactController'
    })

    .when('/contact-succes', {
        templateUrl: 'views/contact-succes.html',
        controller: 'contactController'
    })

    .when('/directory', {
        templateUrl: 'views/directory.html',
        controller: 'myDogController'
    })

    .otherwise({
        redirectTo: '/home'
    });

}]);

myDogApp.directive('randomDog', [function () {

    return {
        restrict: 'E',
        scope: {
            dogs: '=',
            title: '='
        },
        templateUrl: 'views/random.html',
        transclude: true,
        replace: true,
        controller: function ($scope) {
            $scope.random = Math.floor(Math.random() * 4);
        }
    };


}]);




myDogApp.controller('myDogController', ['$scope', '$http', function ($scope, $http) {

    $scope.message = "hello";
    $scope.newdog = {};


    $scope.removeDog = function (dog) {
        var removedDog = $scope.dogs.indexOf(dog);
        $scope.dogs.splice(removedDog, 1);
    };

    $scope.addDog = function (newdog) {
        $scope.dogs.push({
            name: $scope.newdog.name || 'New Dog',
            belt: $scope.newdog.belt || 'black',
            rate: parseInt($scope.newdog.rate) || '100',
            available: true
        });

        $scope.newdog.name = "";
        $scope.newdog.belt = "";
        $scope.newdog.rate = "";

    };

    $scope.removeAll = function () {
        $scope.dogs = [];
    };

    $http.get('data/dogs.json').success(function (data) {
        $scope.dogs = data;
    })

}]);

myDogApp.controller('contactController', ['$scope', '$location', function ($scope, $location) {

    $scope.sendMessage = function () {
        $location.path('/contact-succes');
    };
}]);