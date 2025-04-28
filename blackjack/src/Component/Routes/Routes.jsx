import React from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router";
import Login from "../../Auth/connexion/Login";
import Register from "../../Auth/inscription/Register";
import Profil from "../../Auth/Profil/Profil";
import Game from "../../blackJack/Game";
import History from "../../blackJack/History";

 function Router(){
    return (
        <div>
            <HashRouter>
                <Routes>
                <Route path="/" element={<Game />} />
                <Route path="/profil" element={<History />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                </Routes>
            </HashRouter>
        </div>
    )
}


export default Router