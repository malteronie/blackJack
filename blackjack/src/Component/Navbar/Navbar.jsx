import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../Auth/utils/auth";

function Navbar() {
  const [auth, setAuth] = useState(isAuthenticated()); // On stocke l'état d'auth au montage

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setAuth(false); // 🔥 On change l'état pour forcer le re-render
    window.location.href = "#/login"; 
  };

  useEffect(() => {
    const checkAuth = () => setAuth(isAuthenticated());

    window.addEventListener('storage', checkAuth); // si d'autres onglets modifient le localStorage
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container-fluid">
        <a className="navbar-brand custom-link" href="#/">Accueil</a>

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

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav d-flex align-items-center">
            {auth ? ( // 🔥 on lit l'état auth ici
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
      </div>
    </nav>
  );
}

export default Navbar;
