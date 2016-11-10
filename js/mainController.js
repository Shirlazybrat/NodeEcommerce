var ecommerceApp = angular.module('ecommerceApp', ['ngRoute', 'ngCookies']);
ecommerceApp.controller('mainController', function($scope, $http, $location, $cookies){
	 var apiPath = "http://shirletterly.com:3000";
	 // var apiPath = "http://localhost:3000";
	 
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
$scope.username = $scope.register();

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

$scope.username = $scope.login();


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

$scope.more = function(){
	 	console.log($scope.username);
	 	$http.post(apiPath + '/more', {
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



$scope.addToCart = function(idOfitem, quantity, amount){
	var oldCart = $cookies.get('cartItems');
	if (oldCart === undefined){
		var newCart = idOfitem
	}
	else {
		newCart = oldCart + "," + idOfitem;
	}
	console.log(oldCart);
	console.log(newCart);
	
	var oldQuantity = $cookies.get('cartQuantity');
	if (oldQuantity === undefined){
		var newQuantity = quantity;
	}
	else {
		newQuantity = oldQuantity + "," + quantity;
	}
	
	var oldAmount = $cookies.get('cartAmount');
	if (oldAmount === undefined){
		var newAmount = amount;
	}
	else {
		newAmount = oldAmount + "," + amount
	}

	$cookies.put('cartItems', newCart);
	$cookies.put('cartQuantity', newQuantity);
	$cookies.put('cartAmount', newAmount);
	
	newQuantity = newQuantity.split(",");
	console.log(quantity);
	console.log(newQuantity);
	var cartItems = newCart.split(",");
		$scope.item = $cookies.get('cartItems').split(',');
		$scope.quantity = $cookies.get('cartQuantity').split(',');
		$scope.amount = $cookies.get('cartAmount').split(',');
		var carts = [];
		for(var i = 0; i < cartItems.length; i++){
			carts.push({
					item: cartItems[i],
					quantity: newQuantity[i],
					amount: newAmount[i]
			})
			console.log(carts);	
		}
		$scope.carts = carts;
}


$scope.getCart = function(){
	var newCart = $cookies.get('cartItems');
	
	var newQuantity = $cookies.get('cartQuantity');
	
	var newAmount = $cookies.get('cartAmount');

	if(newQuantity == undefined || newAmount == undefined || newCart == undefined){
		return "Cart empty";
	}
	

	newQuantity = newQuantity.split(",");
	newAmount = newAmount.split(",");
	
	var cartItems = newCart.split(",");
		var carts = [];
		for(var i = 0; i < cartItems.length; i++){
			carts.push({
					item: cartItems[i],
					quantity: newQuantity[i],
					amount: newAmount[i]
			})
			console.log(carts);	
		}
		return carts;
	}

$scope.carts = $scope.getCart();

	
	// remove item
    $scope.remove = function(index) {
    	console.log(index);
    	var removeSelection = $scope.carts[index];
    	$scope.carts.splice(index, 1);
    	var newCart = $cookies.get('cartItems').split(',');
		var newQuantity = $cookies.get('cartQuantity').split(',');
		var newAmount = $cookies.get('cartAmount').split(',');
		newCart.splice(index,1);
		newQuantity.splice(index,1);
		newAmount.splice(index, 1);
		if (newCart.length == 1){
			newCart = newCart[0];
			newQuantity = newQuantity[0];
			newAmount = newAmount[0];
		}
		else{
		newCart = newCart.join(',');
		newQuantity = newQuantity.join(',');
		newAmount = newAmount.join(',');
		}
		console.log(newCart);
		$cookies.put('cartItems', newCart);
		$cookies.put('cartQuantity', newQuantity);
		$cookies.put('cartAmount', newAmount);
		$scope.total = $scope.getTotalPrice();
		$scope.numItems = $scope.getNumItems();
    };

    //API Key
//sercret key: sk_test_DOaPyiHDsX1cGeDdXbafYQiS
//publishablekey: pk_test_sCIdiilhnjLw852kQP18ZFbU
//secret key: sk_live_5FM5DlfmjPCnhyAsCri3AeJy
//live publish key: pk_live_iivQMMwenGy0s6AGmR2hucCn

	$scope.getTotalPrice = function() {
    var total = 0;
    var cartinfo = $scope.getCart();
    console.log(cartinfo);
    for (var i = 0; i < cartinfo.length; i++) {
        var carts = cartinfo[i];
        total += parseInt(carts.quantity * carts.amount);
    }
    return total;
}

$scope.total = $scope.getTotalPrice();
console.log($scope.total)


$scope.getNumItems = function() {
    var numItems = 0;
    var cartinfo = $scope.getCart();
    console.log(cartinfo);
    for (var i = 0; i < cartinfo.length; i++) {
        var carts = cartinfo[i];
        numItems += parseInt(carts.quantity);
    }
    return numItems;
}

$scope.numItems = $scope.getNumItems();
console.log($scope.numItems)

$scope.checkout = function(){
	 	console.log($scope.name);
	 	$http.post(apiPath + '/checkoutData', {
	 		name: $scope.name,
	 		home: $scope.home,
	 		deliver: $scope.deliver,
	 		address: $scope.address,
	 		city: $scope.city,
	 		zip: $scope.zip,
	 		phone: $scope.phone,
	 		details: $scope.details
	 	}).then(function successCallback(response){
	 		console.log(response);
	 		if(response.data.message == 'added'){
	 			$location.path('/cart');
	 		}
	 	}, function errorCallback(response){
	 		console.log(response);
	 	});
	 };
$scope.name = $scope.checkout();


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
            name: "Sheena's Pickles & Jams",
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
	.when('/more',{
	templateUrl: 'views/more.html',
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
	redirectTo: '/'
	})
});
	
