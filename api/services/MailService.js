module.exports = {

  resetPassword: function(user, token) {
    sails.hooks.email.send(
      "resetpassword", {
        name: user.username,
        firstname: user.firstName,
        lastname: user.lastName,
        url: 'http://localhost/reset/'+token,
        token: token,
        product: "carnalcam"
      }, {
        to: user.email,
        subject: "Reset password"
      },
      function(err) {}
    )
  }

}
