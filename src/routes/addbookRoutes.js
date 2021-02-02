const express = require('express');
const addbookRouter = express.Router();
const Bookdata=require('../model/Bookdata');
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
    
    addbookRouter.get('/',function(req,res){
        res.render("addbooks",
        {
            nav,
            title:'Library',
        });
    });
    addbookRouter.post('/addbooks',function(req,res){
        let upload = multer({ storage: storage }).single('image');
        let filePath = "";
        upload(req, res, function (err) {
            if (err) console.log( err)
            else {
                filePath += req.file.path;
                
                filePath = filePath.substring(6, filePath.length);
                 var item={
                    title:req.body.title,
                    author:req.body.author,
                    genre:req.body.genre,
                    description:req.body.description,
                    image:filePath
                };
                var book=Bookdata(item);
                book.save();
                res.redirect('/books');
           }
        });
    });
    
    return addbookRouter;
}

module.exports=router;