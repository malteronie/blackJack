import React from "react";
import { isAuthenticated } from "../../Auth/utils/auth";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    
    window.location.href = "/login"; 
};
  return(
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light  d-flex justify-content-between">
        <a className="navbar-brand" href="#/black-jack">Accueils</a>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          {isAuthenticated() ? (
                <>
                    <button onClick={handleLogout}>Déconnexion</button>
                </>
            ) : (
                <>
                    <a href="#/login" style={{marginRight:"6px"}}>Connexion</a>
                    <a href="#/register">Inscription</a>
                </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar