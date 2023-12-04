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
            console.log(req.body);
            const data = req.body.param;  
            console.log({...data});
            const user = new User(data); 
            const result = await user.setItems();
            console.log(result);

            res.send("Record saved successfully");  
    } catch (error) {    console.log(error)  }
    },
    edit : async (req, res) => {
        try {    
            const data = req.body.param;  
            console.log({...data});
            const user = new User(data); 
            const result = await user.editItems();
            location.reload();

            res.send("Record saved successfully");  
    } catch (error) {    console.log(error)  }
    },
    image : async (req, res) => {
        try {
            console.log('hello');
            const file = document.querySelector("#image").file[0];
            const data = req.body.param;
            console.log({...data});
            
            
    } catch (error) {   console.log(error)};
    },
    users : async (req, res) => {
        try {
        const data = req.body.param;
        console.log({...data});   
        const result = await user.editItems();
        location.reload();


    } catch (error) {   console.log(error)};
    }
};


module.exports = {
    output,
    process
}