var Post = require('../../models/post')
var router = require('express').Router()

var websockets = require('../../websockets')


router.get('/', function (req, res, next) {
    Post.find()
        .sort('-date')
        .exec(function(err, posts) {
            if (err) { return next(err) }
            res.json(posts)
        })
})

router.post('/', function (req, res, next) {

    console.log('auth: ' + req.auth);

    var post = new Post({body: req.body.body})
    post.username = req.auth.username;


    websockets.broadcast('message', post);

    /*
    var post = new Post({
        username: req.body.username,
        body: req.body.body
    })
    */
    post.save(function (err, post) {
        if (err) { return next(err) }
        res.json(201, post)
    })
})

module.exports = router