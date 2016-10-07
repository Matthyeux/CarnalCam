/**
 *	Passport Configuration
 */


var passport = require('passport');
var LocalStrategie = require('passport-local');
var jwtStrategy = require('passport-jwt');

var EXPIRES = 60*24;
var SECRET = "jdgUHJK09vhdkHGFC4567fghjkbscGHJ";
var ALGO = "HS256";



/** Config for local Strategy **/
var LOCAL_STRATEGY_CONFIG = {
	usernameField : 'email',
	passwordField : 'password'
}

/** Config for jwt Strategy **/
var JWT_STRATEGY_CONFIG = {
	secretOrKey : SECRET,
	issuer: '',
	audience : ''
}


function onLocalStrategyAuth(email,password,next){
	User.findOne({email: email})
		.exec(function(error,user){
			if(errro) return next(error,false,{})
				if(!user) return next(null,false,{
					code: 'E_USER_NOT_FOUND',
					message: email + 'is not found'
				});
			if(!SecurityService.comparePassword(password,user)){
				return next(null,false,{
					code: 'E_USER_PASSWORD_MISMATCH',
					message: 'email or password is wrong'
				});
			}
		});
}

function onJwtStrategyAuth(payload,next){
	var user = payload.user
	return next(null,user,{})
}

passeport.use(
	new LocalStrategy(LOCAL_STRATEGY_CONFIG,onLocalStrategyAuth())
);
passeport.use(
	new JwtStrategy( JWT_STRATEGY_CONFIG, onJwtStrategyAuth())
);

module.exports.jwtSettings = {
	expires: EXPIRES,
	algo: ALGO,
	secret: SECRET
}