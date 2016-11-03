/**
 * UserGroupController
 *
 * @description :: Server-side logic for managing Usergroups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  findUserGroup: function(req, res, next) {
    if(req.user.isAdmin) {
      return next();
    } else {
      return res.ok(
        req.user.groups
      )
    }
  },

  findOneUserGroup: function(req, res, next) {
    if(req.user.isAdmin) {
      return next();
    } else {

      var isAuthorized = false;
      req.user.groups.map(function(group) {
        if(group.id === req.param('id')) isAuthorized = true;
      });

      if(isAuthorized) return next();
      else return res.unauthorized();

    }

  },

  createUserGroup: function(req, res, next) {
    if(req.user.isAdmin) {
      return next();
    } else {
      return res.unauthorized();
    }

  },

  updateUserGroup: function(req, res, next) {
    if(req.user.isAdmin) {

      if(req.body.hasOwnProperty("members") && req.body.members > 0) {
        User.find({id: req.body.members}).then(function(members) {
          members.map(function(member){
            UserGroup.findOne({id: req.param('id')}).exec(function(err, group) {
              LogService.UserAddGroup(member, group)
            })
          })
        })
          .then(function() {
          return next()
        })
          .catch(function(error) {
          res.serverError(error.message);
        })
      }

    } else {
      return res.unauthorized();
    }
  },

  destroyUserGroup: function(req, res, next) {
    if(req.user.isAdmin) {
      return next();
    } else {
      return res.unauthorized();
    }
  },


  removeUser: function(req, res){
    UserGroup.findOne({id: req.param('id')}).populate('members').exec(function(err, group) {

      group.members.map(function(member) {
        LogService.UserDeleteGroup(member, group);
      });
      group.members.remove(req.body.members);

      group.save(function(err) {
        return res.ok(
          group
        )
      })
    });
  }

};

