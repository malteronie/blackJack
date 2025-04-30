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

    // Validation mot de passe fort
    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword(formData.password)) {
            alert("Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial (@$!%*#?&)");
            return;
        }

        try {
            const response = await fetch(API_URL + "/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                alert("Inscription réussie !");
                window.location.href = "/black-jack/index.html#/login";
            } else {
                alert("Erreur : " + data.message);
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert("Erreur lors de l'inscription.");
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