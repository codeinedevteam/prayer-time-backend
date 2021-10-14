var admin = require("firebase-admin");

var serviceAccount = require("./prayer-times-2b4ba-firebase-adminsdk-e1qks-7380f1457a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

  
});
module.exports = admin