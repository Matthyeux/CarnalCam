/**
 * DeviceController
 *
 * @description :: Server-side logic for managing Devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  removeGroup: function(req, res){
    Device.findOne({id: req.param('id')}).populate('groups').exec(function(err, device) {
      device.groups.remove(req.body.groups);

      device.save(function(err) {
        return res.ok({
          device: device
        })
      })
    });
  }
};

