import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { InputGroup,Modal, Col, Form, Button, FormControl,Tabs, Tab } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Icon from "react-bootstrap-icons";
import "./TodoList.css";
import taskService from "../../../services/task.service"
import alertHandler from "../../../lib/alertHandler"

const  TodoList=({memberId , todo}) => {
  const [show, setShow] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [editTaskId, setEditTaskId] = useState();
  const [todayTasks, setTodayTasks] = useState([]);
  const [upComingTasks, setUpComingTasks] = useState([]);
  const [tommorowTasks, setTommorowTasks] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const[description , setDescription]= useState("");
  const today = new Date();

    
  useEffect(() => {
    getTasks()
  },[]);


  const handleClose = () => setShow(false);
   const updateTask=()=>{

    let data={
      id:editTaskId,
      date : getSimpleDate(date),
      taskName:name,
      taskDescription:description
    }

    taskService.update(
      data
    ).then(
      response => {
        alertHandler.successWithoutCallback("task updated successfully" )
        getTasks()    
        setShow(false);
      },
      error => {
        alertHandler.failed("Error while updating a new task, please try again!")
        setShow(false);
      }
    );
  }

  const getTaskById=(id)=>{
    console.log("edit id  "+id)
    taskService.getTaskById(id).then((res)=>{
     var taskInfo = res.data;
     setDescription(taskInfo.task_description)
     setName(taskInfo.task_name)
     setDate(new Date(taskInfo.date))
     setShow(true);
   
    })
  }


  const getSimpleDate=(date)=>{
    var todate=new Date(date).getDate();
    var tomonth=new Date(date).getMonth()+1;
    var toyear=new Date(date).getFullYear();
    var original_date=toyear+'-'+tomonth+'-'+todate;
    return original_date
  }
  const getTasks=()=>{
    
    taskService.getAll(memberId).then((res)=>{
      var allTasks =  res.data;
      var today = new Date()
      var t = new Date()
      var coming =  new Date().setDate(t.getDate()+2)
      var tommorow= t.setDate(t.getDate()+1)
      
      var upComingT =  allTasks.filter(function (item) {
        return  new Date(getSimpleDate(item.date)).getTime() >= new Date(getSimpleDate(coming)).getTime()
         
      })
      var todayT =  allTasks.filter(function (item) {
        return  getSimpleDate(item.date) == getSimpleDate(today)
        })
        var tommorowT =  allTasks.filter(function (item) {
        
          return   getSimpleDate(item.date)== getSimpleDate(tommorow)
          })
     
      setTodayTasks(todayT)
      setUpComingTasks(upComingT)
      setTommorowTasks(tommorowT)

    })
  }

  const changeTaskStatus=(event)=>{
    const target = event.target
    const id = target.id
    const checked = target.checked
    taskService.updateTaskStatusById(id).then((res)=>{
      if (res.data.msg='success'){
        if (checked===true){
          alertHandler.successWithoutCallback("GREAT JOB! You completed this task ")
        }
        getTasks()
      
      }else{
        alertHandler.failed('Server error ! please check the box again')
      }
      
    })
  }
 
  const callDeleteApi=(id)=>{
    console.log("delete id  "+id)
    taskService.delete(taskId).then((res)=>{
      if (res.data='success'){
        alertHandler.successWithoutCallback("Poof! Your task has been deleted!")
        getTasks()
      }else{
        alertHandler.failed('Server error ! delete the task again')
      }
      
    })
  }

  const deleteTask=(event)=>{
    const target = event.target 
    const id = target.id
    console.log("target id  "+id)
    setTaskId(id)
    setTimeout(() => {
      alertHandler.delete(id,callDeleteApi)
    }, 1500);
    
  
    
  
  }

  const editTask=(event)=>{
    const target = event.target
    const id = target.id
    console.log("edit id  "+id)
    setEditTaskId(id)
    getTaskById(id)
  
 
  }
  return (
    <>
    <Tabs
      defaultActiveKey="Today"
      id="uncontrolled-tab-example"
      className="TodoList"
    >
      <Tab
        eventKey="Today"
        title={
          <span className="tabSpan">
            <Icon.BrightnessHigh /> Today
          </span>
        }
      >

      {
        todayTasks.map((val , index) => {
          return (
              <div key={index}>
                <Form.Group controlId="formBasicCheckbox" className="formCard">
                  <h5>
                    {getSimpleDate(val.date)} <span className="dash"></span>
                  </h5>
                  <Form.Check type="checkbox"
                   label={val.task_name} 
                   id={val.id}
                   checked={val.status}
                   onChange={changeTaskStatus}
                   />

                  <p>
                    {val.task_description}
                  </p>
                    <div className="icons">
                    <Icon.Trash className="delete" id={val.id}     onClick={deleteTask}/>
                    
                    <Icon.PencilSquare className="edit" id={val.id} onClick={editTask} />
                  </div>
                </Form.Group>
              </div>
          );
        })
      }

      </Tab>
      <Tab
        eventKey="Tommorow"
        title={
          <span className="tabSpan">
            <Icon.CloudMoonFill /> Tommorow
          </span>
        }
      >
          
      {
        tommorowTasks.map((val , index) => {
          return (
              <div key={index}>
                <Form.Group controlId="formBasicCheckbox" className="formCard">
                  <h5>
                    {getSimpleDate(val.date)} <span className="dash"></span>
                  </h5>
                  <p type="checkbox" >{val.task_name}</p>

                  <p>
                    {val.task_description}
                  </p>
                  <div className="icons">
                   <Icon.Trash className="delete" id={val.id}     onClick={deleteTask}/>
                    
                    <Icon.PencilSquare className="edit" id={val.id} onClick={editTask} />
                  </div>
                </Form.Group>
              </div>
          );
        })
      }


      </Tab>
      <Tab
        eventKey="UpComing"
        title={
          <span className="tabSpan">
            <Icon.JournalAlbum /> UpComing
          </span>
        }
      >
            {
        upComingTasks.map((val , index) => {
          return (
              <div key={index}>
                <Form.Group controlId="formBasicCheckbox" className="formCard">
                  <h5>
                    {getSimpleDate(val.date)} <span className="dash"></span>
                  </h5>
                  <p type="checkbox" >{val.task_name}</p>

                  <p>
                    {val.task_description}
                  </p>
                  <div className="icons">
                  <Icon.Trash className="delete" id={val.id}    onClick={deleteTask}/>
                    
                    <Icon.PencilSquare className="edit" id={val.id}  onClick={editTask} />
                  </div>
                </Form.Group>
              </div>
          );
        })
      }

      </Tab>
      
    </Tabs>
   

    <Modal  size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>


        <Form className="TodoForm">
      <Form.Row className="align-items-center">
        <Col xs="auto">
          <Form.Label htmlFor="inlineFormInput" srOnly>
            Task Name
          </Form.Label>
            <Form.Control 
            id="inlineFormInput" 
            value={name} 
            onChange={(event) => setName(event.target.value)}/>
          </Col>
          <Col xs="auto">
            <Form.Label 
            htmlFor="inlineFormInputGroup" srOnly>
              Task Description
            </Form.Label>
            <InputGroup>
              <FormControl
                id="inlineFormInputGroup"
               value= {description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </InputGroup>
          </Col>

          <Col xs="auto">
            <DatePicker
              className="form-control"
              selected={new Date(date)}
              minDate={today}
              dateFromat='YYYY-MM-dd'
              onChange={(date) => setDate(date)}
            />
          </Col>

        
        </Form.Row>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
 

 </>
    
  );
}
export default TodoList;