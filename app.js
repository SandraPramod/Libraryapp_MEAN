const express = require('express');
const app = express();
const port=process.env.PORT||2000;
const nav=[
    {
        link:'/books',name:'Books'
    },
    {
        link:'/authors',name:'Authors'
    },
    {
        link:'/addbook',name:'Add Book'
    },
    {
        link:'/addauthor',name:'Add Author'
    },
    {
        link:'/edit',name:'Edit'
    }
];
const nav1=[
    {
        link:'/login',name:'Login'
    },
    {
        link:'/signup',name:'Sign Up'
    }
];
const signupRouter=require('./src/routes/signupRoutes')(nav1)
const loginRouter=require('./src/routes/loginRoutes')(nav1)
const homeRouter=require('./src/routes/homeRoutes')(nav)
const booksRouter=require('./src/routes/bookRoutes')(nav)
const authorsRouter=require('./src/routes/authorRoutes')(nav)
const addbookRouter=require('./src/routes/addbookRoutes')(nav)
const addauthorRouter=require('./src/routes/addauthorRoutes')(nav)
const authorEditRouter=require('./src/routes/authoreditRoutes')(nav)
const bookEditRouter=require('./src/routes/bookeditRoutes')(nav)
const editRouter=require('./src/routes/editRoutes')(nav)
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./src/views');
app.use('/signup',signupRouter);
app.use('/login',loginRouter);
app.use('/home',homeRouter);
app.use('/books',booksRouter);
app.use('/authors',authorsRouter);
app.use('/addbook',addbookRouter);
app.use('/addauthor',addauthorRouter);
app.use('/edit/books',bookEditRouter);
app.use('/edit/authors',authorEditRouter);
app.use('/edit',editRouter);
app.get('/',function(req,res){
    res.render("index",
    {
        nav1,
        title:'Library'
    });
});
app.listen(port,()=>{console.log("Server ready at"+port)});