var express = require('express');
const {isLoggedIn} = require('../middleware/protectors');
const {getRecentPosts, getPostById, getCommentsForPostById} = require('../middleware/posts');
var router = express.Router();

/* GET home page. */

router.get('/', getRecentPosts ,function(req, res, next) {
  res.render('Index', { title: 'CSC 317 App', name:"Dev Modi" });
});
// router.get('/Index.html', function(req, res, next) {
//   res.render('Index', { title: 'CSC 317 App', name:"Dev Modi" });
// });

router.get('/login', function(req, res){
  res.render('Login' , {title: 'Login Page' , name: 'Dev Modi'})
});
router.get('/Registration' ,function(req, res){
  res.render('Registration' , {title: 'Registration Page' , name: 'Dev Modi'})
});

router.get('/Postimage', isLoggedIn, function(req, res){
  res.render('Postimage' , {title: 'Postimage Page' , name: 'Dev Modi'})
});
router.get('/posts/:id(\\d+)', isLoggedIn ,getPostById, getCommentsForPostById ,function(req, res){
  res.render('Viewpost' , {title: 'Viewpost Page' , name: 'Dev Modi'})
});


module.exports = router;
