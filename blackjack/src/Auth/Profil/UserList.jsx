import React, { useEffect, useState } from "react";
import { API_URL } from "../../services/config";
import "./UserList.css"; // On va ajouter un fichier CSS pour le responsive

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(API_URL + "/api/admin/users", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(res => res.json())
            .then(setUsers)
            .catch(err => console.error("Erreur lors du chargement des utilisateurs :", err));
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm("Confirmer la suppression de cet utilisateur ?")) return;

        fetch(API_URL + `/api/admin/users/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(() => setUsers(users.filter(user => user._id !== id)))
            .catch(err => console.error("Erreur lors de la suppression :", err));
    };

    return (
        <div className="userlist-container">
            <h2>👥 Liste des utilisateurs</h2>
            {users.length > 0 ? (
                <div className="table-wrapper">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Solde</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td data-label="Nom">{user.nom}</td>
                                    <td data-label="Email">{user.email}</td>
                                    <td data-label="Solde">{user.solde} $</td>
                                    <td data-label="Action">
                                        <button className="delete-btn" onClick={() => handleDelete(user._id)}>🗑️ Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Aucun utilisateur à afficher.</p>
            )}
        </div>
    );
}

export default UserList;
