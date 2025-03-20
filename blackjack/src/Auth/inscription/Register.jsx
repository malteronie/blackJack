import React from "react";
import '../connexion/style.css'
function Register() {
    return (
    <div>
        <div className="form">
            <h1>Inscription</h1><br />
            <form action="" method="post">
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="name" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" />
                </div>
                <div>
                    <label htmlFor="tel">Phone</label>
                    <input type="password" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" />
                </div>
                <button>Connexion</button>
            </form>
        </div>
    </div>
)}

export default Register