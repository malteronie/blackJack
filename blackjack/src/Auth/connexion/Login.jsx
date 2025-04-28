import React, { useState } from "react";
import './style.css';
import { API_URL } from "../../services/config";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_URL+"/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);
                alert("Connexion réussie !");
                window.location.href = "/black-jack/index.html"; 
            }
            else {
                alert("Erreur : " + data.message);
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert("Une erreur est survenue.");
        }
    };

    return (
        <div className="login-container">
          <div className="form">
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
      
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                />
              </div>
      
              <button type="submit" className="submit-button">Se connecter</button>
            </form>
          </div>
        </div>
      );
}

export default Login;
