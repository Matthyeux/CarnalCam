
module.exports = function(req, res, next) {
  if(req.headers.authorization) {
    var token = req.headers.authorization.split(' ')[1];
    json = SecurityService.decodeJWT(token);
    if(json.user !== null) {
      req.user = json.user;
      if(req.user.isAdmin) return next();

      User.findOne({id: json.user.id}).populate('groups').then(function(user) {
        req.user = user;
        if(req.user.hasOwnProperty('groups'))
          return UserGroup.find({id: user.groups.map(function(group) {return group.id})}).populate('members').populate('devicesgroups')
      }).then(function(groups) {
        if(groups != null) groups.map(function(group) {
          if(group.hasOwnProperty('members')) req.user.visiblemembers = group.members;
          if(group.hasOwnProperty('devicesgroups')) {
            req.user.devicesgroups = group.devicesgroups;
            return DeviceGroup.find({id: group.devicesgroups.map(function(devicegroup) {return devicegroup.id})}).populate('devices')
          }
        })
      }).then(function(devicegroups) {
        if(devicegroups != null) devicegroups.map(function(devicegroup) {
          if(devicegroup.hasOwnProperty('devices')) req.user.visibledevices = devicegroup.devices;
        })
      }).then(function() {
        return next();
      }).catch(function(error) {
        return res.serverError(error.message);
      });
    }
  } else {
    return res.serverError("Authentication error");
  }
};
