var express = require('express');
var router = express.Router();
var mydb = require('../lib/db');
const {check, validationResult} = require('express-validator');

router.get('/:userID', function (req, res, next) {
    // res.render('edit', {title: 'Edit'});
    mydb.query('SELECT * FROM user WHERE id=' + req.params.userID, function (err, rows) {
       if(rows){
            var user = {
                id: rows[0].id,
                username: rows[0].username,
                email: rows[0].email
            }
           res.render('edit', {title: 'Edit', user});
           console.log(user);
       }else{
            req.flash('error', 'User not exist!');
            res.render('edit', {title: 'Edit'});
            console.log(rows);
       }
    });
});


router.post('/:userID',  
    check('username', 'Username is required!').not().notEmpty().trim().escape(),
    check('email', 'Email is required!').isEmail().normalizeEmail().trim()
,(req, res) =>{
    const errors = validationResult(req);
    var user = {
        id: req.params.userID,
        username: req.body.username,
        email: req.body.email
    };

    if(!errors.isEmpty()){
        req. flash('validation_error', errors.array());
        res.render('edit', {title: 'Edit', user});
    }else{
        mydb.query('UPDATE user SET ? WHERE id = ' + req.params.userID, user, function (err, result) {
            if(result){
                req.flash('success', 'Success update');
                res.redirect('/users');
                
            }else{
                req.flash('error', 'Failed update Data!');
                res.render('edit', {title: 'Edit'});
            }
        });
    }
});

module.exports = router;