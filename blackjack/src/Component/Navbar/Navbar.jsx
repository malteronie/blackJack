import React from "react";
import { isAuthenticated } from "../../Auth/utils/auth";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "#/login"; 
  };
  return(
    <div>
  <nav className="navbar navbar-expand-lg navbar-secondary bg-secondary">
    { }
    <a className="navbar-brand custom-link" href="#/">Accueil</a>

    { }
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    { }
    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="navbar-nav d-flex align-items-center">
        {isAuthenticated() ? (
          <>
            <li className="nav-item">
              <a className="custom-link" href="#/profil">Profil</a>
            </li>
            <li className="nav-item">
              <button className="btn custom-btn" onClick={handleLogout}>Déconnexion</button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <a className="custom-link" href="#/login">Connexion</a>
            </li>
            <li className="nav-item">
              <a className="custom-link" href="#/register">Inscription</a>
            </li>
          </>
        )}
      </ul>
    </div>
  </nav>
</div>



  )
}

export default Navbar