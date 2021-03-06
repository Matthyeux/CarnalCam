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
	    type: "string",
      enum: ["none", "viewer", "manager"],
      defaultsTo: "none"
    },
    members: {
      collection: 'User',
      via: 'groups'
    },
    devicesgroups: {
      collection: 'DeviceGroup'
    }
  }
};

