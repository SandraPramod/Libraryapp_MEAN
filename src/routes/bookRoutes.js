const express = require('express');
const booksRouter = express.Router();
const Bookdata=require('../model/Bookdata');
function router(nav){
    /*var books=[
        {
            title:'Tom and Jerry',
            author:'Joseph Barbera',
            genre:'cartoon',
            desc:'Tom and Jerry is an American animated franchise and series of comedy short films created in 1940 by William Hanna and Joseph Barbera. Best known for its 161 theatrical short films by Metro-Goldwyn-Mayer, the series centers on the rivalry between the titular characters of a cat named Tom and a mouse named Jerry. Many shorts also feature several recurring characters.',
            img:'tom.jpg'
        },
        {
            title:'Harry Potter',
            author:'J K Rowling',
            genre:'fantasy',
            desc:'Harry Potter is a film series based on the eponymous novels by J. K. Rowling. The series is distributed by Warner Bros. and consists of eight fantasy films, beginning with Harry Potter and the Philosopher Stone (2001) and culminating with Harry Potter and the Deathly Hallows – Part 2 (2011).A spin-off prequel series that will consist of five films started with Fantastic Beasts and Where to Find Them (2016), marking the beginning of the Wizarding World shared media franchise.',
            img:'harry.jpg'
        },
        {
            title:'Pathummayude Aadu',
            author:'Vaikom Muhammed Basheer',
            genre:'drama',
            desc:'Pathummayude Aadu (Pathummas Goat; 1959) is a humorous novel by Vaikom Muhammad Basheer.The characters of the novel are members of his family and the action takes place at his home in Thalayolaparambu. The goat in the story belongs to his sister Pathumma. Basheer begins the novel with an alternative title for the book, Pennungalude Buddhi (The Wisdom of Women).',
            img:'basheer.jpg'
        }] */
    booksRouter.get('/',function(req,res){
        Bookdata.find()
        .then(function(books){
            res.render("books",
            {
                nav,
                title:'Library',
                books
            });
        });
    });
        
    booksRouter.get('/:id',function(req,res){
        const id=req.params.id;
        Bookdata.findOne({_id:id})
        .then(function(book){
            res.render("book",
            {
                nav,
                title:'Library',
                book
            });
        });
    });
        

    return booksRouter;
}

module.exports=router;