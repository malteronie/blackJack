import React from "react";
import {Routes, Route, HashRouter } from "react-router";
import Login from "../../Auth/connexion/Login";
import Register from "../../Auth/inscription/Register";
import Game from "../../blackJack/Game";
import History from "../../blackJack/History";
import UserList from "../../Auth/Profil/UserList";

function Router(){
    return (
        <div>
            <HashRouter>
                <Routes>
                <Route path="/" element={<Game />} />
                <Route path="/profil" element={<History />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/users" element={<UserList />} />
                </Routes>
            </HashRouter>
        </div>
    )
}


export default Router