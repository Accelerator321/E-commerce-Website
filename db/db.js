
const mongoose = require('mongoose');

const shopItem= new mongoose.Schema({
    name: {type:String, required:true},
    desc: {type:String, required:true},
    price: {type:String, required:true},

    img:{type:String}
    
    

});

const sign = new mongoose.Schema({
    email: {type:String,
    required:true},
    password: {type:String,
    required:true}
})
const shop= mongoose.model('shopItem', shopItem);
const signIn= mongoose.model('signin', sign);

module.exports = {shop,signIn};