// app.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const path = require("path");
const socketIO = require('socket.io');
const io = socketIO(server);

const home = require('./src/routes/home');

// 앱 세팅
app.set('views', "./src/views");
app.set('view engine', 'ejs');
// 미들웨어
app.use(express.static(`${__dirname}/src`))
// const socketPath = '/path/to/socket.io-client';
// app.use(socketPath, express.static(path.join(__dirname, 'node_modules', 'socket.io-client', 'dist')));
app.use(bodyParser.json());
// 인코딩 위함
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', home);


io.on('connection', (socket)=>{
    console.log('연결');
    socket.on('chatting', (data)=>{
        const {name, msg} = data;
        io.emit('chatting', {
            id, 
            StudentID, 
            name, 
            startTime, 
            endTime
        })
    })
})

// io.path('/socket.io');


module.exports = server;
