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
        return res.ok({
          user: user
        })
      })
    });
  },

  updateModel: function(req, res, next) {

    if(req.user.isAdmin) {
      User.update(req.param('id'), _.omit(req.allParams(), 'id'))
        .then(function(user) {
        return {
          user: user
        }
      })
        .then(res.created)
        .catch(res.serverError);
    } else {


      User.update(req.param('id') ,
        _.omit(req.allParams(), 'id', 'groups', 'username', 'isAdmin', 'logs', 'resetPasswordToken', 'resetPasswordExpires'))
        .then(function(users) {

          if(req.body.groups != null && req.body.groups.length > 0) {
            UserGroup.find({id: req.body.groups}).exec(function(err, groups) {
              users.map(function(user) {
                groups.map(function(group) {
                  LogService.UserAddGroup(user, group)
                })
              });
            })
          }

          return {
            users: users
          }
        })
        .then(res.created)
        .catch(res.serverError);
    }
  }
};

