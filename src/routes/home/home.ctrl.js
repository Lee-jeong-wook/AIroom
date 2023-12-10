"use strict";
const User = require('../../Model/user');

const output = {
    /**
     * @param {*} req 받지않음
     * @param {*} res getItem에 get 요청을 날려 오늘 날짜가 아닌 것을 지우고 현재 있는 데이터 반환
     */
    home : async (req, res) => {
        const user = new User();
        const results = await user.getItems();
        res.render('home/index', {results})
    }
}


//post방식으로 보낼 코드
const process = {
    /**
     * 
     * @param {*} req 등록하려는 사람들의 데이터를 받아옴
     * @param {*} res 성공했다는 msg 반환
     */
    list : async (req, res) => {
        try {    
            const data = req.body.param;  
            const user = new User(data); 
            const result = await user.setItems();

            res.send("Record saved successfully");  
    } catch (error) {    console.log(error)  }
    },
    /**
     * @param {*} req id, 끝나는 시간을 받아온다
     * @param {*} res 강제 리로드 시킨 후 데이터를 바꾼 get 요청을 날린다, 그리고 성공했다는 메세지를 보낸다
     */
    edit : async (req, res) => {
        try {    
            const data = req.body.param;  
            console.log({...data});
            const user = new User(data); 
            const result = await user.editItems();

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