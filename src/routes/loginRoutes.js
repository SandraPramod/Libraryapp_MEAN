const express = require('express');
const loginRouter = express.Router();
const fs = require('fs');
const signupData = require('../model/signupdata');
function router(nav1){
    
    loginRouter.get("/", function (req, res) {
        res.render('login', {
            nav1,
            title:'Library',
        });
    });

    loginRouter.post('/check', function (req, res) {
        var username = req.body.username;
        var password = req.body.password;

        let usernamedetails = [];
        let emaildetails = [];

        signupData.find({ username: username, password: password }).then(function (user) {
            usernamedetails = user;
        });

        signupData.find({ email: username, password: password }).then(function (user) {
            emaildetails = user;

            if (usernamedetails.length != 0 || emaildetails.length != 0) {
                let firstname = usernamedetails.concat(emaildetails)[0].firstName;
                let rawdata = fs.readFileSync('./data/data.json');
                let data = JSON.parse(rawdata);
                data.name = firstname;
                data.logged_in = true;
                data = JSON.stringify(data, null, 2);
                fs.writeFile('./data/data.json', data, (err) => {
                    if (err) throw err;
                    else {
                        res.redirect('/login/loginsuccess');
                    }
                });
            }
            else {
                res.redirect('/login');
            }
        });


    });

    loginRouter.get('/loginsuccess', function (req, res) {
        let rawdata = fs.readFileSync('./data/data.json');
        let data = JSON.parse(rawdata);
        let firstname = data.name;
        res.render('success', {
            message: `Welcome Back, ${firstname}!`,
            rediectPage: '/home'
        });
    });

    return loginRouter;
}

module.exports=router;