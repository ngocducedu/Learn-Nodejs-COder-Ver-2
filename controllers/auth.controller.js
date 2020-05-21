const db = require('../db')
const md5 = require('md5')

module.exports.login = (req, res) => {
    res.render('auth/login')
} 

module.exports.postLogin = (req, res) => {
    let email = req.body.email
    let password = req.body.password
    
    let user = db.get('users').find({ email: email }).value()

    if (!user) {
        res.render('auth/login', {
            errors: [
                'User does not exist.'
            ],
            values: req.body
        })
        return
    }

    if(user.password !== md5(password)) {
        res.render('auth/login', {
            errors: [
                'Password is incorrect'
            ] ,
            values: req.body
        })
        return
    }

    res.cookie('userId', user.id, {
        signed: true
    })
    res.redirect('/users')
}