import React from "react";
import { Link } from "react-router-dom";


const UserNav = () => {

    return (
        <>
            <nav className="navbar navbar-expand navbar-light bg-light fs-5">
                <div className="container-xl navbar-nav justify-content-around px-5">
                    <div className="nav-item">
                        <Link to="/bank/accounts" className="nav-link active d-flex align-items-center" >
                            <img src="/images/account.png" style={{height:'20px'}} />
                            <span className="ms-2">我的帳戶</span>
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/bank/transaction/transfer" className="nav-link active d-flex align-items-center" >
                            <img src="/images/transfer.png" style={{height:'20px'}} />
                            <span className="ms-2">轉帳</span>
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/bank/transaction/exchange" className="nav-link active d-flex align-items-center" >
                            <img src="/images/exchange1.png" style={{height:'20px'}} />
                            <span className="ms-2">外匯</span>
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/bank/user/update" className="nav-link active d-flex align-items-center" >
                            <img src="/images/update-user.png" style={{height:'20px'}} />
                            <span className="ms-2">資料變更</span>
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/bank/transaction/exchange-rate" className="nav-link active d-flex align-items-center" >
                            <img src="/images/chart.png" style={{height:'20px'}} />
                            <span className="ms-2">牌告匯率</span>
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/bank/accounts/foreigns" className="nav-link active d-flex align-items-center" >
                            <img src="/images/foreign-account.png" style={{height:'20px'}} />
                            <span className="ms-2">外幣帳號申請</span>
                        </Link>
                    </div>
                </div>
            </nav >
        </>
    )
}

export default UserNav ;
