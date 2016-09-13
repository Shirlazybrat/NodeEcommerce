var ecommerceApp = angular.module('ecommerceApp', ['ngRoute', 'ngCookies']);
ecommerceApp.controller('mainController', function($scope, $http, $location, $cookies){
	 var apiPath = "http://127.0.0.1:3000";

	 $scope.register = function(){
	 	console.log($scope.username);
	 	$http.post(apiPath + '/register', {
	 		username: $scope.username,
	 		password: $scope.password,
	 		password2: $scope.password2,
	 		email: $scope.email
	 	}).then(function successCallback(response){
	 		console.log(response);
	 		if(response.data.message == 'added'){
	 			$location.path('/options');
	 		}
	 	}, function errorCallback(response){
	 		console.log(response);
	 	});
	 };


$scope.login = function(){
	 	console.log($scope.username);
	 	$http.post(apiPath + '/login', {
	 		username: $scope.username,
	 		password: $scope.password,
	 	}).then(function successCallback(response){
	 		console.log(response);
	 		if(response.data.message == 'added'){
	 			$location.path('/options');
	 			$scope.message = "Welcome" + $scope.username;
	 		}
	 	}, function errorCallback(response){
	 		console.log(response);
	 	});
	 };
	});

//Set up routes using the routes module
ecommerceApp.config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'views/main.html',
		controller: 'mainController'
	})
	.when('/login', {
	templateUrl: 'views/login.html',
		controller: 'mainController'
	})
	.when('/register',{
	templateUrl: 'views/register.html',
		controller: 'mainController'
	})
	.when('/options',{
	templateUrl: 'views/options.html',
		controller: 'mainController'
	})
});
	
