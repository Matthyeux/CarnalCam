/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	username:{ type: 'text'},
	password:{ type: 'password'},
	email: { type: 'email' },
	toJson: function (){
		var obj = this.toObject();
		delete obj.password;
		return obj;
	}
  },
  beforeUpdate: function(value,next){
	  if(){
		SecurityService.hashPassword();
	  }
	  return next;
  },
  beforeCreate: function(value,next){
	  SecurityService.hashPassword(value);
	  return next;
  }
};

