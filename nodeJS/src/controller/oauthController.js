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

_publics.register = ( member) => {
  var fullname = member.fullname;
  var email = member.email;
  var password = member.password;

  return new Promise((resolve, reject) => {
    var message = {};
    var sql = "INSERT INTO member SET ? ";
    const newMember = { fullname: fullname,  email: email,password: password};
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, newMember, function (err, result) {
        connection.release(); 
      if (err) {
        message ={msg:"failure"};
        reject(err);
      } else {
        message = {msg:"success",memberId:result.insertId};
      }
      return resolve(message);
    });
  });
  });
};


_publics.login = (member) => {

  var memberDetails = {};
  var member0 = JSON.parse(member);
  var email = member0.email;
  var password = member0.password;

  return new Promise((resolve, reject) => {

    var sql = "select * FROM member where email = ? and password = ? ";
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, [email, password], function (err, members) {
        connection.release(); 
      var members = JSON.stringify(members);
      members = JSON.parse(members);

      if (err) {
        return reject();
      } else if (members[0] === undefined || (members[0].password !== password)) {
        memberDetails = {
          status: 403
        };
        return reject();
      } else {
        memberDetails = {
          member: members[0],
          status: 200,
        };
      }
      return resolve(memberDetails);
    });
  });
});
};

_publics.getMemberById = (req) => {
  var idMember = req.query.id;
  return new Promise((resolve, reject) => {
    var sql = "select * FROM member where id=?";
    pool.getConnection(function(err,connection){ 
      if (err) {  
      reject(err);
      }
      connection.query(sql, [idMember], function (err, result) {
        connection.release(); 
      if (err) reject(err);
      return resolve(result[0]);
    });
  });
});
};




module.exports = _publics;