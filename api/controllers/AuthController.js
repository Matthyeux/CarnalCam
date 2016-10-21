/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var passport = require ('passport');

function onPassportAuth(req, res, error, user, info)  {
    if(error) return res.serverError(error);
    if(!user) return res.unauthorized(null,info);

    LogService.UserLogin(user);

    return res.ok (
        {
            token : SecurityService.createToken(user),
            user:user
        }
    )
}


module.exports = {

  signin: function (req,res) {
      passport.authenticate('local',
      onPassportAuth.bind(this,req,res))(req,res);
  },
  signup : function (req,res) {
      User
          .create(_.omit(req.allParams(),'id'))
          .then(function(user){

              LogService.UserCreate(user);

              return {
                  user: user,
                  token: SecurityService.createToken(user)
              }

          })
          .then(res.created)
          .catch(res.serverError)
  },

  forgotPassword: function(req, res) {

    User.findOne({email: req.body.email}).then(function(user) {

      if(user) {
        user.resetPasswordToken = null;
        user.resetPasswordToken = SecurityService.createResetToken(user);
        user.resetPasswordExpires = Date.now() + 180000;

        user.save();

        MailService.resetPassword(user, user.resetPasswordToken);

        return {
          token: user.resetPasswordToken
        }
      } else {
        return {
          message: 'no user found'
        }
      }

    }).then(res.ok)
      .catch(res.serverError);
  },

  resetPassword: function(req, res) {
    if(req.body.token == null && req.body.password == null) {
      return res.badRequest({
        error: "Token or Password can't be null"
      })
    }

    User.findOne({resetPasswordToken: req.body.token}).then(function(user) {
      if(user) {
        if(user.resetPasswordExpires > Date.now()) {
          user.password = req.body.password;
          user.resetPasswordExpires = null;
          user.resetPasswordToken = null;
          user.save();

          return {
           user: user,
           token: SecurityService.createToken(user)
          };
        } else {
          return {message: 'token expired'}
        }
      }
    }).then(res.ok)
     .catch(res.serverError)
  }



};

