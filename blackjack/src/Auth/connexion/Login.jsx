import React from "react";
import './style.css'
function Login() {
  return (
    <div>
        <div className="form" style={{backgroundColor:'black'}}>
        <form action="" method="post" >
            <h1>Connexion</h1>
            <div>
                <label htmlFor="">Email</label>
                <input type="email" />
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input type="password" />
            </div>
            <button>Connexion</button>
        </form>
        </div>
    </div>
  );
}

export default Login;
