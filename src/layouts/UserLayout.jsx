import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { HomeFooter, UserHeader, UserNav } from '../components/fragment';

import React from 'react';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {


    return (

        <div className="fs-5">

            <div className="sticky-top">
                <UserHeader />
                <UserNav/>
            </div>

            <div>
                <Outlet />    {/* 顯示子路由連接的頁面 */}
            </div>

            <div>
                <HomeFooter />
            </div>

        </div>
    )
}

export default UserLayout;