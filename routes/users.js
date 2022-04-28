const { response, query } = require('express');
var express = require('express');
var router = express.Router();
var con=require('../config/config');

/* GET users listing. */
var globalData;
router.get('/', function(req, res, next) {
  let user = req.session.user;
    con.query("select * from addfeatures",(err,row)=>{
      if(err){
        console.log(err)
      }else{
        
        res.render('user/Userhome',{user,row});
      }
    })
    
});
router.get('/userhome',function(req,res,next){
  var user = req.session.user;
  res.render("user/Userhome",{user})
})
router.get('/confirmBooking',(req,res)=>{
  let user = req.session.user;
  res.render('user/confirmBooking',{user})
})


router.get('/payNow/:id/:days/:amount',(req,res)=>{
  var days = req.params.days;
  var amount = req.params.amount;
  var id = req.params.id;
  let user = req.session.user;
  var total = days * amount;
   res.render('user/pay',{id,user,homePage:true,total});
  })
  router.post('/payDone',(req,res)=>{
    console.log(req.body)
    var id = req.body.id;
    var rs = req.body.rs;
  //UPDATE `booking` SET `status` ='hai' WHERE `id` = '1';
 
  con.query("UPDATE booking SET rs = ? WHERE id = ?", [rs,id],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.redirect('/users')
    }
  })
  })

router.get('/myaccounts',function(req,res,next){
  let user = req.session.user;
  console.log(user)
  res.render("user/myaccounts",{user,homePage:true})
})
router.get('/ublog', function(req, res, next) {
  var user=req.session.user;
  var sql="select * from addpost"
  con.query(sql,(err,result)=>{
    if(err){
      console.log(err)
    }
    else{
      res.render('user/ublog',{result,user,homePage:true});
    }
  })
});
router.get('/userLogin',function(req,res,next){
  message=""
 let user = req.session.user;
 
  res.render("user/userLogin",{homePage:true,message})
 
 
})
router.get('/userReg',function(req,res,next){
 message=""
  res.render("user/userReg",{homePage:true,message})
})
router.post('/userReg',function(req,res,next){
 console.log(req.body)
 var msg;
 var data;
 var orginalPassword;
 var pass1=req.body.password;
 var pass2 = req.body.repassword2;
 if(pass1 != pass2){
   msg="password miss match"
 }else{
  orginalPassword = pass2;
  data = req.body;
 }
 let sql = "INSERT INTO customer SET ?";
let sql2 = "SELECT * FROM customer WHERE email = ?"
var mail= req.body.email;
let query = con.query(sql2,[mail],(err,result)=>{
  if(err){
    console.log(err)
  }else{
        if(result.length > 0){
            var message = "This email id has been taken";
            console.log('this email has been taken')
            res.render('user/userReg',{homePage:true,message})
        }else{
          let query = con.query(sql,data,(error,row)=>{
            if(error){
              console.log(error)
            }else{
              console.log("data inserted successfully")
              var message ="login to continue"
              res.render('user/userReg',{homePage:true,message})
            }       
          })
        }
  }
})
  
})
router.post('/Ulogin',(req,res)=>{
  var email = req.body.email;
  var password = req.body.password;
  con.query("select * from customer where email = ? and password = ?",[email,password],
    function(error,result){
     if(error){
       console.log(error);
     }else{
       if(result.length>0){
         req.session.loggedIn= true;
         req.session.user=result[0];
     
          res.redirect('/users')
       }else{
         var message = "Email or Password incorrect"
        res.render('user/userLogin',{homePage:true,message})
       }
     }
    }
  )
  
})
router.get('/myAccount/:id',function(req,res){
  var id = req.params.id;
  console.log(id)
  res.redirect('/users/myaccounts')
})

router.get('/editData/:id',function(req,res){
  var id = req.params.id;
  console.log(id)
  con.query("select * from customer where id = ?",[id],function(err,row){
    if(err){
      console.log(err)
    }else{
      console.log(row)
      let user = req.session.user;
      res.render('user/editData',{user,data:row[0],homePage:true})
    }
  })
  
 router.post('/update',function(req,res){
    data = req.body;
    id= req.body.id;
    var sql  = "update `customer` set ? where id = ?";
    con.query(sql,[data,id],function(err,row){
      if(err){
        console.log(err)
      }else{
        console.log(row)
        res.redirect('/users')
      }
 })
})
})

router.get('/myBookings/:mail',function(req,res){
  var mail = req.params.mail;
  console.log(mail)
  con.query("select * from booking where useremail = ?",[mail],(err,result)=>{
      if(err){
        console.log(err)
      }else{
        var data = result
        console.log(data)
        let user =  req.session.user;
        res.render('user/myBookings',{user,data,homePage:true})
      }
  })
 
})

router.get('/booknow/:id',function(req,res){
    console.log(req.params.id)
    var id = req.params.id;
    con.query("select * from addfeatures where id = ?",[id],(err,result)=>{
      if(err){
        console.log(err)
      }else{
         
          var  machanics = result[0];
          console.log(machanics)
          var user = req.session.user;
          res.render('user/confirmBooking',{user,machanics,homePage:true})
      }
    })

 
})
router.post('/booking',(req,res)=>{

 var data = req.body;
 var today = new Date();
 var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
 var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
 var dateTime = date+' '+time;
 console.log(dateTime)
 data.time = dateTime;
 console.log(data)
 var booking = req.body.bdate;
 console.log("booking",booking)
  var sql = "insert into booking set ?"
  con.query(sql,data,(err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log("bookking success")
      res.redirect('/users')
    }
  })
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})
router.get('/view/:id/:mail',(req,res)=>{
  var email = req.params.mail;
  var id  = req.params.id;
  console.log(email)
  //var sql = "Select * from addfeatures where mail = ?"
  con.query("select * from addfeatures where id = ?",[id],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log(result)
      var sql2 = "select * from shop where email =?"
      con.query(sql2,[email],(err,row)=>{
        if(err){
          console.log|(err)
        }else{

          var user = req.session.user;
          res.render('user/viewDetail',{result,user,homePage:true})
        }
      })
     
    }
  })
})
router.get('/contact/:email',(req,res)=>{
  var mail = req.params.email;
  var user = req.session.user;

  res.render('user/form',{user,mail,homePage:true})
  })

router.post('/message',(req,res)=>{
  var sql ="insert into message set ?"
    var data = {
      message:req.body.msg,
      userid:req.session.user.email,
      shopid:req.body.mail
    }
    con.query(sql,data,(err,row)=>{
      if(err){
        console.log(err)
      }else{
        res.redirect('/users/userhome')
      }
    })
})
router.post('/location',(req,res)=>{
  console.log(req.body)
  
})



module.exports = router;
