/**
 * Device.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
		name: {
			type: 'string'
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
			type: 'integer',
      required: true
		},
		groups: {
      collection: 'DeviceGroup',
      via: 'devices',
      dominant: true
    }
  }
};

