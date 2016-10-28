module.exports = function(req, res, next) {

  if(req.headers.authorization) {
    var token = req.headers.authorization.split(' ')[1];
    json = SecurityService.decodeJWT(token);
    if (json.user !== null) {
      if (json.user.isAdmin) return next();
      else {
        UserGroup.findOne({id: req.param(('id'))}).populate('members').then(function(group) {
          if(!group) throw new Error("Group not found");

          var isAuthorized = false;
          group.members.map(function(member) {
            if(member.id === json.user.id) isAuthorized = true;
          });

          return isAuthorized;

        }).then(function(isAuthorized) {
          if(isAuthorized) return next();
          else return res.unauthorized();
        }).catch(function(error) {
          return res.notFound(error.message);
        })

      }
    }
  } else {
    return res.unauthorized();
  }

};
