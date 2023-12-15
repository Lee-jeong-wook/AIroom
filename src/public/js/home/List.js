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


/**
 * 이미지 전송 버튼이 클릭되면 이미지를 저장시키는 함수(개발중)
 */
imgBtn.addEventListener('click', () => {
    console.log(file.files[0]);
    const param = {
        img : file.files[0],
        id : imgID.value,
        date : today.getDate()
    }
    fetch("/image", {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        //https://ko.javascript.info/formdata 참고
        body: JSON.stringify({
            param: param,
        }),
    })
})

/**
 * 학번과 시간을 받고 변경시킬 데이터를 서버에 보내는 함수
 */
editBtn.addEventListener('click', () => {
    const data = {
        editID : editID.value,
        editTime : editTime.value
    }
    editHandler(data);
})
/**
 * 변경 시간을 현재 시간으로 바꿔서 서버에 보내는 함수
 */
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
        editID : data.editID,
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
        console.log("hi");
        window.location.reload();
    });
}

/**
 * 
 * @param {} data 웹 소켓으로 데이터를 받아와서 리스트 생성시키는 함수
 */
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

    const curTime = `${today.getHours()}:${today.getMinutes()}`;
    const comTime = curTime.split(":");
    const userTime = data[0].endTime.split(":");
    console.log(userTime);
    if (comTime[0] < userTime[0]) return;
    if (comTime[1] < userTime[1]) return;
    container.style.backgroundColor = "#ccc";
}

/**
 * 전송버튼이 클릭되면 정보를 서버와 소켓으로 보내는 함수
 */
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

/**
 * 전송버튼이 클릭되면 sedHandler 호출
 */
sendBtn.addEventListener('click', sendHandler);

/**
 * 소켓에서 데이터를 받으면 listHandler 호출
 */
socket.on('chatting', (data) => {
    const cleanData = JSON.parse(JSON.stringify(data));
    console.log('받은 데이터:', cleanData);
    listHandler(cleanData)
});
