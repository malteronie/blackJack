
import jwtDecode from 'jwt-decode';

export  function isAuthenticated() {
    return !!localStorage.getItem("token");
}

