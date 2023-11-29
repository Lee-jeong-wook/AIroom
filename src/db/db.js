const firebase = require("firebase/app");
const config = require("../../config"); 
const db = firebase.initializeApp(config.firebaseConfig);
module.exports = db;