// import { io } from "socket.io-client";
const socket = io('http://localhost:3000');

const StudentID = document.querySelector('.SID');
const name = document.querySelector('.name');
const startTime = document.querySelector('.start');
const endTime = document.querySelector('.end');
const sendBtn = document.querySelector('.button');

console.log('hi');

socket.on('connect', () => {
    console.log('서버와 연결 성공');
});

const sendHandler = () => {
    const param = {
        id: Math.floor(Math.random() * 100000),
        StudentID: StudentID.value,
        name: name.value,
        startTime: startTime.value,
        endTime: endTime.value
    }
    socket.emit('chatting', param);
    fetch('/list', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            param : param,
          }),
    }).then((res) => {
        console.log(res);
    })
}

sendBtn.addEventListener('click', sendHandler);

socket.on('chatting', (data) => {
    const { id, StudentID, name, startTime, endTime } = data;
    console.log(id, StudentID, name, startTime, endTime);
});
