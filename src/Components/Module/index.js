import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./Sidebar/sidebar";

const WebPage = () => {
    return (
        <div className="app-shell">
            <SideBar />
            <main className="app-shell__main">
                <Routes>
                    <Route path="/" element={<Navigate to="/employees" replace />} />
                    <Route path="/employees" element={<h1>Employees List</h1>} />
                    <Route path="/guard-shifts" element={<h1>Guard Shifts</h1>} />
                </Routes>
            </main>
        </div>
    );
};

export default WebPage;