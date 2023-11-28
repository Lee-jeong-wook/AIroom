// import { io } from "socket.io-client";
const socket = io('http://localhost:3000');

const StudentID = document.querySelectorAll('.SID');
const name = document.querySelectorAll('.name');
const startTime = document.querySelectorAll('.start');
const endTime = document.querySelectorAll('.end');
const sendBtn = document.querySelector('.button');
const today = new Date();

console.log('hi');

socket.on('connect', () => {
    console.log('서버와 연결 성공');
});

const editHandler = () => {
    const param = {
        StudentID,
        endTime,
        img
    }
    fetch('/edit', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            param: param,
        }),
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        console.log(res.data);
    });
}

const sendHandler = () => {
    console.log(name.length);
    let param = [];
    for(let i = 0; i < name.length; i++){
        param.push({
            id: Math.floor(Math.random() * 100000),
            StudentID: StudentID[i].value,
            name: name[i].value,
            startTime: startTime[i].value,
            endTime: endTime[i].value,
            isLast : false,
            date: today.getDay()
        });
    }
    socket.emit('chatting', param);
    console.log(param);
    fetch('/list', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            param: param,
        }),
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        console.log(res.data);
    });
}

sendBtn.addEventListener('click', sendHandler);

socket.on('chatting', (data) => {
    const cleanData = JSON.parse(JSON.stringify(data));
    console.log('받은 데이터:', cleanData);
});
