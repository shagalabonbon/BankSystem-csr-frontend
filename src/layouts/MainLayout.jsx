import { Outlet } from 'react-router-dom';
import { HomeHeader, HomeFooter } from '../components/fragment';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const MainLayout = () => {

    return (


        <div className="fs-5">

            <div className="sticky-top">
                <HomeHeader />
            </div>

            <div>
                <Outlet />    {/* 顯示子路由連接的頁面 */}
            </div>

            <div>
                <HomeFooter />
            </div>

        </div>

    );

};

export default MainLayout;
