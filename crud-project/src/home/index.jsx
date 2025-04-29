import { Routes, Route } from "react-router-dom";
import HomeView from "./home";

export default function UnicornRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomeView />} />
        </Routes>
    );
}
