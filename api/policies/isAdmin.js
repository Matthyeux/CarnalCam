
module.exports = function(req, res, next) {
  if(req.headers.authorization) {
    var token = req.headers.authorization.split(' ')[1];
    json = SecurityService.decodeJWT(token);
    if(json.user !== null) {
      if(!json.user.isAdmin) return res.unauthorized("You aren't an system administrator");
      else return next();
    }
  }
  return res.serverError("Authentication error");
};
