/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
	// Create Admin user is not exist
  User.findOne({username: 'carnal'}).exec(function(err, found){
	  if(err) {
		  console.log(err)
	  } else {
		  if(!found){
				User
					.create({username: 'carnal', email: 'contact@carnal.com', password: 'carnal', isAdmin: true})
					.then(function(user){
						return {
							user: user,
							token: SecurityService.createToken(user)
						}
					})
					.catch(console.log("error, impossible to create 'carnal' user"))
			}
	  }
  });
	
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
