"use strict";

const output = {
    home : (req, res) => {
        res.render('home/index')
    }
}


//post방식으로 보낼 코드
const process = {
    list : (req, res) => {
        const data = req.body;
        console.log(data);
        return res.json({data : data});
    }
};


module.exports = {
    output,
    process
}