
var express= require('express');
var app=express();
var bodyParser = require('body-parser');
var route= require('./route.js');

app.use(bodyParser.urlencoded({ extended: true }));


var cookieParser= require('cookie-parser');


app.use(cookieParser());


app.use(express.static(__dirname + '/public'));

app.set('view engine','pug');
app.set('views','./views');



app.post('/home',function(req,res){
    var nameFirst='First Name: '+(req.cookies.userdata.nameFirst);
    var nameLast='Last Name: '+(req.cookies.userdata.nameLast);
    var id='E-Mail: '+(req.cookies.userdata.id);
    var PhNum='Phone Number: '+(req.cookies.userdata.phn);
    var city='Current City: '+(req.cookies.userdata.city);
    var Name=nameFirst+' , '+nameLast+' , '+id+' , '+PhNum+' , '+city;
    res.send(Name);

});


app.get('/login',function (req,res) {
    res.render('login');
});

app.post('/login',function (req,res){
    console.log(req.body);
    if(req.body.idl===req.cookies.userdata.idl || req.body.Passwordd===req.cookies.userdata.Passwordd) {
        res.redirect('/home');
    }
    else res.send('Invalid credentials');
});



app.get('/register',function (req,res) {
    res.render('register');

});





app.post('/register',function(req,res) {
    console.log(req.body);
    const nameFirst = req.body.nameFirst;
    const nameLast = req.body.nameLast;
    const id = req.body.id;
    const phn = req.body.phn;
    const city = req.body.city;
    let user={nameFirst: nameFirst, nameLast: nameLast, id: id, phn: phn, city: city};
    res.cookie("userdata",user);
    res.redirect('/login');
});

app.get('/',(req,res)=>{
    res.redirect('/register');
});


app.listen(process.env.PORT || 3000, function () {
    console.log("Listening to port 3000")
});

