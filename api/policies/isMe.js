

module.exports = function(req, res, next) {
  if(req.headers.authorization) {
    var token = req.headers.authorization.split(' ')[1];
    json = SecurityService.decodeJWT(token);
    if (json.user !== null && json.user.id === req.param('id')) {
      req.user = json.user;
    } else {
      return res.unauthorized();
    }
  } else {
    return res.unauthorized();
  }
  return next();
};
