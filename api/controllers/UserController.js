/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	me: function(req,res){
		return res.ok({
			user: req.user,
		})
	},

	removeGroup: function(req, res){
	  User.findOne({id: req.param('id')}).populate('groups').exec(function(err, user) {
	    user.groups.remove(req.body.groups);

      user.save(function(err) {
        return res.ok({
          user: user
        })
      })
    });
  }
};

