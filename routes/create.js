var express = require('express');
var router = express.Router();
var mydb = require('../lib/db');
const {check, validationResult} = require('express-validator');

// create
router.get('/', function(req, res, next) {
  res.render('create', { title: 'Create User'});
});

router.post('/',  
    check('username', 'Username is required!').not().isEmpty().trim().escape(),
    check('email', 'Email is required!').isEmail().normalizeEmail().trim()
,(req, res)  =>{
    const errors = validationResult(req);
    var user = {
        username: req.body.username,
        email: req.body.email
    };

    if(!errors.isEmpty()){
        req.flash('validation_error', errors.array());
        res.render('create', { title: 'Create User', user});
        console.log(errors.array());
    }else{
        
        mydb.query('INSERT INTO user SET ?', user, function(err, result){
            if(err){
                req.flash('error', err);
                res.render('create', {title:'Create User', user});
            }else{
                req.flash('success', 'Data added successfully!');
                res.redirect('/users');
            }
        });
        
        // console.log(user);
    }
});
module.exports = router;