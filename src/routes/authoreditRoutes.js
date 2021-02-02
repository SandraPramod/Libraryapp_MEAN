const express = require('express');
const authorEditRouter = express.Router();
const Authordata=require('../model/Authordata');
const fs = require('fs');
const multer=require('multer');
const path=require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
function router(nav){
    
    authorEditRouter.get("/", function (req, res) {
        Authordata.find().then(function (authors) {
            res.render('authorsedit', {
                nav,
                title:'Library',
                authors,
            });
        })
    });

    authorEditRouter.post("/edit", function (req, res) {
        let upload = multer({ storage: storage }).single('image');
        let filePath = "";
        upload(req, res, function (err) {
            if (err) throw err
            else {
                if (req.file)
                    filePath += req.file.path;
                filePath = filePath.substring(6,filePath.length);
            }
            Authordata.findById(req.body.id).then(function (author) {
                author.name = req.body.name;
                author.period = req.body.period;
                author.genre = req.body.genre;

                if (req.file) {
                    var oldImagePath = path.join('./public' + author.image);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(path.join('./public' + author.image));
                    }
                    author.image = filePath;
                }
                author.description = req.body.description;
                
                
                author.save();
                res.redirect('/edit/authors/edit/success');
            });
        });
    });

    authorEditRouter.get("/edit/success", function (req, res) {
        res.render('success', {
            message: `Updating Author List`,
            rediectPage: '/authors'
        });
    });

    authorEditRouter.post('/delete',function(req,res){
        Authordata.deleteMany({_id:{$in:req.body.deleteCheckBox}},function(err,result){
            if (err) throw err
            else{
                res.render('success', {
                    message: `Updating Author List`,
                    rediectPage: '/authors'
                });
            }
        });
    });

    authorEditRouter.get("/:id", function (req, res) {
        let id = req.params.id;
        Authordata.find({ _id: id }).then(function (singleAuthorArray) {
            let author = singleAuthorArray[0];
            res.render('authoredit', {
                nav,
                title:'Library',
                author,
            });
        })
    });
    return authorEditRouter;
}

module.exports=router;