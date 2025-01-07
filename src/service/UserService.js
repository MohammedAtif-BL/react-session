import axios from "axios";

class UserService{
    addUser(Object){
        return axios.post("http://localhost:8080/add",Object)
    }

    getAllUsers(){
        return axios.get("http://localhost:8080")
    }
}
export default new UserService();