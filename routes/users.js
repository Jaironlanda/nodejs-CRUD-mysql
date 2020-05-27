var express = require('express');
var router = express.Router();
var mydb = require('../lib/db');


/* GET users listing. */
router.get('/', function(req, res, next) {
  mydb.query('select * from user', function (err, rows) {
    if(err){
      console.log(err);
      req.flash('error', err);
      res.render('users', {data:''});
    }else{
      res.render('users', {data:rows});
      console.log(rows);
    }
  });
});

module.exports = router;
