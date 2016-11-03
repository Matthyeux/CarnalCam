/**
 * DeviceController
 *
 * @description :: Server-side logic for managing Devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  findDevice: function(req, res, next) {
    if(req.user.isAdmin) {
      return next();
    } else {
      Device.suscribe(req, _.pluck(req.user.visibledevices, 'id'));
      return res.ok(
        req.user.visibledevices
      );
    }
  },

  findOneDevice: function(req, res, next) {
    if(req.user.isAdmin) {
      return next();
    } else {
      var isAuthorized = false;
      req.user.visibledevices.map(function(device) {
        if(device.id === req.param('id')) {
          isAuthorized = true;
          Device.suscribe(req, device.id);
        }
      });

      if(isAuthorized) return next();
      else return res.unauthorized();
    }
  },

  createDevice: function(req, res, next) {
    return next();
  },

  updateDevice: function(req, res, next) {
    if(req.user.isAdmin) {
      if(req.body.hasOwnProperty("groups") && req.body.groups > 0) {
        DeviceGroup.find({id: req.body.groups}).then(function (groups) {
          groups.map(function (group) {
            Device.findOne({id: req.param('id')}).exec(function (err, device) {
              LogService.DeviceAddGroup(group, device)
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

  destroyDevice: function(req, res, next) {
    if(req.user.isAdmin) {
      return next();
    } else {
      return res.unauthorized();
    }
  },

  /*createDevice: function(req, res) {
    Device.findOrCreate({identifier: req.body.identifier,name: req.body.name}).exec(function(err, device) {
      DeviceGroup.findOrCreate({name: device.name}).exec(function(err, devicegroup) {
        if(err) return res.serverError(err);
        return res.ok({
          device: device,
          devicegroup: devicegroup
        });
      })
    });
  },*/

  removeGroup: function(req, res){
    Device.findOne({id: req.param('id')}).populate('groups').exec(function(err, device) {

      device.groups.map(function(group) {
        LogService.DeviceDeleteGroup(device, group);
      });

      device.groups.remove(req.body.groups);
      device.save(function(err) {
        return res.ok(
          device
        )
      })
    });
  },
};

