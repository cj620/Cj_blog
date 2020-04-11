var mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost/nodeblog', {useMongoClient: true});

var Comment = mongoose.Schema;

var commentSchema = new Comment({
    topic_id:{
        require:true,
        type:String
    },
    comment_author_id: {
        type: String,
        require: true
    },
    comment_author_nick: {
        type: String,
        require: true
    },
    comment_content: {
        require: true,
        type: String,
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    // 楼 数
    traffic: {
        type: String,
        default: 1
    },
    //点赞量
    reply:{
        type: String,
        default: 0
    }
});

module.exports = mongoose.model('Comment', commentSchema);