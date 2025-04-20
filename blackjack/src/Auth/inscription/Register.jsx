import React, { useState } from "react";
import '../connexion/style.css';
import { API_URL } from "../../services/config";

function Register() {
    const [formData, setFormData] = useState({
        nom: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_URL+"/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            console.log(response)
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                
                console.log('test')
                alert("Inscription réussie !");
            } else {
                alert("Erreur : " + "data.message");
            }
        } catch (error) {
            console.error("Erreur:"+ "error");
            alert("erreur");
        }
    };

    return (
        <div>
            <div className="form">
                <h1>Inscription</h1><br />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit">S'inscrire</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
