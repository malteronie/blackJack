import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/history.css";
import { API_URL } from "../services/config";

function History() {
    const [history, setHistory] = useState([]);
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const handleAdminClick = () => {
        window.location.href = "/black-jack/index.html#/users";
    };
    useEffect(() => {
        if (!userId) {
            window.location.href = "/black-jack/index.html#/login";
            return;
        }

        fetch(API_URL + `/api/game/history/${userId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                if (res.status === 401) {
                    window.location.href = "/black-jack/index.html#/login";
                } else {
                    return res.json();
                }
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setHistory(data);
                } else {
                    console.error("Données inattendues :", data);
                    setHistory([]);
                }
            })
            .catch(err => console.error(err));
    }, [userId, navigate]);

    const totalGames = history.length;
    const totalWins = history.filter(game => game.result === "win").length;
    const totalLosses = history.filter(game => game.result === "lose").length;
    const totalDraws = history.filter(game => game.result === "draw").length;

    const winPercentage = totalGames > 0 ? ((totalWins / totalGames) * 100).toFixed(2) : 0;

    return (
        <div className="history-container">
            {role === "admin" && (
        <button onClick={handleAdminClick} className="admin-button">
        🔧 Gérer les utilisateurs
        </button>
        )}
            <h2>🃏 Historique des Parties</h2>

            {/* Affichage des totaux et du pourcentage */}
            <div className="stats">
                <p>Total des parties : {totalGames}</p>
                <p>Parties gagnées : {totalWins}</p>
                <p>Parties perdues : {totalLosses}</p>
                <p>Parties nulles : {totalDraws}</p>
                <p>Pourcentage de victoires : {winPercentage}%</p>
            </div>

            {history.length > 0 ? (
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Résultat</th>
                            <th>Score J</th>
                            <th>Score C</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((game, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{new Date(game.date).toLocaleString()}</td>
                                <td>{game.result.toUpperCase()}</td>
                                <td>{game.playerScore}</td>
                                <td>{game.dealerScore}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucune partie enregistrée pour l’instant.</p>
            )}
        </div>
    );
}

export default History;
