/**
 * DeviceGroupController
 *
 * @description :: Server-side logic for managing Devicegroups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  removeDevice: function(req, res){
    DeviceGroup.findOne({id: req.param('id')}).populate('members').exec(function(err, group) {

      group.members.map(function(member) {
        LogService.DeviceDeleteGroup(member, group);
      });

      group.members.remove(req.body.members);

      group.save(function(err) {
        return res.ok({
          group: group
        })
      })
    });
  },

  updateDevice: function(req, res, next) {
    if(req.body.members.length > 1) {
      Device.find({id: req.body.members}).exec(function(err, members) {

        members.map(function(member) {
          DeviceGroup.findOne({id: req.param('id')}).exec(function(err, group) {
            LogService.DeviceAddGroup(member, group)
          })
        })
      });
    }
    return next();
  }
};

