"use strict";
const User = require('../../Model/user');

const output = {
    home : async (req, res) => {
        const user = new User();
        const result = await user.getItems();
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
            const user = new User(data); 
            const result = await user.setItems();
            console.log(result);

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