const express = require('express');
const signupRouter = express.Router();
const signupData = require('../model/signupdata');
const fs = require('fs');
function router(nav1){
    
    signupRouter.get("/", function (req, res) {
        res.render('signup', {
            nav1,
            title:'Library',
        });
    });

    signupRouter.post("/add", function (req, res) {
        var item = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        var user=signupData(item);
        user.save();
        res.redirect('/login');
    });

    return signupRouter;

}

module.exports=router;