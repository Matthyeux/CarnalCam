/**
 * Device.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
		name: {
			type: 'string',
			unique: true
		},
		recording: {
			type: 'boolean',
			defaultsTo: false
		},
		identifier: {
			type: 'string',
      required: true,
      unique: true
		},
		position: {
			type: 'string'
		},
		groups: {
      collection: 'DeviceGroup',
      via: 'members',
      dominant: true
    }
  }
};

