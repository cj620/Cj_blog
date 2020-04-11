var express = require('express')
var user = require('./controllers/userController');
var index = require('./controllers/indexController');
var topics = require('./controllers/topicController');
var comment = require('./controllers/commentController');
var zy=require("./controllers/zyController");


var router = express.Router()

router.use('/', index);
router.use('/', user);
router.use('/', topics);
router.use('/', comment);
router.use('/', zy);
router.use(function (req, res) {
    res.render("./404.html");
});

module.exports = router
