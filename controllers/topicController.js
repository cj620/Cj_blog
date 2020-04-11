var express = require('express');
var Topic = require('./../models/topic');
var Comment = require('./../models/comment');
var router = express.Router();
var markdown = require('markdown').markdown;

router.get('/topics/new', function (req, res) {
    res.render('./topic/new.html', {
        user: req.session.user
    })
});

router.post('/topics/new', function (req, res) {
    var body = req.body;
    if (req.session.user == undefined || req.session.user == null){
        res.status(200).json({
            err_code: 1,
            message: '请先登录'
        })
    }
    body.topic_author_id=req.session.user._id;
    body.topic_author_avatar=req.session.user.avatar;
    body.topic_author_nick=req.session.user.nickname;
    body._id=null;
    // console.log(body);
    new Topic(body).save(function (err, topic) {
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
    })
    // res.render('./topic/new.html', {
    //     user: req.session.user
    // })
});
router.get('/topics', function (req, res) {
    Topic.findById(req.query.id.replace(/"/g, ''),function (err, topic) {
        if (err) {
            return res.status(500).send('Server error.');
        }
        // console.log(topic);
        if (req.session.user == undefined || req.session.user == null){
            Comment.find({topic_id:req.query.id.replace(/"/g, '')},function(err,comments){
                if (err) {
                    return res.status(500).send('Server error.');
                }
                // console.log(comments);
                res.render('./topic/show.html', {
                    topic :topic,
                    content:markdown.toHTML(topic.topic_content),
                    comments:comments
                })
            })
        }else {
            Comment.find({topic_id:req.query.id.replace(/"/g, '')},function(err,comments){
                if (err) {
                    return res.status(500).send('Server error.');
                }
                // console.log(comments);
                res.render('./topic/show.html', {
                    user: req.session.user,
                    topic :topic,
                    content:markdown.toHTML(topic.topic_content),
                    comments:comments
                })
            })
        }
        topic.traffic++;
        Topic.findByIdAndUpdate(req.query.id.replace(/"/g, ''),topic,function (err, data) {
        })
    })
});
module.exports = router;