const express = require('express');
const editRouter = express.Router();
function router(nav){
    
    editRouter.get('/',function(req,res){
        res.render("edit",
        {
            nav,
            title:'Library',
        });
    });
    return editRouter;
}

module.exports=router;