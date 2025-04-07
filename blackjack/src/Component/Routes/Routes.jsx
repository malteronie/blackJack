import React from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router";
import Login from "../../Auth/connexion/Login";
import Register from "../../Auth/inscription/Register";
import Profile from "../../Auth/Profil/Profile";
import Game from "../../blackJack/Game";

 function Router(){
    return (
        <div>
            <HashRouter>
                <Routes>
                <Route path="/black-jack" element={<Game />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                </Routes>
            </HashRouter>
        </div>
    )
}

export default Router