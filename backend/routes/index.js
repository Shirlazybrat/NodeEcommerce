var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoUrl = "mongodb://127.0.0.1:27017/ecommerce";
mongoose.connect(mongoUrl);
var Accounts = require('../models/accounts');

//include bcrypt
var bcrypt = require('bcrypt-nodejs');

router.post('/register', function(req,res,next){

	if (req.body.password != req.body.password2){
		res.json({
			message: "passmatch"
		});
	}
	else {
		var newAccount = new User({
			username: req.body.username,
			password: bcrypt.hash(req.body.password),
			email: req.body.email
});
	

	newAccount.save();
	res.json({
		message: "added",
		username: req.body.username
	});
}

});

router.post('/login', function(req,res,next){
	User.findOne(
		{username: req.body.username}, //This is the droid w a`re looking for
		function(error, document){
			//document is returned from the mongo query
			//document will have a property for each field.
			//we need to check the pw field in the db against the hashed bcrypt version
			if (document == null){
				//no match
				res.json({failure: "noUser"});
			}
			else {
				//run compare sync. first param is the english pw, secon param is the hash
				//it will return true if equal, false if not
				var loginResult = bcrypt.compareSync(req.body.password, document.password);
				if(loginResult){
					//the password is correct. login alowed
					res.json({
						success: "userFound"
					});
				}
				else{
					//hashes did not match or the doc wasn't found
					res.json({
						failure: "badPass"
					});
				}
			}
		}
	)
});


module.exports = router;
