const firebase = require("firebase-admin");
const config = require("../../config"); 
const db = firebase.initializeApp(config.firebaseConfig);
console.log(db)
module.exports = db;