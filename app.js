var express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http'),
    bcrypt = require('bcrypt'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'), 
    session = require('express-session'),   
    server = http.createServer(app);

app.set('view engine', 'ejs'); 
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
    secret: 'blah',
    key: 'sid'
}));

app.get('/', function (req, res){
    res.render("index", { user: req.session.user });
});
app.post('/signup', function (req, res){
    var username = req.body.username;
    var password = req.body.password; 
    var passwordConfirm = req.body.confirm;
    if (password !== passwordConfirm){
        res.end('dont match');
        return;
    }
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        if (db[username] != null){
            res.end('username taken');
            return;
        }
        db[username] = hash;
        res.end('signed up');
    });
});    
});
app.post('/login', function (req, res){
    if(db[req.body.username] == null){
        res.status(401).end('you are not signed up!');
        return;
    }
    bcrypt.compare(req.body.password, db[req.body.username], function(err, match) {
        if (match == false){
            res.status(401).end('password is invalid');
            return;
        }
       req.session.user = req.body.username;
       res.redirect('/');
    });
});
app.post('/logout', function (req, res) {
    req.session.user = null;
    res.redirect('/');
});
var db = {};
server.listen(3000);
