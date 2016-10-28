
module.exports = function(req, res, next) {
  if(req.headers.authorization) {
    var token = req.headers.authorization.split(' ')[1];
    json = SecurityService.decodeJWT(token);
    if (json.user !== null) {
      if (json.user.isAdmin || json.user.id === req.param('id')) return next();
      else {
        User.findOne({id: req.param('id')}).populate('groups')
          .then(function(user) {
            if(user != null && user.groups != null) {
              var groups = user.groups.map(function(group) { return group.id });
              return UserGroup.find({id: groups}).populate('members');
            }
          }).then(function(groups) {
          var isAuthorized = false;
          groups.map(function(group) {
            group.members.map(function(member) {
              if(member.id === json.user.id) isAuthorized = true;
            })
          });
          if(isAuthorized) return next();
          else return res.unauthorized("You are not authorized to fetch this user");
        }).catch(function(error) {
          return res.serverError(error);
        });
      }
    }
  } else {
    return res.serverError('Authorization not found');
  }
};
