var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var con=require('../config/config');


/* GET home page. */
router.get('/',function(req,res,next){
 
  res.render("admin/indexHome",{homePage:true})
})
router.get('/mechHome', function(req, res, next) {
  let user = req.session.user;
  var mail = req.session.user.email;
  console.log(mail)
  con.query("select * from booking where email = ? and status = 'pending'",[mail],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log(result)
     
      res.render('admin/index',{user,result});
    }
  })
 
});
router.get('/mechReg', function(req, res, next) {
  message=""
  res.render('admin/adminReg',{homePage:true,message});
});


router.post('/mechReg',(req,res)=>{
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

 console.log(req.body)
 let sql = "INSERT INTO shop SET ?";
let sql2 = "SELECT * FROM shop WHERE email = ?";
var mail= req.body.email;
let query = con.query(sql2,[mail],(err,result)=>{
  if(err){
    console.log(err)
  }else{
        if(result.length > 0){
            var message = "This email id has been taken";
            console.log('this email has been taken')
            res.render('/adminReg',{homePage:true,message})
        }else{
          let query = con.query(sql,req.body,(error,row)=>{
            if(error){
              console.log(error)
            }else{
              console.log("data inserted successfully")
              var message ="login to continue"
              res.render('admin/adminLogin',{message,homePage:true})
            }
          })
        }
  }
})
})
router.get('/update',function(req, res, next){
  var user=req.session.user;
  var email= req.session.user.email;
  var sql3 = "SELECT * FROM shop WHERE Email = ?";
  con.query(sql3,[email],(err,Result)=>{
    if(err){
         console.log(err)
         }
      else{
          var userData = Result[0];
          res.render('admin/updateprofile',{userData,user});
        }
      })
})
router.post('/updateimg',(req,res)=>{
  if (!req.files) {
    return res.status(400).send("No files are uploaded");
  }
  var image=req.files.uploaded_image;
  var img_name = image.name;
  var email=req.session.user.email;
  var sql = "update shop set image = ? where email = ?"
  if(image.mimetype == 'image/jpeg'||image.mimetype=='image/png'){
    image.mv("public/images/profile/"+ image.name,function(err){
      if(err){
        console.log(err)
      }else{
       
        con.query(sql,[img_name,email],(err,result)=>{
          if(err){
            console.log(err)
          }else{
            console.log("success")
            res.redirect('/')
          }
        })
      }
    })
  }
  
   
})

router.post('/mechLogin',(req,res)=>{
  var email = req.body.email;
  var password = req.body.password;
  con.query("select * from shop where email = ? and password = ? and status = 'approved'",[email,password],
    function(error,result){
     if(error){
       console.log(error);
     }else{
       if(result.length>0){
         req.session.loggedIn= true;
         req.session.user=result[0];
     
          res.redirect('/mechHome')
       }else{
         var message = "Email or Password incorrect or condact Admin for approvel"
        res.render('admin/adminLogin',{homePage:true,message})
       }
     }
    }
  )
  
})




router.get('/approveReq/:id/:shopname/:time/:umail/:email',function(req,res){
  var id = req.params.id;
  var shopname = req.params.shopname;
  var time = req.params.time;
  var usermail = req.params.umail;
  var mail = req.params.email;
  console.log(id)
  con.query("UPDATE booking SET status = 'approved' WHERE id = ?", [id],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'tve20mca-2011@cet.ac.in',
          pass: 'babysunitha',
        },
        tls:{
          rejectUnauthorized : false,
        },
      });
      let mailOptions = {
        from: mail,
        to: usermail,
        subject: 'Request Approved',
        text: `your Request for mechanical help to ${shopname} on ${time} is approved by the Shop  please wait on your current loacation, so that the mechanic can easly find you thank you for using this service `
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.redirect('/mechHome')
    }
  })
})
router.get('/reject/:id/:mail',function(req,res){
  var id = req.params.id;
  var email=req.params.mail;
  //UPDATE `booking` SET `status` ='hai' WHERE `id` = '1';
 
  con.query("UPDATE booking SET status = 'Rejected' WHERE id = ?", [id],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'tve20mca-2011@cet.ac.in',
          pass: 'babysunitha',
        },
        tls:{
          rejectUnauthorized : false,
        },
      });
      let mailOptions = {
        from: "aneetashalz86064@gmaisl.com",
        to: email,
        subject: 'Request Rejected',
        text: `your Request for mechanical help is rejected by the shop . `
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.redirect('/mechHome')
    }
  })
})
router.get('/serviceBook/:email',function(req,res){
  var email = req.params.email;
  //UPDATE `booking` SET `status` ='hai' WHERE `id` = '1';
 
  con.query("select * from booking where email = ? ", [email],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      var user = req.session.user;
      res.render('admin/serviceBook',{user,result})
    }
  })
})

