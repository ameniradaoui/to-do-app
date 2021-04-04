
import axios from 'axios';
import endpoints from "../lib/endpoints"

class TaskService {

    getAll(memberId) {
        return axios.get(endpoints.getAllTasksByMemberId+"?memberId="+memberId);
      }
    
      getTaskById(id) {
        return axios.get(endpoints.getTaskById+'?id='+id);
      }

      createTask(date, memberId, taskName, taskDescription) {
        return axios.post(endpoints.createTask, {
          date,
          memberId,
          taskName,
          taskDescription
        });
      }

    
      update( data) {
        return axios.put(endpoints.updateTaskById, data);
      }
     
      delete(id) {
        return axios.delete(endpoints.deleteTask+'?id='+id);
      }

    
      updateTaskStatusById(id) {
        return axios.put(endpoints.updateTaskStatusById+'?id='+id) ;
      }

      countPendingAndCompletedTaskPerDay(memberId) {
     
        return axios.get(endpoints.countPendingAndCompletedTaskPerDay+'?memberId='+memberId) ;
      }
    
}

export default new TaskService  ();