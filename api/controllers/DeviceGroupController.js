/**
 * DeviceGroupController
 *
 * @description :: Server-side logic for managing Devicegroups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  findDeviceGroup: function (req, res, next) {
    if(req.user.isAdmin) {
      return next();
    } else {
      DeviceGroup.suscribe(req, _.pluck(req.user.devicesgroups));
      return res.ok(
        req.user.devicesgroups
      )
    }
  },

  findOneDeviceGroup: function(req, res, next) {
    if(req.user.isAdmin) {
      return next();
    } else {
      var isAuthorized = false;
      req.user.devicesgroups.map(function(devicegroup) {
        if(devicegroup.id === req.param('id')) {
          DeviceGroup.suscribe(req, devicegroup.id);
          isAuthorized = true;
        }
      });

      if(isAuthorized) return next();
      else return res.unauthorized();
    }
  },

  createDeviceGroup: function(req, res, next) {
    if(req.user.isAdmin) {
      return next();
    } else {
      return res.unauthorized();
    }
  },

  updateDeviceGroup: function(req, res, next) {
    if(req.user.isAdmin) {
      if(req.body.hasOwnProperty("devices") && req.body.devices > 0) {
        Device.find({id: req.body.devices}).then(function (devices) {
          devices.map(function (device) {
            DeviceGroup.findOne({id: req.param('id')}).exec(function (err, group) {
              LogService.DeviceAddGroup(device, group)
            })
          })
        }).then(function () {
          return next()
        }).catch(function (error) {
          res.serverError(error.message);
        })
      }
    } else {
      return res.unauthorized();
    }
  },

  destroyDeviceGroup: function(req, res, next) {
    if(req.user.isAdmin) {
      return next();
    } else {
      return res.unauthorized();
    }
  },

  removeDevice: function(req, res){
    DeviceGroup.findOne({id: req.param('id')}).populate('devices').exec(function(err, group) {

      group.devices.map(function(device) {
        LogService.DeviceDeleteGroup(device, group);
      });

      group.devices.remove(req.body.devices);

      group.save(function(err) {
        return res.ok(
          group
        )
      })
    });
  },
};

