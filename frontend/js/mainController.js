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
	 			$cookies.put('token', response.data.token);
	 			$cookies.put('username', $scope.username);
	 		}
	 	}, function errorCallback(response){
	 		console.log(response);
	 	});
	 };


$scope.login = function(){
	 	console.log($scope.username);
	 	$http.post(apiPath + '/login', {
	 		username: $scope.username,
	 		password: $scope.password
	 	}).then(function successCallback(response){
	 		console.log(response);
	 		if(response.data.success == 'userFound'){
	 			$location.path('/options');
	 			$cookies.put('username', $scope.username);
	 			$scope.username = $cookies.get.username;
	 		}
	 	}, function errorCallback(response){
	 		console.log(response);
	 	});
	 };



	 $http.get(apiPath + '/getUserData?token=' + $cookies.get('token'))
	 .then(function successCallback(response){
	 	////response.data.xxxx = whatever res.json was in express
	 	if(response.data.failure == 'badToken'){
	 		$location.path = '/login';
	 	}
	 	else if (response.data.failure){
	 		$location.path = '/login' //No token
	 	}
	 	else {
	 		// the token is good, response.data will have the info

	 	}
	 }, function errorCallback(response){

	 });

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
	
