/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    schema: true,

    attributes: {
        username: {
          type: 'string',
          required: true,
          unique: true,
          alphanumericdashed: true
        },
        email: {
          type: 'email',
          required: true,
          unique: true
        },
        password: {
          type: 'string',
          required: true
        },
        firstName: {
          type: 'string'
        },
        lastName: {
          type: 'string'
        },
        isAdmin: {
          type: 'boolean',
          defaultsTo: false
        },
        groups: {
	        collection: 'UserGroup',
	        via: 'members',
	        dominant: true
        },
        logs: {
	        collection: 'Log',
	        via: 'user'
        },
        resetPasswordToken: {
          type: 'string',
          unique: true,
          default: null
        },
        resetPasswordExpires: {
          type: 'integer',
          default: null
        },


        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            delete obj.createdAt;
            delete obj.updatedAt;
	          delete obj.logs;
            /*  delete obj.id;*/
            return obj;
        }
    },
    beforeCreate: function (values, next) {
        SecurityService.hashPassword(values);
        next();
    },
    beforeUpdate: function (values, next) {
        SecurityService.hashPassword(values);
        next();
    }

};

