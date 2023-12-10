//input //
const subAddImg = document.querySelector('.sub-add-img a');
let marginValues = ['0 0 10px 260px', '0 0 10px 80px', '0 0 10px 150px', '0 0 10px 160px'];
let currentIndex = 0;

const header = document.querySelector('.head');
const h1 = header.querySelector('h1');
const h2 = header.querySelector('h2');
const last = document.getElementsByClassName('last-img')[0];

const changeImg = document.querySelector(".change-img");

const closeButton = document.createElement('a');
closeButton.href = '#';
closeButton.innerText = 'x';
closeButton.classList.add('bottn');

last.appendChild(closeButton);

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
