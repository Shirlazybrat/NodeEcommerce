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
	 		}
	 	}, function errorCallback(response){
	 		console.log(response);
	 	});
	 };

$scope.addToCart = function(idOfitem, quantity){
	var oldCart = $cookies.get('cartItems');
	var newCart = oldCart + "," + idOfitem;
	$cookies.put('cartItems', newCart);
	var oldQuantity = $cookies.get('cartQuantity');
	var newQuantity = oldQuantity + "," + quantity;
	$cookies.put('cartItems', newCart);
	$cookies.put('cartQuantity', newQuantity);
	console.log(newQuantity.split(','));
	console.log(quantity);

	if($location.path() == '/cart'){
		$scope.item = $cookies.get('cartItems').split(',');
		$scope.quantity = $cookies.get('cartQuantity').split(',');
		
		for(var i = 0; i < cartItems.length; i++){
			$scope.carts.push({
					item: item[i]
			})
		}
		for (var j = 0; j < cartQuantity.length; j++){
			$scope.carts.push({
					quantity: quantity[j]
			})
		}
	}
	else {
		console.log(carts);
	}
}


// $scope.getCart = function(){
//     var cartItems = $cookies.get('cartItems');
//     var cartItemsArray = cartItems.split(',');
//     for(var i = 0l i<cartItemsArray.length; i++){
        //do stuff with each index
        //i.e., get the cost, the name, etc. and load them up into another array
//     }
// }
	
	// remove item
    $scope.remove = function(index) {
    	$scope.items.splice(index, 1);
    };

  // get store and cart from service
  //$scope.store = DataService.store;
  //$scope.cart = DataService.cart;

  // use routing to pick the selected product
  // if ($routeParams.itemName != null) {
  //   $scope.item = $scope.store.getitem($routeParams.itemName);
  // }


// //move this to the correct location
// 	 //if($location.path == "")
// 	 $http.get(apiPath + '/getUserData?token=' + $cookies.get('token'))
// 	 .then(function successCallback(response){
// 	 	////response.data.xxxx = whatever res.json was in express
// 	 	if(response.data.failure == 'badToken'){
// 	 		$location.path = '/login';
// 	 	}
// 	 	else if (response.data.failure){
// 	 		$location.path = '/login' //No token
// 	 	}
// 	 	else {
// 	 		// the token is good, response.data will have the info
// 	 		$scope.username = response.data.username;
// 	 		$scope.address = response.data.address;
// 	 	}
// 	 }, function errorCallback(response){

// 	 });

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
	.when('/cart',{
	templateUrl: 'views/cart.html',
		controller: 'mainController'
	})
	.otherwise({
	redirectTo: '/main'
	})
});
	
