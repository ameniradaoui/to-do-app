'use strict';

const _publics = {};
var config = require('../config');
var getRawBody = require('raw-body');
var pool=config.pool;



_publics.getRawBody = (req) => {
  return new Promise((resolve, reject) => {
    getRawBody(req, {
      length: req.headers['content-length'],
      limit: '1mb',
    }, function (err, string) {
      if (err) return next(err)
      req.text = string;
      return resolve(req.text);
    })
  });
};

_publics.createTask = (task) => {
  var date = task.date;
  var memberId = task.memberId;
  var taskName = task.taskName;
  var taskDescription = task.taskDescription;


  return new Promise((resolve, reject) => {
    var message = {};
    var sql = "INSERT INTO task SET ? ";
    const newTask = { date:date , id_member: memberId , task_name:taskName,task_description: taskDescription};
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, newTask, function (err, result) {
        connection.release(); 
      if (err) {
        message ={msg:"failure"};
        reject(err);
      } else {
        message = {msg:"success",taskId:result.insertId};
      }
      return resolve(message);
    });
  });
  });
};



_publics.getAllTasksByMemberId = (req) => {

  var memberId = req.query.memberId;

  return new Promise((resolve, reject) => {
    var sql = "select * FROM task where id_member=?";

    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql,[memberId],  function (err, result) {
        connection.release(); 
      if (err) reject(err);
      return resolve(result);
    });
  });
});
};


_publics.getTaskById = (req) => {

  var id = req.query.id;

  return new Promise((resolve, reject) => {
    var sql = "select * FROM task where id= ? ";

    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql,[id], function (err, result) {
        connection.release(); 
      if (err) reject(err);
      return resolve(result[0]);
    });
  });
});
};

_publics.deleteTask = (req) => {
  var id = req.query.id;
  console.log(id);
  return new Promise((resolve, reject) => {
    var sql = "DELETE FROM task WHERE id = ?";
    var msg = "";
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      }
      connection.query(sql, [id], function (err, result) {
        connection.release();
        if (err) {
          msg = "failure";
          reject(err);
        } else {
          msg = "success";
        }
        return resolve(msg);
      });
    });
  });
};


_publics.updateTaskById = (task) => {
  var id = task.id;
  var date = task.date;
  var taskName = task.taskName;
  var taskDescription = task.taskDescription;


  return new Promise((resolve, reject) => {
    var message = {};
    var sql = "update task SET date=?  ,task_name=? , task_description=? where id=?  ";
  
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      }
      connection.query(sql, [date, taskName,taskDescription , id], function (err, result) {
        connection.release();
        if (err) {
          message = { msg: "failure" };
          reject(err);
        } else {
          message = { msg: "success" };
        }
        return resolve(message);
      });
    });
  });
};



_publics.updateTaskStatusById = (status ,req) => {
  var id = req.query.id;
 
  return new Promise((resolve, reject) => {
    var message = {};
    var sql = "update task SET status=? where id=?  ";
  
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      }
      connection.query(sql, [status , id], function (err, result) {
        connection.release();
        if (err) {
          message = { msg: "failure" };
          reject(err);
        } else {
          message = { msg: "success" };
        }
        return resolve(message);
      });
    });
  });
};



_publics.countPendingAndCompletedTaskPerDay = (memberId) => {
 
  return new Promise((resolve, reject) => {
    var sql = "select * from  (select count(*) as completedTasks from task where id_member = ? and status = 1 and DATE(date) = CURDATE() ) A , (select count(*) as pendingTasks from task where id_member = ? and status = 0 and DATE(date) = CURDATE() ) B ";

    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, [memberId , memberId] , function (err, result) {
        connection.release(); 
      if (err) reject(err);
      return resolve(result[0]);
    });
  });
});
};



module.exports = _publics;

