import axios from "axios";

class EmployeeService{

    addEmployee(data){
        return axios.post("http://localhost:8080/add",data)
    }

    getAllEmployees(){
        return axios.get("http://localhost:8080")
    }

    deleteEmployee(id){
        return axios.delete(`http://localhost:8080/${id}`)
    }

    getEmployee(id){
        return axios.get(`http://localhost:8080/${id}`)
    }

    updateEmployee(id,data){
        return axios.put(`http://localhost:8080/${id}`,data)
    }

}

export default new EmployeeService();