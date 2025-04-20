import React, { useEffect, useState } from "react";
import "./css/history.css";

function History() {
    const [history, setHistory] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) return;

        fetch(`http://localhost:8080/api/game/history/${userId}`)
            .then(res => res.json())
            .then(data => setHistory(data))
            .catch(err => console.error(err));
    }, [userId]);

    return (
        <div className="history-container">
          <button onClick={() => {throw new Error("This is your first error!");}}>Break the world</button>;

            <h2>🃏 Historique des Parties</h2>
            {history.length > 0 ? (
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Résultat</th>
                            <th>Score Joueur</th>
                            <th>Score Croupier</th>
                            <th>Actions</th>
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
                                <td>{game.actions.join(", ")}</td>
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
