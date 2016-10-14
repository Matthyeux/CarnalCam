/**
 * UserGroupController
 *
 * @description :: Server-side logic for managing Usergroups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  removeUser: function(req, res){
    UserGroup.findOne({id: req.param('id')}).populate('members').exec(function(err, group) {
      group.members.remove(req.body.members);

      group.save(function(err) {
        return res.ok({
          group: group
        })
      })
    });
  }
};

