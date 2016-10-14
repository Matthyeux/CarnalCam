/**
 * UserGroupController
 *
 * @description :: Server-side logic for managing Usergroups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  removeUser: function(req, res){
    UserGroup.findOne({id: req.param('id')}).populate('members').exec(function(err, group) {

      group.members.map(function(member) {
        LogService.UserDeleteGroup(member, group);
      });
      group.members.remove(req.body.members);

      group.save(function(err) {
        return res.ok({
          group: group
        })
      })
    });
  },

  updateUser: function(req, res, next) {
    if(req.body.members.length > 1) {
      User.find({id: req.body.members}).exec(function(err, members) {

        members.map(function(member) {
          UserGroup.findOne({id: req.param('id')}).exec(function(err, group) {
            LogService.UserAddGroup(member, group)
          })
        })
      });
    }
    return next();
  }


};

