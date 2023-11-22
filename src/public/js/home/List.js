import { io } from "/socket.io";
const socket = io();

const StudentID = document.querySelector('.SID');
const name = document.querySelector('.name');
const startTime = document.querySelector('.start');
const endTime = document.querySelector('.end');
const sendBtn = document.querySelector('.button');

console.log('hi');

socket.on('connect', () => {
    console.log('서버와 연결 성공');
});

const send = () => {
    const param = {
        id: Math.floor(Math.random() * 100000),
        StudentID: StudentID.value,
        name: name.value,
        startTime: startTime.value,
        endTime: endTime.value
    }
    socket.emit('chatting', param);
}

sendBtn.addEventListener('click', send);

socket.on('chatting', (data) => {
    const { id, StudentID, name, startTime, endTime } = data;
    console.log(id, StudentID, name, startTime, endTime);
});
