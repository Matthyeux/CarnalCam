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

  updateGroup: function(req, res, next) {

    if(req.body.groups.length > 1) {
      UserGroup.find({id: req.body.groups}).exec(function(err, groups) {
        groups.map(function(group) {
          User.findOne({id: req.param('id')}).exec(function(err, user) {
            LogService.UserAddGroup(user, group)
          })
        })
      });
    }

    return next();
  }
};

