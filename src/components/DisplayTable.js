import React from "react";
import "./Display.css";
import deleteIcon from "../Assets/icons/delete-black-18dp.svg";
import editIcon from "../Assets/icons/create-black-18dp.svg";
import profile1 from "../Assets/profile-images/Ellipse -1.png";
import profile2 from "../Assets/profile-images/Ellipse -3.png";
import profile3 from "../Assets/profile-images/Ellipse -7.png";
import profile4 from "../Assets/profile-images/Ellipse -8.png";
import EmployeeService from '../service/EmployeeService';
import { useNavigate } from "react-router-dom";

const DisplayTable=(props)=>{
    const navigate = useNavigate();
 
  const update = (employeeId) => {
       
          navigate(`update/${employeeId}`);
     
  };

  const remove = (employeeId) => {
    console.log(employeeId);
    var answer = window.confirm("Data once deleted cannot be restored!! Do you wish to continue ?");
        if(answer === true){
            EmployeeService
                .deleteEmployee(employeeId)
                    .then((data) => {
              alert("Data deleted successfully!!");
              window.location.reload();
              props.getAllEmployees(); 
              
                    
            })
      .catch((error) => {
        console.log
        ("Something Went Wrong!");
      });
    }else{
      alert("Data Not Deleted")
    }
  };
   
    return (
      <>
      <table id="display" className="display">
        <tbody>
              
          <tr>
            <th>Profile Image</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Departments</th>
            <th>Salary</th>
            <th>Start Date</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
          {
              props.employeeArray &&
                props.employeeArray.map((employees,index) => (
                  <tr key={`${index}`}>
                    <td><img className="profile" 
                      src={
                        employees.profilePic 
                      }
                      alt=""
                      />
                    </td>
                   
                    <td>{employees.name}</td>
                    <td className="gender">{employees.gender}</td>
                    <td>
                      {employees.department
                       &&
                        employees.department.map((dept) => (
                          <div>{dept}</div>
                        ))}
                    </td>
                    <td> ₹{employees.salary}</td>
                    <td>{employees.doj}</td>
                    <td>{employees.note}</td>
                    <td>
                      <img onClick={() => remove(employees.id)}
                      src={deleteIcon}
                      alt="delete" />
                    <img onClick={() => update(employees.id)}
                      src={editIcon}
                      alt="edit" />
                    </td>
                  </tr>
                ))
            }
          </tbody>
      </table>
      </>
    );
  };
  export default (DisplayTable);