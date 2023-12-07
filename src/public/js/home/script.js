//input //
const subAddImg = document.querySelector('.sub-add-img a');
let marginValues = ['0 0 10px 260px', '0 0 10px 80px', '0 0 10px 150px', '0 0 10px 160px'];
let currentIndex = 0;

subAddImg.addEventListener('click', () => {
    const container = document.createElement('div');
    container.classList.add('poriv');
    container.style.display = 'inline-flex';
    container.style.margin = marginValues[currentIndex];

    const newInput = document.createElement('input');
    newInput.type = 'text';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    deleteButton.style.width = '30px';
    deleteButton.style.height = '30px';
    deleteButton.style.fontSize = '18px';
    deleteButton.style.backgroundColor = 'red';
    deleteButton.style.color = 'white';
    deleteButton.style.border = 'none';
    deleteButton.style.cursor = 'pointer';

    deleteButton.addEventListener('click', () => {
        container.remove();
    });

    container.appendChild(newInput);
    container.appendChild(deleteButton);

    document.body.appendChild(container);

    currentIndex = (currentIndex + 1) % marginValues.length; 
});
//팝업//
const header = document.querySelector('.head');
const h1 = header.querySelector('h1');
const h2 = header.querySelector('h2');
const last = document.getElementsByClassName('last-img')[0];

const closeButton = document.createElement('a');
closeButton.href = '#';
closeButton.innerText = 'x';
closeButton.classList.add('bottn');

last.appendChild(closeButton);

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
