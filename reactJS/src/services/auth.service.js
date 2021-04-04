import axios from "axios";
import endpoints from "../../src/lib/endpoints"



class AuthService {
  login(email, password) {
    return axios
      .post(endpoints.login, {
        email,
        password
      })
      .then(response => {
        if (response.data.status=200){
          localStorage.setItem("user", JSON.stringify(response.data.member));
        }
        
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    window.location = '/#/login';
  }

  register(fullname, email, password) {
    return axios.post(endpoints.register, {
      fullname,
      email,
      password
    });
  }

  getCurrentUser() {
    let user = localStorage.getItem('user');
    if (user === null ){
      window.location = '/#/login';
    } else{
      return JSON.parse(user);
    }
   
    
  }
}

export default new AuthService();