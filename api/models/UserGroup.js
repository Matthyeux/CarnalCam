/**
 * UserGroup.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	  name: {
      type: 'string',
      required: true,
      unique: true
    },
  	role: {
	    model: 'Role'
    },
    members: {
        collection: 'User',
        via: 'groups'
    },

    toJSON: function() {
      var object = this.toObject();
      if(object.members != null) {
        object.membersCount = object.members.length;
      }
      return object;
    }
  }
};

