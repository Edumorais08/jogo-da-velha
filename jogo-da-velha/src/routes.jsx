import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import OnePlayer from "./pages/Oneplayer/Oneplayer";
import TwoPlayers from "./pages/TwoPlayers/TwoPlayers";
import Jogo from "./pages/Jogo/Jogo"

function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/OnePlayer" element={<OnePlayer />}/>
                <Route path="/TwoPlayers" element={<TwoPlayers />}/>
                <Route path="/Jogo" element={<Jogo />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
