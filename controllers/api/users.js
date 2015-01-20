var router = require('express').Router()
//var bcrypt = require('bcrypt')
var jwt = require('jwt-simple')
var User = require('../../models/user')
var config = require('../../config')

//find user and return user based on token
router.get('/', function (req, res, next) {
    if (!req.headers['x-auth']) {
        return res.send(401)
    }
    var auth = jwt.decode(req.headers['x-auth'], config.secret)
    User.findOne({username: auth.username}, function (err, user) {
        if (err) { return next(err) }
        res.json(user)
    })
})

//create user
router.post('/', function (req, res, next) {
    var user = new User({username: req.body.username});

    user.password = req.body.password;
    user.save(function (err) {
        if (err) { return next(err) }
        res.send(201)
    })

    /*
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) { return next(err) }
        user.password = hash
        user.save(function (err) {
            if (err) { return next(err) }
            res.send(201)
        })
    })
    */
})

module.exports = router
