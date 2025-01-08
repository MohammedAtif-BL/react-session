import React, { useState, useEffect } from 'react';
import profile1 from '../Assets/profile-images/Ellipse -3.png';
import profile2 from '../Assets/profile-images/Ellipse -1.png';
import profile3 from '../Assets/profile-images/Ellipse -8.png';
import profile4 from '../Assets/profile-images/Ellipse -7.png';
import './EmployeeForm.css';
import logo from '../Assets/images/logo.png'
import { useParams, Link } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';

const EmployeeForm = (props) => {
    let initialValue = {
        name: '',
        allDepartment: [
            'HR', 'Sales', 'Finance', 'Engineer', 'Others'
        ],
        departmentValue: [],
        gender: '',
        salary: '',
        day: '',
        month: '',
        year: '',
        startDate: '',
        notes: '',
        id: '',
        profilePic: '',
        isUpdate: false,        
    }
    
    const [formValue, setForm] = useState(initialValue);
    const params = useParams();
    

    useEffect(() => {
        if (params.id) {
          getDataById(params.id);
        }
    }, []);

      const getDataById = (id) => {
        EmployeeService
          .getEmployee(id)
          .then((response) => {
            console.log(response.data);
            let obj = response.data;
            setFormFields(obj);
          })
          .catch((err) => {
            alert("err is ", err);
          });
      };
    
    const setFormFields = (obj) => {
       
        setForm({
          ...formValue,
          ...obj,
          id: obj.id,
          name: obj.name,
          departmentValue: obj.department,
          isUpdate: true,
          startDate:obj.doj,
          notes: obj.note,
        });
      };
      
    const changeValue = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
        
        
        setForm({ ...formValue, [event.target.name]: event.target.value })

    }

    const onCheckChange = (name) => {
        let index = formValue.departmentValue.indexOf(name);

        let checkArray = [...formValue.departmentValue]
        if (index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        setForm({ ...formValue, departmentValue: checkArray });
    }
    
    const getChecked = (name) => {
        return formValue.departmentValue && formValue.departmentValue.includes(name);
    }
 
    const save = async (event) => {
        event.preventDefault();
        
        let object = {
            name: formValue.name,
            department: formValue.departmentValue,
            gender: formValue.gender,
            salary: formValue.salary,
            doj: formValue.startDate,
            note: formValue.notes,
            id: formValue.id,
            profilePic: formValue.profilePic
          };
          

          console.log(object);
          
          if (formValue.isUpdate) {
            var answer =  window.confirm("Data once modified cannot be restored!! Do you wish to continue?");
            if(answer === true){
                EmployeeService
                .updateEmployee(params.id,object)
                .then((data) => {
                    
                        alert("Data updated successfully!");
                    
                })
                .catch((error) => {
                    alert("WARNING!! Error updating the data!",error);
                });
                }else{
                    window.location.reload();
                }
          } else {
            EmployeeService
              .addEmployee(object)
              .then((response) => {
                console.log(response);
                alert("Data Added successfully!!",response)
              })
              .catch(error => {
                console.log(error);
                alert("WARNING!! Error while adding the data!");
              });
        }     
    }
  
    const reset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate });
    }
   
    return (
        <div className="payroll-main">
            <header className='header-content header'>
                <div className="logo-content">
                    <img src={logo} alt="" />
                    <div>
                        <span className="emp-text">EMPLOYEE</span> <br />
                        <span className="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>
            </header>
            <div className="form-content">
                <form className="form-head" action="#" onSubmit={save}>
                    <div className="form-head">Employee Payroll form</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="name">Name</label>
                        <input className="input" type="text" id="name" name="name" value={formValue.name} onChange={changeValue} placeholder="Your name.." />
                    {/* <error className="error">{formValue.error.name}</error> */}
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="profilePic">Profile image</label>
                        <div className="profile-radio-content">
                            <label >
                                <input type="radio" name="profilePic" checked={formValue.profilePic === '../../Assets/profile-images/Ellipse -1.png'} value="../../Assets/profile-images/Ellipse -1.png" onChange={changeValue} />
                                <img className="profile" src={profile2} alt="profile" />
                            </label>
                            <label >
                                <input type="radio" name="profilePic" checked={formValue.profilePic === '../../Assets/profile-images/Ellipse -3.png'} value="../../Assets/profile-images/Ellipse -3.png" onChange={changeValue} />
                                <img className="profile" src={profile1} alt="profile" />
                            </label>
                            <label >
                                <input type="radio" name="profilePic" checked={formValue.profilePic === '../../Assets/profile-images/Ellipse -7.png'} value="../../Assets/profile-images/Ellipse -7.png" onChange={changeValue} />
                                <img className="profile" src={profile4} alt="profile" />
                            </label>
                            <label >
                                <input type="radio" name="profilePic" checked={formValue.profilePic === '../../Assets/profile-images/Ellipse -8.png'} value="../../Assets/profile-images/Ellipse -8.png" onChange={changeValue} />
                                <img className="profile" src={profile3} alt="profile" />
                            </label>

                        </div>
                        {/* <error className="error">{formValue.error.profilePic}</error> */}
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="gender">Gender</label>
                        <div>
                            <input type="radio" id="male" checked={formValue.gender === 'male'} onChange={changeValue} name="gender" value="male" />
                            <label className="text" htmlFor="male">Male</label>
                            <input type="radio" id="female" checked={formValue.gender === 'female'} onChange={changeValue} name="gender" value="female" />
                            <label className="text" htmlFor="female">Female</label>
                        </div>
                        {/* <error className="error">{formValue.error.gender}</error> */}
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="departments">Department</label>
                        <div>
                            {formValue.allDepartment.map(item => (
                                <span key={item}>
                                    <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item}
                                        checked={getChecked(item)} value={item} />
                                    <label className="text" htmlFor={item}>{item}</label>
                                </span>
                            ))}

                        </div>
                        {/* <error className="error">{formValue.error.department}</error> */}
                    </div>

                    <div className="row-content">
                        <label className="label text" htmlFor="salary">Salary</label>
                        <input className="input" type="text" id="salary" name="salary" value={formValue.salary} onChange={changeValue} />
                        {/* <error className="error">{formValue.error.salary}</error> */}
                    </div>

                    <div className="row-content">
                        <label className="label text" htmlFor="startDate">Start Date</label>
                        <input className="input" type="date" id="startDate" name="startDate" value={formValue.startDate} onChange={changeValue} placeholder="DD/MM/YYYY" />
                        {/* <error className="error">{formValue.error.startDate}</error> */}
                    </div>

                    <div className="row-content">
                        <label className="label text" htmlFor="notes">Notes</label>
                        <textarea onChange={changeValue} id="notes" value={formValue.notes} className="input" name="notes" placeholder=""
                            style={{ height: '120%' }}></textarea>
                    {/* <error className="error">{formValue.error.notes}</error> */}
                    </div>

                    <div className="buttonParent">
                        <Link to="/" className="resetButton button cancelButton">Cancel</Link>
                        <Link to="/" className="resetButton button cancelButton">Employee List</Link>

                        <div className="submit-reset">
                        
                            <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                            <button type="button" onClick={reset} className="resetButton button">Reset</button>
                        </div>
                    </div >
                </form >
            </div >
        </div >
    );
}                     
export default EmployeeForm;