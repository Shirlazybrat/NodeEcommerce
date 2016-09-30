var ecommerceApp = angular.module('ecommerceApp', ['ngRoute', 'ngCookies']);
ecommerceApp.controller('mainController', function($scope, $http, $location, $cookies){
	 var apiPath = "http://shirletterly.com:3000";


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

$scope.pickles = function(){
	 	console.log($scope.username);
	 	$http.post(apiPath + '/pickles', {
	 		// username: $scope.username,
	 		// password: $scope.password
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

$scope.butters = function(){
	 	console.log($scope.username);
	 	$http.post(apiPath + '/butters', {
	 		// username: $scope.username,
	 		// password: $scope.password
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

$scope.jams = function(){
	 	console.log($scope.username);
	 	$http.post(apiPath + '/jams', {
	 		// username: $scope.username,
	 		// password: $scope.password
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
	var oldQuantity = $cookies.get('cartQuantity');
	var newQuantity = oldQuantity + "," + quantity;
	$cookies.put('cartItems', newCart);
	$cookies.put('cartQuantity', newQuantity);
	console.log(newQuantity.split(','));
	console.log(quantity);

	if($location.path() == '/cart'){
		$scope.item = $cookies.get('cartItems').split(',');
		$scope.quantity = $cookies.get('cartQuantity').split(',');
		var carts = [];
		for(var i = 0; i < cartItems.length; i++){
			$scope.carts.push({
					item: item[i]
			})
		}
		// for (var j = 0; j < cartQuantity.length; j++){
		// 	$scope.carts.push({
		// 			quantity: quantity[j]
		// 	})
		// }
	}
	console.log(carts);	
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
    	$scope.carts.splice(index, 1);
    };

    //API Key
//sercret key: sk_test_DOaPyiHDsX1cGeDdXbafYQiS
//publishablekey: pk_test_sCIdiilhnjLw852kQP18ZFbU
//secret key: sk_live_5FM5DlfmjPCnhyAsCri3AeJy
//live publish key: pk_live_iivQMMwenGy0s6AGmR2hucCn

    $scope.payOrder = function(userOptions) {
        $scope.errorMessage = "";
        var handler = StripeCheckout.configure({
            key: 'pk_test_sCIdiilhnjLw852kQP18ZFbU',
            image: '../img/Newlogo.png',
            locale: 'auto',
            token: function(token) {
                console.log("The token Id is: ");
                console.log(token.id);

                $http.post(apiPath + '/stripe', {
                    amount: $scope.total * 100,
                    stripeToken: token.id,
                    token: $cookies.get('token')
                        //This will pass amount, stripeToken, and token to /payment
                }).then(function successCallback(response) {
                    console.log(response.data);
                    if (response.data.success) {
                        //Say thank you
                        $location.path('/checkout');
                    } else {
                        $scope.errorMessage = response.data.message;
                        //same on the checkout page
                    }
                }, function errorCallback(response) {});
            }
        });
        handler.open({
            name: "Sheena's Pickles",
            description: 'A Crunch in Every Bite',
            amount: $scope.total * 100
        });
    };

  // get store and cart from service
  //$scope.store = DataService.store;
  //$scope.cart = DataService.cart;

  // use routing to pick the selected product
  // if ($routeParams.itemName != null) {
  //   $scope.item = $scope.store.getitem($routeParams.itemName);
  // }


// **** move this to the correct location
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
	.when('/pickles',{
	templateUrl: 'views/pickles.html',
		controller: 'mainController'
	})
	.when('/butters',{
	templateUrl: 'views/butters.html',
		controller: 'mainController'
	})
	.when('/jams',{
	templateUrl: 'views/jams.html',
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
	.when('/checkout',{
	templateUrl: 'views/checkout.html',
		controller: 'mainController'
	})
	.otherwise({
	redirectTo: '/main'
	})
});
	
