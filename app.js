const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');


// _______routes_______
const admin = require('./routes/admin.js');
app.use('/admin',admin);

// port
port  = 80;

var cookieParser = require('cookie-parser');
mongoose.set('strictQuery', false);

// Express set up
app.use('/static', express.static('static')); 
app.set('view engine', 'pug'); // set pug engine
app.set('views', path.join(__dirname, 'views')) ;
app.listen(port, () => {
    console.log(`Server started at ${port}`)

});

//  url parsing  
app.use(express.urlencoded({
    extended:false
}));
app.use(express.json());

// secret key for cookiees
app.use(cookieParser("Your_secret_Key"));




//  Mongo db connection

mongoose.connect('mongodb://localhost/shop');

var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("We are connected")
});



// MOdel 

const {shop,signIn} = require('./db/db.js');






// End points

app.get('/',(req,res)=>{
    shop.find().then(items=>
    {   
        if(req.signedCookies.userData) res.render('index.pug',{items,auth:true}) ;
        else res.render('index.pug',{items});
});
})


app.get('/mylists',(req,res)=>{

    res.render('mylists.pug');
})






