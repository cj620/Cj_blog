var express = require('express');
var router = express.Router();
var Topic = require('./../models/topic');

router.get('/', function (req, res) {
    var select = req.query.select
    if (select == '' || select == null) {
        Topic.find(function (err, topics) {
            if (err) {
                return res.status(500).send('Server error');
            }
            // console.log(topics)
            for (var key in topics) {
                // topics
            }
            res.render('index.html', {
                topics: topics,
                user: req.session.user
            })
        });
    } else {
        var pattern = new RegExp(select, "i");
        Topic.find({
                $or: [
                    {topic_content: pattern},
                    {topic_title: pattern},
                    {topic_author_nick: pattern}
                ]
            }
            , function (err, topics) {
                if (err) {
                    return res.status(500).send('Server error');
                }
                console.log(topics)
                for (var key in topics) {
                    // topics
                }
                res.render('index.html', {
                    topics: topics,
                    user: req.session.user
                })
            });
    }
})
module.exports = router