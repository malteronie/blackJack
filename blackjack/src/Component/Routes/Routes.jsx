import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "../../Auth/connexion/Login";
import Register from "../../Auth/inscription/Register";
import Profile from "../../Auth/Profil/Profile";
import Game from "../../blackJack/Game";

 function Router(){
    return (
        <div>
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<Game />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router