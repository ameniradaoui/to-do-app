import React, { useState, useEffect } from "react";
import TodoForm from "./toDoForm.component";
import TodoList from "./toDoList.component";
import authService from "../../../services/auth.service"
export default function AllTasks() {
  const [memberId, setMemberId] = useState(null);
  const[todos , setToDo]=useState([])
  
  useEffect(() => {
    getCurrentUser()

  },[]);
  const getCurrentUser=()=>{
    const user = authService.getCurrentUser();
    if (user!==undefined && user!==null){
      setMemberId(user.id)
    }
  
    
  }

  return (
    <div>
      <div className="body">
        {

         memberId!==null ? 
         <div>
         <h5>Todos</h5>
         <TodoForm memberId={memberId}  /> 
         <TodoList memberId={memberId} />
         </div>
         :
         <div></div>
        }
       
      </div>
    </div>
  );
}
