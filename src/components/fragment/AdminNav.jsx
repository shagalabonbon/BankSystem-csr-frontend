import React from "react";

const AdminNav = () => {

    return (
        <>
            <nav className="navbar navbar-expand navbar-light bg-light">
                <div className="container navbar-nav justify-content-around px-5">

                    <div className="nav-item">
                        <a className="nav-link active d-flex align-items-center" href="/bank/admin/user-approval">
                            <img src="/images/admin-approve.png" style={{height:'20px'}} />
                            <span className="ms-2">待審核</span>
                        </a>
                    </div>
                    <div className="nav-item">
                        <a className="nav-link active d-flex align-items-center" href="/bank/admin/user-manage">
                            <img src="/images/admin-manage.png" style={{height:'20px'}} />
                            <span className="ms-2">管理用戶</span>
                        </a>
                    </div>
                    <div className="nav-item">
                        <a className="nav-link active d-flex align-items-center" href="/bank/admin/statistics">
                            <img src="/images/admin-statistic.png" style={{height:'20px'}}/>
                            <span className="ms-2">統計資料</span>
                        </a>
                    </div>
                </div>
            </nav>
        </>
    )

}

export default AdminNav;  