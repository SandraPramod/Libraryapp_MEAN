const express = require('express');
const addauthorRouter = express.Router();
const Authordata=require('../model/Authordata');
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
    
    addauthorRouter.get('/',function(req,res){
        res.render("addauthors",
        {
            nav,
            title:'Library',
        });
    });
    addauthorRouter.post('/addauthors',function(req,res){
        let upload = multer({ storage: storage }).single('image');
        let filePath = "";
        upload(req, res, function (err) {
            if (err) console.log( err)
            else {
                filePath += req.file.path;
                
                filePath = filePath.substring(6, filePath.length);
                 var item={
                    name:req.body.name,
                    period:req.body.period,
                    genre:req.body.genre,
                    description:req.body.description,
                    image:filePath
                };
                var author=Authordata(item);
                author.save();
                res.redirect('/authors');
           }
        });
    });
    
    return addauthorRouter;
}

module.exports=router;