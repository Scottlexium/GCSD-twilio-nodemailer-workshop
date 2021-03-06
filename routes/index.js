var express = require('express');
var router = express.Router();
const getRoutes = require('../controller/get')
const postRoutes = require('../controller/post')

/* GET home page. */
router.get('/', getRoutes.home_get);
router.post('/send_sms', postRoutes.send_sms);
router.post('/voice_send', postRoutes.voice_send);
router.post('/login', postRoutes.login);
router.post('/add-todo', postRoutes.add_todo);
module.exports = router;
