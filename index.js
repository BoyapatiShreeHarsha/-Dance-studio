const express= require("express");
const path=require("path");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance');
const bodyparser=require("body-parser");
const app=express();
const port=80;

//MOngoose -#88
const contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    discription: String
  });
const Contact = mongoose.model('Contact', contactSchema);


//For Express commands
//for serving the static file
app.use('/static',express.static("static"));
app.use(express.urlencoded({extended:true}));

//Pug commands
app.set('view engine','pug');//set the template engine as pug
app.set('views', path.join(__dirname, 'views'));

//End Points
app.get('/',(req,res)=>{
    const params={};  //this is a object
    res.status(200).render('home.pug',params)
});

app.get('/contact',(req,res)=>{
    const params={};  //this is a object
    res.status(200).render('contact.pug',params)
});

app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database.If you want to store more data go back")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database.")
    });
    //res.status(200).render('contact.pug')
});



//listening
app.listen(port,()=>{
    console.log(`This is sunning on ${port}`);
});
