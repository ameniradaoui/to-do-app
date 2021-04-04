'use strict';

const router = require('express').Router();
const authController = require('../controller/oauthController');
var options = {
    inflate: true,
    limit: '100kb',
    type: 'application/octet-stream'
  };
const bodyParser = require('body-parser');
router.use(bodyParser.raw(options));
router.use((req, res, next) => {
    res.payload = {};
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader('Access-Control-Allow-Credentials', true)
    next();
  });
  

router.post('/register',(req, res, next)=>
authController.getRawBody(req)
.then(memberDetails=>{
    return authController.register(JSON.parse(memberDetails))
})
.then(result=>{
        res.send(result);    
})
.catch(next));


router.post('/login',(req, res, next)=>
authController.getRawBody(req)
.then(memberDetails=>{
    return authController.login(memberDetails)
})
.then(result=>{
    res.send(result);    
})
.catch(next));

router.get('/getMemberById',(req, res, next)=>
authController.getMemberById(req)
.then(result=>{
    res.send(result);    
})
.catch(next));


module.exports = router;


