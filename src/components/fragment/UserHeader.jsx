import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const UserHeader = () => {

    const navigate = useNavigate();

    const [ username , setUsername ] = useState();

    const handleLogout = async (event) => {

        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/bank/auth/logout', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const result = await response.json();

            if (response.ok) {
                localStorage.removeItem('jwt');  // 清除 localStorage
                navigate("/bank/index");         // 導回首頁
            } else {
                navigate("/bank/error", { state: result })
            }
        } catch (error) {
            navigate("/bank/error", { state: { message: error.message, status: "Network Error" } })
        }
    };

    const fetchUserData = async(token,userId) => {
        try{
            const response = await fetch ( `http://localhost:8080/bank/user/${userId}` , {
            method: 'get',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`    
            }});
    
            const result = await response.json(); 
            
            if(response.ok){
                setUsername(result.data.username);            
            }else{
                navigate("/bank/error", { state: result })
            } 
        }catch(error){
            navigate("/bank/error", { state: { message:error.message , status:"Network Error" } })
        }
    }

    useEffect( () => {
        const token = localStorage.getItem('jwt');
        const decodeToken = jwtDecode(token);

        if(decodeToken){
            fetchUserData(token,decodeToken.sub);
        }else{
            alert("請重新登入");
            navigate('/bank/auth/userlogin');
        }

    } , [])



    return (
        <>
            <nav className="navbar navbar-light bg-white p-3 ">
                <div className="container-fluid">

                    {/* <!-- Logo --> */}
                    <a className="navbar-brand" href="/bank/index"> <img
                        src="/images/logo-horizontal.png" alt="logo" width="110"
                        height="30" className="d-inline-block align-text-middle rounded" />
                    </a>

                    <div className="d-flex">

                        <div className="d-flex border border-secondary bg-light rounded-pill mx-3 px-3 align-items-center">
                            {<div><span className="">{username}</span></div>}
                        </div>

                        <div>
                            {/* <!-- 收合按鈕 --> */}
                            <button className="navbar-toggler" type="button"
                                data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                                aria-controls="offcanvasNavbar">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            {/* <!-- offcanvas --> */}
                            <div className="offcanvas offcanvas-end" tabIndex={-1}
                                id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                                <div className="offcanvas-header">
                                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">功能</h5>
                                    <button type="button" className="btn-close text-reset"
                                        data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>

                                {/* <!-- 功能變更，修改這邊就行 --> */}
                                <div className="offcanvas-body">
                                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                        <li className="nav-item"><Link to="/bank/index" className="nav-link active" aria-current="page" >首頁</Link></li>
                                        <li className="nav-item"><Link to="/bank/transaction/transfer" className="nav-link" >台幣轉帳</Link></li>
                                        <li className="nav-item"><Link to="/bank/transaction/exchange" className="nav-link" >外幣兌換</Link></li>
                                        <li className="nav-item"><Link to="/bank/transaction/exchange-rate" className="nav-link" >牌告匯率</Link></li>
                                        <li className="nav-item"><Link to="/bank/accounts" className="nav-link" >帳號資訊</Link></li>
                                        <li className="nav-item"><Link to="/bank/user/update" className="nav-link" >資料變更</Link></li>
                                        <li className="nav-item"><Link to="/bank/accounts/foreigns" className="nav-link" >外幣帳號申請</Link></li>
                                    </ul>

                                    <button onClick={handleLogout} className="btn btn-danger">登出</button>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </nav>
        </>
    )

}

export default UserHeader;