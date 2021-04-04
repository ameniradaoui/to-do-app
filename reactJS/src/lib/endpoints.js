const Endpoints = {};

Endpoints.register = "/oauth/register";
Endpoints.login = "/oauth/login";
Endpoints.getMemberById = "/oauth/getMemberById";


Endpoints.createTask = "/task/createTask";
Endpoints.deleteTask = "/task/deleteTask";
Endpoints.updateTaskById = "/task/updateTaskById";
Endpoints.getAllTasksByMemberId = "/task/getAllTasksByMemberId";
Endpoints.getTaskById = "/task/getTaskById";
Endpoints.updateTaskStatusById = "/task/updateTaskStatusById";
Endpoints.countPendingAndCompletedTaskPerDay = "/task/countPendingAndCompletedTaskPerDay";


export default Endpoints;
