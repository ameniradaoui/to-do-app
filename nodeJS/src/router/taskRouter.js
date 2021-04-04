'use strict';

const router = require('express').Router();
const taskController=require('../controller/taskController');
const utils=require('../utils');
var options = {
    inflate: true,
    limit: '100kb',
    type: 'application/octet-stream'
  };
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(bodyParser.raw(options));
  router.use((req, res, next) => {
    res.payload = {};
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader('Access-Control-Allow-Credentials', true)
    next();
  });

router.use(bodyParser.urlencoded({extended : true}));



router.post('/createTask',(req, res, next)=>
taskController.getRawBody(req)
.then(taskDetails=>{
    return taskController.createTask(JSON.parse(taskDetails))
})
.then(result=>{
    res.send(result);
})
.catch(next));



router.get('/getAllTasksByMemberId',urlencodedParser, (req, res, next) => 
taskController.getAllTasksByMemberId(req)
.then(tasksDetails=>{
    res.send(tasksDetails);
})
.catch(next));



router.get('/getTaskById',urlencodedParser, (req, res, next) => 
taskController.getTaskById(req)
.then(task=>{
    res.send(task);
})
.catch(next));


router.delete('/deleteTask',urlencodedParser, (req, res, next) => 
taskController.deleteTask(req)
.then(result=>{
    res.send(result);
})
.catch(next));



router.put('/updateTaskById',(req, res, next)=>
taskController.getRawBody(req)
.then(tasksDetails=>{
    return taskController.updateTaskById(JSON.parse(tasksDetails))
})
.then(result=>{
    res.send(result);
})
.catch(next));


router.put('/updateTaskStatusById',(req, res, next)=>
taskController.getTaskById(req)
.then(taskInfo=>{
    let actualStatus = taskInfo.status;
    let newStatus ; 
    if (actualStatus === 0 ){
       newStatus = utils.STATUS.COMPLETED
    }else{
        newStatus = utils.STATUS.PENDING
    }
    return taskController.updateTaskStatusById(newStatus, req)
})
.then(result=>{
    res.send(result);
})
.catch(next));


router.get('/countPendingAndCompletedTaskPerDay',urlencodedParser, (req, res, next) => 
taskController.countPendingAndCompletedTaskPerDay(req.query.memberId)
.then(details=>{
    res.send(details);
})
.catch(next));

module.exports = router;
