/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

	removeGroup: function(req, res){
	  User.findOne({id: req.param('id')}).populate('groups').exec(function(err, user) {

      user.groups.map(function (group) {
        LogService.UserDeleteGroup(user, group);
      });

	    user.groups.remove(req.body.groups);
      user.save(function(err) {
        return res.ok(
          user
        )
      })
    });
  },

  findUser: function(req, res, next) {
    if(req.user.isAdmin) {
      return next();
    } else {
      return res.ok(
        req.user.visiblemembers
      )
    }
  },

  findOneUser: function(req, res, next) {
    if(req.user.isAdmin) {
      return next();
    } else {
      if(req.param('id') === req.user.id) return next();

      var isAuthorized = false;
      req.user.visiblemembers.map(function(member) {
        if(req.param('id') === member.id) isAuthorized = true;
      });

      if(isAuthorized) return next();
      else return res.unauthorized();
    }
  },

  createUser: function(req, res, next) {
    if(req.user.isAdmin) {
      return next();
    } else {
      return res.unauthorized();
    }
  },

  updateUser: function(req, res, next) {
    if(req.user.isAdmin) {
      return next();
    } else {
      User.update(req.param('id') ,
        _.omit(req.allParams(), 'id', 'groups', 'username', 'isAdmin', 'logs', 'resetPasswordToken', 'resetPasswordExpires'))
        .then(function(users) {

          if(req.body.groups != null && req.body.groups.length > 0) {
            UserGroup.find({id: req.body.groups}).exec(function(err, groups) {
              groups.map(function(group) {
                LogService.UserAddGroup(users[0], group)
              })
            })
          }

          return users[0]
        })
        .then(res.ok)
        .catch(res.serverError);
    }
  },

  destroyUser: function(req, res, next) {
    if(req.user.isAdmin) {
      return next();
    } else {
      return res.unauthorized();
    }
  }
};

