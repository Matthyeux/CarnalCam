/**
 * Created by Matth on 20/10/2016.
 */

module.exports = function (req, res, next) {


  if(req.options.controller === 'user' || req.options.controller === 'usergroup') {
    switch(req.options.action) {
      case 'updategroup':
        UserGroup.find({id: req.body.groups }).populate('members').exec(function(err, groups) {
          groups.map(function(group) {
            group.members.map(function(member) {
              if(member.id == req.param('id')) {
                req.body.groups.splice(
                  req.body.groups.indexOf(group),
                  1
                )
              }
            })
          });
        });
        break;
      case 'updateuser':
        User.find({id: req.body.members}).populate('groups').exec(function(err, members) {
          members.map(function(member) {
            member.groups.map(function(group) {
              if(group.id == req.param('id')) {
                req.body.members.splice(
                  req.body.members.indexOf(member),
                  1
                )
              }
            })
          })
        });
        break;

    }
  } else if(req.options.controller === 'device' || req.options.controller === 'devicegroup') {
    switch(req.options.action) {
      case 'updategroup':
        DeviceGroup.find({id: req.body.groups }).populate('members').exec(function(err, groups) {
          groups.map(function(group) {
            group.members.map(function(member) {
              if(member.id == req.param('id')) {
                req.body.groups.splice(
                  req.body.groups.indexOf(group),
                  1
                )
              }
            })
          });
        });
        break;
      case 'updatedevice':
        Device.find({id: req.body.members}).populate('groups').exec(function(err, members) {
          members.map(function(member) {
            member.groups.map(function(group) {
              if(group.id == req.param('id')) {
                req.body.members.splice(
                  req.body.members.indexOf(member),
                  1
                )
              }
            })
          })
        });
        break;
    }
  }

  return next();

};
