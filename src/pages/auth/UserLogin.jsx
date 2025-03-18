import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";


const UserLogin = () => {

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({ idNumber: "", password: "" });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/bank/auth/userlogin", {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('jwt', result.data);  // 儲存 JWT 到 localStorage ( 類似 session ) 
                navigate("/bank/user/home");
            } else {
                navigate("/bank/error", { state: result })
            }
        } catch (error) {
            navigate("/bank/error", { state: { message:error.message , status:"Network Error" } })
        }

    }



    return (

        <>
            <div className="text-center fs-1 pt-5 mb-3 ">YC 網路銀行</div>

            <div className="container-fluid">

                <div className="row justify-content-center">

                    <div className="bg-light p-4 rounded col-md-4 p-5 ">
                        <form className="d-flex flex-column" onSubmit={handleSubmit}  >
                            <div className="mb-5">
                                <label htmlFor="idNumber" className="form-label col-form-label-lg">身分證字號</label>
                                <input type="text" name="idNumber" className="form-control form-control-lg" id="idNumber"
                                    aria-describedby="emailHelp" required onChange={handleChange} />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="password" className="form-label col-form-label-lg">密碼</label>
                                <input type="password" name="password" className="form-control form-control-lg" id="password" required onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg mt-5">登入</button>
                        </form>
                    </div>

                    <nav className="nav mt-3 justify-content-center">
                        <Link to="/bank/auth/register" className="nav-link " ><span className="text-dark fs-4"> 立即註冊 </span></Link>
                        <Link to="/bank/auth/recovery" className="nav-link " ><span className="text-dark fs-4"> 忘記密碼 </span></Link>
                    </nav>

                </div>

            </div>
        </>
    )
}

export default UserLogin;


