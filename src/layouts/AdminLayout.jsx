import { AdminHeader, AdminNav, HomeFooter } from "../components/fragment";
import React from "react";
import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const AdminLayout = () => {

    return (

        <div className="fs-5">
            <div className="sticky-top">
                <AdminHeader />
                <AdminNav />
            </div>

            <div>
                <Outlet />
            </div>

            <div>
                <HomeFooter />
            </div>
        </div>

    );
};

export default AdminLayout ;