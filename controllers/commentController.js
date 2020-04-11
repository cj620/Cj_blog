var express = require('express');
var Comment = require('./../models/comment');
var Topic = require('./../models/topic');
var router = express.Router();

router.post('/comment/new', function (req, res) {
    var body = req.body;
    if (req.session.user == undefined || req.session.user == null){
        res.status(200).json({
            err_code: 1,
            message: '请先登录'
        })
    }
    body.comment_author_id=req.session.user._id;
    body.comment_author_nick=req.session.user.nickname;
    body.topic_id=body.topic_id.replace(/"/g, '');
    body._id=null;
    // console.log(body);
    new Comment(body).save(function (err, comment) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Internal error.'
            })
        }
        res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
        Topic.findById(body.topic_id,function (err, topic) {
            if (!err)
            topic.reply++;
            Topic.findByIdAndUpdate(body.topic_id,topic,function (err, data) {
            })
        })
    })
});
module.exports = router;