router.get('/about', function(req, res, next) {
  const product = 
  [{
    name:"iphone",
    img:"https://d28i4xct2kl5lp.cloudfront.net/product_images/134107_cf06013b-7953-4cba-940e-3b0e1c0542f9.jpg",
    dis:" a product by apple"
  },
  {
    name:"iphon x",
    img:"https://d1eh9yux7w8iql.cloudfront.net/product_images/None_32e767de-b206-4f60-a4ca-b22f51f29d8c.jpg",
    dis:" a product by apple"
  },{
    name:"iphon x",
    img:"https://d1eh9yux7w8iql.cloudfront.net/product_images/None_32e767de-b206-4f60-a4ca-b22f51f29d8c.jpg",
    dis:" a product by apple"
  },
  {
    name:"iphon x",
    img:"https://d1eh9yux7w8iql.cloudfront.net/product_images/None_32e767de-b206-4f60-a4ca-b22f51f29d8c.jpg",
    dis:" a product by apple"
  }
  ]
  res.render('about',{product});
});

router.get('/addProduct',function(req,res){
  res.render('admin/addProduct')
})
router.get('/addpost',function(req,res){
  var user = req.session.user;
  res.render('admin/addpost',{user})
})
router.post('/addpost',function(req,res){
  var image_name;
  var userData=req.session.user;
  if(!req.files) return res.status(400).send("no files were uploaded.");
  
  var file=req.files.uploaded_image;
  var image_name = file.name;
  let sql="INSERT INTO addpost SET ?";
  
  console.log(file)
  console.log(image_name);
  if(file.mimetype =="image/jpeg" || file.mimetype =="image/png" || file.mimetype =="image/gif"
  ){
    file.mv("public/images/addpost/"+file.name,function(err){
      if(err) return res.status(500).send(err);
      console.log(image_name);
  
  let data={
  
    name:req.body.name,
    description:req.body.description,
    image:image_name,
  }; 
  console.log(data)
  con.query(sql,data,(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.redirect('/mechHome')
    }
  })
  }) 
  } 
  })
  router.get('/blog', function(req, res, next) {
    var user=req.session.user;
    var sql="select * from addpost"
    con.query(sql,(err,result)=>{
      if(err){
        console.log(err)
      }
      else{
        res.render('admin/blog',{result,user});
      }
    })
  });

router.get('/adminLogin',function(req,res,next){
 
  res.render("admin/adminLogin",{homePage:true})
})
router.post('/adminLog',function(req,res,next){
  console.log(req.body)
  res.render("admin/adminLogin",)
})
router.get('/addF',(req,res)=>{
  var user =  req.session.user;
  res.render('admin/features',{user})
})
router.post('/addfeaturs',(req,res)=>{
  var data = req.body;
  data.mail=req.session.user.email;
  var sql= "insert into addfeatures set?"
  con.query(sql,[data],(err,row)=>{
    if(err){
      console.log(err)
    }else{
      res.redirect('/mechHome')
    }
  })
})
router.post('/menu',(req,res)=>{
  if (!req.files) {
    return res.status(400).send("No files are uploaded");
  }
  var image=req.files.uploaded_image;
  var img_name = image.name;
  var email=req.session.user.email;
  var sql = "update shop set menu = ? where email = ?"
  if(image.mimetype == 'image/jpeg'||image.mimetype=='image/png'){
    image.mv("public/images/menu/"+ image.name,function(err){
      if(err){
        console.log(err)
      }else{
       
        con.query(sql,[img_name,email],(err,result)=>{
          if(err){
            console.log(err)
          }else{
            console.log("success")
            res.redirect('/mechHome')
          }
        })
      }
    })
  }
  
   
})

router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/')
})
router.get('/questions',(req,res)=>{
  var sql = "select * from message where shopid = ?"
  con.query(sql,[req.session.user.email],(err,row)=>{
    if(err){
      console.log(err)
    }else{
      var user = req.session.user;
      res.render('admin/viewMessages',{messages:row,user})
    }
  })
})
module.exports = router;

