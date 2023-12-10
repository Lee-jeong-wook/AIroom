//input //
const subAddImg = document.querySelector('.sub-add-img a');
let marginValues = ['0 0 10px 260px', '0 0 10px 80px', '0 0 10px 150px', '0 0 10px 160px'];
let currentIndex = 0;

const header = document.querySelector('.head');
const h1 = header.querySelector('h1');
const h2 = header.querySelector('h2');
const last = document.getElementsByClassName('last-img')[0];


const closeButton = document.createElement('a');
closeButton.href = '#';
closeButton.innerText = 'x';
closeButton.classList.add('bottn');

last.appendChild(closeButton);


const changeImg = document.querySelector(".change-img");
let isChange = false;
changeImg.addEventListener("click", () => {
    console.log(isChange);
    if(isChange){
        changeImg.parentElement.classList.remove("active");         
    }else{
        changeImg.parentElement.classList.add("active");
    }
    isChange = !isChange;
})

const endTimes = document.querySelectorAll('.user-end')
const endHandler = () => {
    console.log("hi");
    const day = new Date();
    const curTime = `${day.getHours()}:${day.getMinutes()}`;
    const comTime = curTime.split(":");
    endTimes.forEach((endtime) => {
        const userTime = endtime.innerText.split(":");
        console.log(comTime);
        console.log(userTime);
        if (comTime[0] < userTime[0]) return;
        console.log("work");
        if (comTime[1] < userTime[1]) return;
        console.log("work");
        endtime.parentElement.style.backgroundColor = "#ccc";
    })
}
endHandler();

h2.onclick = function (event) {
    event.stopPropagation();
    last.style.display = 'block';
    last.classList.add('your-css-class');
};
closeButton.onclick = function (event) {
    event.stopPropagation(); 
    last.style.display = 'none';
};
h1.onclick = function (event) {
    event.stopPropagation();
};
header.onclick = function (event) {
    event.stopPropagation();
};

document.addEventListener('click', function () {
    last.style.display = 'none';
});
document.body.addEventListener('click', function (event) {
    event.stopPropagation();
});
