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
      if(req.isSocket) Device.subscribe(req, _.pluck(req.user.visibledevices, 'id'));
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
          if(req.isSocket) Device.subscribe(req, device.id);
        }
      });

      if(isAuthorized) return next();
      else return res.unauthorized();
    }
  },

  createDevice: function(req, res, next) {
    Device.findOrCreate({identifier: req.body.identifier, name: req.body.name, position: req.body.position}).exec(function(err, device) {
      if(err) return res.serverError(err);
      if(req.isSocket) Device.subscribe(req, device.id);
      Device.publishCreate(device.id, device, req);
      DeviceGroup.findOrCreate({name: device.name}).populate('devices').exec(function(err, devicegroup) {
        if(err) return res.serverError(err);
        devicegroup.devices.add(device);
        devicegroup.save(function(err) {});
        return res.ok({
          device: device,
          devicegroup: devicegroup
        });
      })
    });
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
        })
      }
      return next();
    } else if(req.body.position != null || req.body.recording != null) {

      if(req.body.position != null) {
        Device.update({id: req.param('id')}, {position: req.body.position}).exec(function(err, device) {
          if(err) return res.serverError(err);
          Device.publishUpdate(device.id, device, req);
          return res.ok(device);
        })
      }

      if(req.body.recording != null) {
        Device.update({id: req.param('id')},{recording: req.body.recording}).exec(function(err, device) {
          if(err) return res.serverError(err);
          Device.publishUpdate(device.id, device, req);
          return res.ok(device);
        })
      }

    } else {
      return res.unauthorized();
    }

  },

  destroyDevice: function(req, res, next) {
    if(req.isSocket) Device.unsubscribe(req, req.param('id'));
    else if(req.user.isAdmin) {
      return next();
    } else {
      return res.unauthorized();
    }
  },

  removeGroup: function(req, res){
    Device.findOne({id: req.param('id')}).populate('groups').exec(function(err, device) {

      device.groups.map(function(group) {
        LogService.DeviceDeleteGroup(device, group);
      });

      device.groups.remove(req.body.groups);
      device.save(function(err) {
        Device.publishUpdate(device.id, device, req);
        return res.ok(
          device
        )
      })
    });
  }
};

