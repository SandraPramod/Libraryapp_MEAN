const express = require('express');
const bookEditRouter = express.Router();
const Bookdata=require('../model/Bookdata');
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
    
    bookEditRouter.get("/", function (req, res) {
        Bookdata.find().then(function (books) {
            res.render('booksedit', {
                nav,
                title:'Library',
                books,
            });
        })
    });

    bookEditRouter.post("/edit", function (req, res) {
        let upload = multer({ storage: storage }).single('image');
        let filePath = "";
        upload(req, res, function (err) {
            if (err) throw err
            else {
                if (req.file)
                    filePath += req.file.path;
                filePath = filePath.substring(6, filePath.length);
            }
            Bookdata.findById(req.body.id).then(function (book) {
                book.title = req.body.title;
                book.author = req.body.author;
                book.genre = req.body.genre;

                if (req.file) {
                    var oldImagePath = path.join('./public' + book.image);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(path.join('./public' + book.image));
                    }
                    book.image = filePath;
                }
                book.description = req.body.description;
                book.save();
                res.redirect('/edit/books/edit/success');
            });
        });
    });

    bookEditRouter.get("/edit/success", function (req, res) {
        res.render('success', {
            message: `Updating`,
            rediectPage: '/books'
        });
    });

    bookEditRouter.post('/delete',function(req,res){
        Bookdata.deleteMany({_id:{$in:req.body.deleteCheckBox}},function(err,result){
            if (err) throw err
            else{
                res.render('success', {
                    message: `Updating Book List`,
                    rediectPage: '/books'
                });
            }
        });
    });

    bookEditRouter.get("/:id", function (req, res) {
        let id = req.params.id;
        Bookdata.find({ _id: id }).then(function (singleBookArray) {
            let book = singleBookArray[0];
            res.render('bookedit', {
                nav,
                title:'Library',
                book,
            });
        })
    });
    return bookEditRouter;
}

module.exports=router;