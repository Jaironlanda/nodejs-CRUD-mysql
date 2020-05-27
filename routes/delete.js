var express = require('express');
var router = express.Router();
var mydb = require('../lib/db');

router.get('/:userID', function (req, res, next) {
    // res.render('delete', {id: req.params.userID});

    mydb.query('DELETE FROM user WHERE id = ' + req.params.userID, function (err, result) { 
        if(err){
            req.flash('error', 'User not exist!');
            res.redirect('/users');
            console.log(err);
        }else{
            req.flash('success', 'Success Delete user!');
            res.redirect('/users');
            // console.log(err);
        }
        
    });
});

module.exports = router;