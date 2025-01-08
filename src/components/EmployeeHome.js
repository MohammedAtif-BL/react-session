import React, { useState, useEffect } from 'react';
import './EmployeeHome.css';
import logo from '../Assets/images/logo.png';
import addImage from '../Assets/icons/add-24px.svg';
import { Link } from "react-router-dom";
import DisplayTable from './DisplayTable';
import searchIcon from "../Assets/icons/search-black-18dp.svg";
import EmployeeService from '../service/EmployeeService';

const EmployeeHome = () => {
    const [searchExpand, setSearchExpand] = useState(false);
    const [allEmployeeArray, setAllEmployeeArray] = useState([]);
    const [filteredEmployeeArray, setFilteredEmployeeArray] = useState([]);

    useEffect(() => {
        getAllEmployee();
    }, []);

    const openSearch = () => {
        setSearchExpand(true);
    };

    const getAllEmployee = () => {
        EmployeeService.getAllEmployees()
            .then((response) => {
                setAllEmployeeArray(response.data);
                setFilteredEmployeeArray(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                alert("Something went wrong while getting all the records", err);
            });
    };

    const search = (event) => {
        const searchValue = event.target.value;
        if (searchValue.trim().length > 0) {
            const filteredArray = allEmployeeArray.filter((element) =>
                element.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredEmployeeArray(filteredArray);
        } else {
            setFilteredEmployeeArray(allEmployeeArray);
        }
    };

    return (
        <div>
            <body>
                <header className="header-content header">
                    <div className="logo-content">
                        <img src={logo} alt="logo" />
                        <div>
                            <span className="emp-text">EMPLOYEE</span><br />
                            <span className="emp-text emp-payroll">PAYROLL</span>
                        </div>
                    </div>
                </header>
                <div className="main-content">
                    <div className="header-content sub-main-content">
                        <div className="emp-details-text">
                            Employee Details
                            <div className="emp-count"></div>
                        </div>
                        <div className="search-box" onClick={openSearch}>
                            <input
                                className={`input1 ${searchExpand && "input1-expand"}`}
                                onChange={search}
                                type="text"
                                placeholder="Search Employee"
                            />
                            <img className="search-icon" src={searchIcon} alt="" />
                        </div>

                        <Link className="add-btn" to="/add">
                            <img src={addImage} alt="Add user" />
                            <div>Add User</div>
                        </Link>
                    </div>
                    <div className="table-main">
                        <DisplayTable
                            employeeArray={filteredEmployeeArray}
                            getAllEmployee={getAllEmployee}
                        />
                    </div>
                </div>
            </body>
        </div>
    );
};

export default EmployeeHome;