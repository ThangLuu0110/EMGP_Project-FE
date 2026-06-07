import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./Sidebar/sidebar";
import EmployeesListPage from "./Body/employeesListPage";

const WebPage = () => {
    return (
        <div className="app-shell">
            <SideBar />
            <main className="app-shell__main">
                <Routes>
                    <Route path="/" element={<Navigate to="/employees" replace />} />
                    <Route path="/employees" element={<EmployeesListPage/>} />
                    <Route path="/guard-shifts" element={<h1>Guard Shifts</h1>} />
                </Routes>
            </main>
        </div>
    );
};

export default WebPage;