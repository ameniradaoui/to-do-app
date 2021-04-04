import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup } from "react-bootstrap";
import "../../home/tasks.css";
import taskService from "../../../services/task.service"
import authService from "../../../services/auth.service"

export default function PendingTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getCurrentUser(getAllPendingTasks)
  },[]);
  const getAllPendingTasks=(memberId)=>{
    taskService.getAll(memberId).then((res)=>{
       var tasksList = res.data
       var filtredTasks =[]
       tasksList.forEach(element => {
         if (element.status===0){
          filtredTasks.push(element)
         }
         
       });
       setTasks(filtredTasks)
    }).catch((err)=>{
      console.log(err)
    })

  }
  const getCurrentUser=(callback)=>{
    const user = authService.getCurrentUser();
    if (user!==undefined && user!==null){
   
      callback(user.id)
    }
  
  }
  return (
    <div className="PendingTaks">
      <h2 className="title">Today Pending Tasks</h2>
      <ListGroup variant="flush">
      {
        tasks.map((val , index) => {
          return (
            <ListGroup.Item key={index} className="taskName">
            {val.task_name}: {val.task_description}
            </ListGroup.Item>
         
          );
        })
      }
       
      </ListGroup>
    </div>
  );
}
