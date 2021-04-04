import React, { useState, useEffect } from "react";
import "./home.css";
import PieChart from "react-simple-pie-chart";
import userImage from "../../../images/userImage.png";
import authService from "../../../services/auth.service"
import taskService from "../../../services/task.service"
export default function HomePage() {
  const [date, setDate] = useState("");
  const [fullname ,setFullname]=useState("");
  const [tasksNumber ,setTasksNumber]=useState(0);
  const [completedTasksNumber ,setCompletedTasksNumber]=useState(0);
  const [pendingTasksNumber ,setPendingTasksNumber]=useState(0);
  useEffect(() => {
    var today = new Date();
    var newDate =
      today.getDate() +
      " " +
      today.toLocaleString("default", { month: "long" }) +
      " " +
      today.getFullYear();
    setDate(newDate);
    getCurrentUser(getAllTasks);
  },[]);
  const getCurrentUser=(callback)=>{
    const user = authService.getCurrentUser();
  
    if (user!==undefined && user!==null){
      setFullname(user.fullname)
      callback(user.id)
    }

    

  }

  const getAllTasks=(idMember)=>{

    taskService.countPendingAndCompletedTaskPerDay(idMember).then((res)=>{
    setTasksNumber(res.data.completedTasks+res.data.pendingTasks)
    setCompletedTasksNumber(res.data.completedTasks)
    setPendingTasksNumber(res.data.pendingTasks)
   }).catch((err)=>{
     console.log(err)
   })
   



  }


  return (
    <div className="HomePage">
      <div className="text-center">
        <div className="container">
          <img className="avatar" src={userImage} />
          <h3>{fullname}</h3>
          <h6>Today you have {tasksNumber} tasks</h6>
          <hr className="star-light" />
         
          <h5 className="label">Completed Tasks on {date}</h5>
          {
            tasksNumber === 0 || completedTasksNumber ===0?<div></div> : 
            <div className="myChart">
            <PieChart
              slices={[
                { color: "#fff", value: pendingTasksNumber },
                { color: "#574b90", value: completedTasksNumber},
              ]}
            />
            <h5 className="percentage">{completedTasksNumber}/{tasksNumber}</h5>
          </div>
          }
          
        </div>

    
      </div>
    </div>
  );
}
