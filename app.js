const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const home = require('./src/routes/home');

// 앱 세팅
app.set('views', "./src/views");
app.set('view engine', 'ejs');
// 미들웨어
app.use(express.static(`${__dirname}/src/public`))
app.use(bodyParser.json());
//인코딩 위함
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', home);

module.exports = app;