/**
 * DeviceGroupController
 *
 * @description :: Server-side logic for managing Devicegroups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  removeDevice: function(req, res){
    DeviceGroup.findOne({id: req.param('id')}).populate('members').exec(function(err, group) {
      group.members.remove(req.body.members);

      group.save(function(err) {
        return res.ok({
          group: group
        })
      })
    });
  }
};

