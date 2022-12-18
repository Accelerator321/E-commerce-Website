const express =  require('express');
const router =  express.Router();
var cookieParser = require('cookie-parser');
router.use(cookieParser("Your_secret_Key"));
const {shop,signIn} = require('../db/db.js');



//  url parsing  
router.use(express.urlencoded({
    extended:false
}));
router.use(express.json());

// Multer upload
const upload = require('../upload/upload.js');

// routes
router.get('/',(req,res)=>{
    console.log('/admin', req.signedCookies);

    if(req.signedCookies.userData){
      
    res.render("admin.pug",{auth:true});}
    else{
        res.render("admin.pug");
    }
    
});
router.post('/admin',upload.single('img'),(req,res)=>{
    try{
    let obj = {
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        img: `/static/img/${req.file.filename}`
    }

    let newItem  =new shop(obj);

    newItem.save().then(()=>res.send('/admin')).catch(err=>{console.log(err);
    res.send("some error occured")});}
    catch(err){
        console.log(error);
        res.status(500).send("internal server error")
    }
})





router.post('/login',(req,res)=>{

    signIn.find({email:req.body.email, password:req.body.password}).then(result=>{

        console.log(req.body,result)
        if (result.length ==0){ res.send('wrong credentails')}
        else {
            res.cookie('userData', {email: result[0].email}, { maxAge: 365 * 24 * 12 * 60 * 60 * 1000,  signed: true,overwrite:true ,secure:false});
            res.redirect('/');
        }
    })
})


router.post('/edit',async(req,res)=>{
    try{
    if(!req.signedCookies.userData){
        res.send('you are not authorised for this activity');
        return;
    }
    let item = req.body;
    console.log(item)
    
    if(!item.name || !item.price) return res.send("name or price cant be empty");
    console.log(await shop.find({_id:item._id}));

    let result  = await shop.updateOne({_id:item._id},{$set:{name:item.name,price:item.price,desc:item.desc}});
    console.log(result)
    res.redirect('/');
}
catch(err){
    console.log(err)
    res.status(500).send('internal server error');
}

})



module.exports = router;