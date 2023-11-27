"use strict";
const { FirebaseApp } = require("@firebase/app-types");
const firebase = require("../../db/db")
const firestore = require('firebase/firestore');
const db = firestore.getFirestore(firebase, "AI-ROOM");

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
            console.log({...data})
            const user = await db.collection("AI-ROOM").doc().set({...data});  
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