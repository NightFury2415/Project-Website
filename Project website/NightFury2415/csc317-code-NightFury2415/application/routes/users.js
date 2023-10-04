var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const UserError = require('../helpers/error/UserError');
const db = require('../conf/database');

router.post("/Registration.html",function(req, res , next) {
  const {username, email, password} = req.body;

  db.query('select id from users where username=?', [username])
    .then(function([results, fields]) {
      if(results && results.length == 0){
        return db.execute('select id from users where email=?', [email])

      }else{
        req.flash('error', "Username already exists");
        location.reload;
        throw new Error('username already exists');
        
      }
    }).then(function([results, fields]){
      if(results && results.length == 0){
        return bcrypt.hash(password, 2);

      }else{
        
        req.flash('error', "Email already exists");
        location.reload;
        throw new Error('email already exists');
      }
    }).then(function(hashedPassword){
      return db.execute('insert into users (username, email, password) value (?,?,?)',[username, email, hashedPassword])
    })
    
    .then(function([results, fields]){
      if(results && results.affectedRows ==1){
        res.redirect('/login');

      }else{
        req.flash('error', "User could not be made");
        throw new Error('user could not be made');
      }
    }).catch(function(err){
      res.redirect('/Registration');
      next(err);
    });

  });

router.post("/Login.html", function(req, res, next){
  const {username, password} = req.body;

  let loggedUserId;
  let loggedUsername;

  db.query('select id, username, password from users where username=?' ,[username])
    .then(function([results,fields]){
      if(results && results.length == 1){
        loggedUserId = results[0].id;
        loggedUsername = results[0].username;
        let dbPassword = results[0].password;
        return bcrypt.compare(password, dbPassword);

      }else{
        req.flash('error', "Failed Login: Invalid User Credentials");
        throw new UserError('Failed Login: Invalid user Credentials', "/Login.html", 200);
      }
      
    })
    .then(function(passwordsMatched){
      if(passwordsMatched){
        req.session.userId = loggedUserId;
        req.session.username = loggedUsername;
        req.flash("success", `Hi ${loggedUsername}, you are now logged in.`);
        req.session.save(function(saveErr){
          res.redirect('/');

        })
       

      }else{
        req.flash('error', "Failed Login: Invalid User Credentials");
        throw new UserError('Failed Login: Invalid user Credentials', "/Login.html", 200);
     

      }

    })
    .catch(function(err){
      if(err instanceof UserError){
        req.flash("error", err.getMessage());
        req.session.save(function(saveErr){
          res.redirect(err.getRedirectURL());
        })
        
      }else{
        next(err);

      }

    })



});

router.post("/logout", function(req, res, next){
  req.session.destroy(function(destroyError){
    if(destroyError){
      next(err);
    }else{
      res.json({
        status: 200,
        message: "You have been logged out"
      });
    }
  })
});



  




module.exports = router;
