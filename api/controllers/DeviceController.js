/**
 * DeviceController
 *
 * @description :: Server-side logic for managing Devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  removeGroup: function(req, res){
    Device.findOne({id: req.param('id')}).populate('groups').exec(function(err, device) {

      device.groups.map(function(group) {
        LogService.DeviceDeleteGroup(device, group);
      });

      device.groups.remove(req.body.groups);
      device.save(function(err) {
        return res.ok({
          device: device
        })
      })
    });
  },

  updateGroup: function(req, res, next) {
    if(req.body.groups.length > 1) {
      DeviceGroup.find({id: req.body.groups}).exec(function(err, groups) {

        groups.map(function(group) {
          Device.findOne({id: req.param('id')}).exec(function(err, device) {
            LogService.DeviceAddGroup(device, group)
          })
        })
      });
    }
    return next();
  }
};

