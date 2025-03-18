import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const AdminLogin = () => {

    const [ formData , setFormData ] = useState({ idNumber:"",password:"" });

    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    };

    const handleSubmit = async(event) => {

        event.preventDefault();

        const response = await fetch( "http://localhost:8080/bank/auth/adminlogin",{ 
            method:'post',
            headers: { 'Content-Type':'application/json' }, 
            body: JSON.stringify(formData)
        })

        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('jwt', result.data);  // 儲存 JWT 到 localStorage ( 類似 session ) 
            navigate("/bank/admin/home");
        } else {
            console.error('No JWT received');
        }
    }

    return (

        <>
            <div className="text-center fs-1 pt-5 mb-3 ">管理員登入</div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="bg-light p-4 rounded col-md-4 p-5 ">

                        <form className="d-flex flex-column" onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label htmlFor="idNumber" className="form-label col-form-label-lg">管理員帳號</label>
                                <input type="text" name="idNumber"
                                    className="form-control form-control-lg" id="idNumber"
                                    aria-describedby="emailHelp" required onChange={handleChange} />
                            </div>
                            
                            <div className="mb-5">
                                <label htmlFor="password" className="form-label col-form-label-lg">密碼</label>
                                <input type="password" name="password" className="form-control form-control-lg" id="password" required onChange={handleChange}/>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg mt-5">登入</button>
                        </form>

                    </div>
                </div>

                <nav className="nav mt-3 justify-content-center">
                    <Link to="/bank/auth/userlogin" className="nav-link " ><span className="text-dark fs-4"> 一般登入 </span></Link>
                </nav>

            </div>

        </>
    )
}

export default AdminLogin;


