"use strict";
// const FirebaseApp = require("firebase/app");
const firebase = require("../../db/db");
const firestoreDB = require("firebase/firestore");
const db = firestoreDB.getFirestore(firebase);

const output = {
    home : (req, res) => {
        const today = new Date();
        res.render('home/index')
    },
    list : (req, res) => {
        res.send('hi');
    }
}


//post방식으로 보낼 코드
const process = {
    list : async (req, res) => {
        try {    
            const data = req.body.param;  
            console.log({...data});
            console.log(db);
            
            const user = await firestoreDB.addDoc(firestoreDB.collection(db, 'AI-ROOM'), {...data})

            console.log(user);

            res.send("Record saved successfully");  
    } catch (error) {    console.log(error)  }
    },
    edit : (req, res) => {
        const data = req.body;

        console.log(data);
        return res.json({data : data.param});
    }
};


module.exports = {
    output,
    process
}