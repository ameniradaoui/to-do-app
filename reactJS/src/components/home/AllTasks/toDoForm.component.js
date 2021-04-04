import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup, Col, Form, Button, FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TodoForm.css";
import taskService from "../../../services/task.service"
import alertHandler from "../../../lib/alertHandler"
const TodoForm = ({memberId}) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const[description , setDescription]= useState("");


  
  const createTask=( )=>{

    if (name === ""|| description === ""){
      alertHandler.failed("Name and description are required !")

      return;
    }
    var todate=new Date(date).getDate();
    var tomonth=new Date(date).getMonth()+1;
    var toyear=new Date(date).getFullYear();
    var original_date=toyear+'-'+tomonth+'-'+todate;
    taskService.createTask(
      original_date,
      memberId,
      name,
      description
    ).then(
      response => {
        alertHandler.successWithoutCallback("task created successfully" ) 
        window.location = '/#/dashboard';
      },
      error => {
        alertHandler.failed("Error while created a new task, please try again!")
      }
    );
  }

  return (
    <Form className="TodoForm">
      <Form.Row className="align-items-center">
        <Col xs="auto">
          <Form.Label htmlFor="inlineFormInput" srOnly>
            Task Name
          </Form.Label>
          <Form.Control 
          id="inlineFormInput" 
          placeholder="Task Name" 
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
              placeholder="Task Description"
              onChange={(event) => setDescription(event.target.value)}
            />
          </InputGroup>
        </Col>

        <Col xs="auto">
          <DatePicker
            className="form-control"
            selected={date}
            minDate={date}
            dateFromat='YYYY-MM-dd'
            onChange={(date) => setDate(date)}
          />
        </Col>

        <Col xs="auto">
          <Button type="submit" onClick={createTask}>+ ADD TASK</Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default TodoForm;
