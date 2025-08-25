import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
// import { PrivateRoute } from "./private_route";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Campus } from "../pages/campus";
import { Cursos } from "../pages/cursos";
import { Equipes } from "../pages/equipes";
import { Esportes } from "../pages/esportes";
import { Eventos } from "../pages/eventos";
import { Grupos } from "../pages/grupo";
import { Jogos } from "../pages/jogos";
import { Usuarios } from "../pages/usuarios";
import { Evento } from "../pages/eventos/[id]";

export const Routes: React.FC = () => (
    <Switch>
        {/* //<Route element={<PrivateRoute />}> */}
        <Route path="/" element={<Home />} />
        <Route path="/campus" element={<Campus />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/equipes" element={<Equipes />} />
        <Route path="/esportes" element={<Esportes />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/eventos/:id" element={<Evento />} />
        <Route path="/grupos" element={<Grupos />} />
        <Route path="/jogos" element={<Jogos />} />
        <Route path="/usuarios" element={<Usuarios />} />

        {/* //</Route> */}
        <Route path="/login" element={<Login />} />
        {/* //<Route path="*" element={<Navigate to="/login" />} /> */}
    </Switch>
);