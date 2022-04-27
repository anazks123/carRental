const { response } = require('express');
var express = require('express');
var router = express.Router();
var con=require('../config/config');



router.get('/home', function(req, res, next) {
      con.query("select * from shop where status = 'pending'",(err,row)=>{
        if(err){
          console.log(err)
        }else{
            
         res.render('sadmin/home',{shops:row});
        }
      })
  
      
  });
  router.get('/',(req,res)=>{
      res.render('sadmin/login')
  })
  router.get('/approvedshop', function(req, res, next) {
    con.query("select * from shop where status = 'approved'",(err,row)=>{
      if(err){
        console.log(err)
      }else{
          console.log(row)
       res.render('sadmin/approvedShop',{shops:row});
      }
    })

    
});

  router.get('/approve/:id', function(req, res, next) {
        var id = req.params.id;
        var sql ="update shop set status = 'approved' where id  = ?";
      con.query(sql,[id],(err,row)=>{
        if(err){
          console.log(err)
        }else{
            
      res.redirect('/sadmin/home')
        }
      })
  
      
  });


  router.get('/blockShop/:id', function(req, res, next) {
    var id = req.params.id;
    var sql ="update shop set status = 'blocked' where id  = ?";
  con.query(sql,[id],(err,row)=>{
    if(err){
      console.log(err)
    }else{
        
  res.redirect('/sadmin/approvedshop')
    }
  })

  
});



router.get('/blockedShop', function(req, res, next) {
    
    var sql ="select * from  shop where status = 'blocked';";
  con.query(sql,(err,row)=>{
    if(err){
      console.log(err)
    }else{
  res.render('sadmin/BlockedShop',{row})
    }
  })

  
});

router.get('/unblock/:id', function(req, res, next) {
    var id = req.params.id;
    var sql ="update shop set status = 'approved' where id  = ?";
  con.query(sql,[id],(err,row)=>{
    if(err){
      console.log(err)
    }else{
        
  res.redirect('/sadmin/home')
    }
  })

  
});
router.post('/login',(req,res)=>{
    var mail = "admin@123.com"
    var pass = 123;
    var admin = {
        mail:mail,
        password:123
    }
    req.session.admin=admin;
    if(req.body.mail == mail & req.body.password==pass){
        res.redirect('/sadmin/home')
    }else{
        res.redirect('/sadmin/')
    }
})
module.exports = router;