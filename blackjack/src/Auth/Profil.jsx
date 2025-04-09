import React, { useEffect, useState } from "react";
import { isAuthenticated} from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Profil() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        } else {
            // const userData = getUserFromToken();
            // setUser(userData);
        }
    }, [navigate]);

    return (
        <div className="profil-page">
            <h1>Mon Profil</h1>
            {user ? (
                <div className="profil-card">
                    <p><strong>Nom :</strong> {user.nom || "Non renseigné"}</p>
                    <p><strong>Email :</strong> {user.email}</p>
                </div>
            ) : (
                <p>Chargement...</p>
            )}
        </div>
    );
}

export default Profil;
