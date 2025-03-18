import React from "react";
import { Link } from "react-router-dom";


const HomeHeader = () => {

    return (
        <>
            <nav className="navbar navbar-light p-3 bg-white justify-content-between">
                <div className="container-fluid ">

                    {/* Logo */}

                    <a href="/bank/index" className="navbar-brand" >
                        <img src="/images/logo-horizontal.png" alt="logo" width="110" height="30" className="d-inline-block align-text-middle rounded" />
                    </a>

                    {/* 後臺、登入按鈕 */}

                    <div className="nav align-items-center">
                        <div className="nav-item">
                            <Link to="/bank/auth/adminlogin" className="nav-link active" aria-current="page" ><span className="text-muted">後台登入</span></Link>
                        </div>

                        <div className="nav-item mx-3">
                            <Link to="/bank/auth/userlogin" className="btn btn-outline-success btn-lg ">登入</Link>
                        </div>
                    </div>

                </div>
            </nav>
        </>
    )

}

export default HomeHeader;