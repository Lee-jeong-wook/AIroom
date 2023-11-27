"use strict"

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');

// ctrl 폴더에서 output이나 process 꺼내기
router.get('/', ctrl.output.home);
router.get('/list', ctrl.output.list);

router.post('/list', ctrl.process.list)
router.post('/edit', ctrl.process.edit)

module.exports= router;