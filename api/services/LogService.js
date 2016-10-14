function LogService(){

  return{
    UserLogin: function (user) {
      Log.create({user: user, device: null, type: "LOGIN", description:"User login "+user.username}).exec(function createCB(err, created){
        if(err) {
          return console.log(err);
        }
      });
    },
    UserCreate: function (user) {
      Log.create({user: user, device: null, type: "CREATE", description:"User create "+user.username}).exec(function createCB(err, created){
        if(err) {
          return console.log(err);
        }
      });
    },
    UserUpdate: function (user) {
      Log.create({user: user, device: null, type: "UPDATE", description:"User update "+user.username}).exec(function createCB(err, created){
        if(err) {
          return console.log(err);
        }
      });
    },
    UserDelete: function (user) {
      Log.create({user: user, device: null, type: "DELETE", description:"User delete "+user.username}).exec(function createCB(err, created){
        if(err) {
          return console.log(err);
        }
      });
    },

    UserAddGroup: function (user, group) {
      Log.create({user: user, device: null, type: "Add Group", description:"User : "+user.username+" add group :"+group.name}).exec(function createCB(err, created){
        if(err) {
          return console.log(err);
        }
      });
    },
    UserDeleteGroup: function (user, group) {
      Log.create({user: user, device: null, type: "Delete Group", description:"User : "+user.username+" delete group :"+group.name}).exec(function createCB(err, created){
        if(err) {
          return console.log(err);
        }
      });
    },

    DeviceCreate: function (device) {
      Log.create({user: null, device: device, type: "CREATE", description:"Device create "+device.name}).exec(function createCB(err, created){
        if(err) {
          return console.log(err);
        }
      });
    },
    DeviceDelete: function (device) {
      Log.create({user: null, device: device, type: "DELETE", description:"Device delete "+device.name}).exec(function createCB(err, created){
        if(err) {
          return console.log(err);
        }
      });
    },

    DeviceStartRecording: function (user, device) {
      Log.create({user: user, device: device, type: "REC", description:"Device "+device.name+" start recording by "+user.username}).exec(function createCB(err, created){
        if(err) {
          return console.log(err);
        }
      });
    },
    DeviceStopRecording: function (user, device) {
      Log.create({user: user, device: device, type: "REC", description:"Device "+device.name+" stop recording by "+user.username}).exec(function createCB(err, created){
        if(err) {
          return console.log(err);
        }
      });
    },
    DeviceChangePosition: function (user, device) {
      Log.create({user: user, device: device, type: "POSITION", description:"Device "+device.name+" change position "+device.position+" by "+user.username}).exec(function createCB(err, created){
        if(err) {
          return console.log(err);
        }
      });
    },

    DeviceAddGroup: function (device, group) {
      Log.create({user: null, device: device, type: "CREATE", description:"Device "+device.name+" add group :"+group.name}).exec(function createCB(err, created){
        if(err) {
          return console.log(err);
        }
      });
    },
    DeviceDeleteGroup: function (device, group) {
      Log.create({user: null, device: device, type: "DELETE", description:"Device "+device.name+" delete group :"+group.name}).exec(function createCB(err, created){
        if(err) {
          return console.log(err);
        }
      });
    },



  }

}

module.exports = LogService();
