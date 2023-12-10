// import { io } from "socket.io-client";
const socket = io('http://localhost:3000');

const StudentID = document.querySelectorAll('.SID');
const name = document.querySelectorAll('.name');
const startTime = document.querySelectorAll('.start');
const endTime = document.querySelectorAll('.end');
const sendBtn = document.querySelector('.submit-button');
const listContainer = document.querySelector('.container-main');
const editID = document.querySelector(".hidden-SID");
const editTime = document.querySelector('.hidden-end');
const leaveBtn = document.querySelector('.leave');
const editBtn = document.querySelector('.edit-button');
const file = document.querySelector('.img-file');
const imgID = document.querySelector('.img-id');
const imgBtn = document.querySelector('.img-btn');
const today = new Date();

socket.on('connect', () => {
    console.log('서버와 연결 성공');
});

imgBtn.addEventListener('click', () => {
    console.log(file.value);
    const param = {
        img : file.value,
        id : imgID.value
    }
    fetch('/image', {
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
})


editBtn.addEventListener('click', () => {
    console.log("hi");
    const data = {
        editID : editID.value,
        editTime : editTime.value
    }
    editHandler(data);
})
leaveBtn.addEventListener('click', () => {
    const data = {
        editID : editID.value,
        editTime : `${today.getHours()}:${today.getMinutes()}`
    }
    console.log(data.editTime);
    editHandler(data);
})

const editHandler = (data) => {
    const param = {
        StudentID : data.editID,
        endTime: data.editTime,
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
        window.location.reload();
    });
}

const listHandler = (data) => {
    console.log("hi");
    const container = document.createElement('div');
    container.classList.add("main-list");
    const StudentID = document.createElement("span");
    const StudentName = document.createElement("span");
    const StudentStart = document.createElement("span");
    const StudentEnd = document.createElement("span");
    StudentID.innerText = data[0].StudentID;
    StudentName.innerText = data[0].name;
    StudentStart.innerText = data[0].startTime;
    StudentEnd.innerText = data[0].endTime;

    listContainer.appendChild(container);
    container.appendChild(StudentID);
    container.appendChild(StudentName);
    container.appendChild(StudentStart);
    container.appendChild(StudentEnd);
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
            date: today.getDate()
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

const imageHandler = () => {
    
    fetch("/image", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            param: param,
        }),
    })
}

const usersHandler = () => {
    console.log(name.length);
    let param = [];
    for(let i = 0; i < name.length; i++) {
        param.push({
            id: Math.floor(Math.random() * 100000),
            StudentID: StudentID[i].value,
            name: name[i].value,
            startTime: startTime[i].value,
            endTime: endTime[i].value,
            isLast: true,
            data: today.getDay(),
        });
    }
    fetch('/users', {
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
    listHandler(cleanData)
});
