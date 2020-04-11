var mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/nodeblog', {useMongoClient: true})

var Schema = mongoose.Schema

var topicSchema = new Schema({
    //选择板块
    // 0:其他  1:分享  2:问答  3:招聘   4:客户端测试
    topic_author_id: {
        type: String,
        require: true
    },
    topic_author_nick: {
        type: String,
        require: true
    },
    topic_author_avatar: {
        type: String,
        default: 'public/img/avatar-default.png'
    },
    topic_type: {
        type: Number,
        enum: [0, 1, 2, 3, 4],
        default: 1
    },
    topic_title: {
        type: String,
        require: true,
        maxlength: 20
    },
    topic_content: {
        require: true,
        type: String,
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    //浏览次数
    traffic: {
        type: String,
        default: 1
    },
    //回复数量
    reply:{
        type: String,
        default: 0
    }
});

module.exports = mongoose.model('Topic', topicSchema)