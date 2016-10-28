/**
 * Created by Matth on 21/10/2016.
 */
module.exports.email = {
  service: "Mailgun",
  auth: {
    user: "postmaster@sandbox0d07c9cd414440e6b90b5f43b2b717d2.mailgun.org",
    pass: "d206fad7920c12624d93ed03f94a8491"
  },
  templateDir: "api/mailtemplates",
  from: "no-reply@carnalcam.fr",
  testMode: false,
  ssl: true
}
