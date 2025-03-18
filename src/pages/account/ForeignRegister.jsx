import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerifyJwt } from "../../utils";

const ForeignRegister = () => {

    const navigate = useNavigate();

    const [unregisterCurrencies, setUnregisterCurrencies] = useState([]);

    const [formData, setFormData] = useState({
        currency: { code: "" },
        userDto: { id: "" }
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            currency: { code: event.target.value }
        })
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        const token =localStorage.getItem('jwt');

        try {
            const response = await fetch('http://localhost:8080/bank/accounts/foreigns', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
            } else {
                navigate("/bank/error", { state: result }); // 將回應帶到錯誤頁面
            }
        } catch (error) {
            navigate("/bank/error", { state: { message: error.message || "Unknown error", status: "Network error" } });
        }

    }

    useEffect(() => {

        // 驗證 jwt
        const token = localStorage.getItem('jwt');
        const decodeToken = VerifyJwt(token);
        // 設定 userId
        if (decodeToken) {
            
            fetchData( token,decodeToken.sub);
            setFormData({
                ...formData,
                userDto: { id: decodeToken.sub },
            });
        } else {
            alert("請重新登入");
            navigate("/bank/auth/userlogin");
        }

    }, [])

    // 獲取未註冊貨幣

    const fetchData = async (token,userId) => {

        try {
            const response = await fetch(`http://localhost:8080/bank/accounts/foreigns?id=${userId}`, {
                method: 'get',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token} `
                }
            });

            const result = await response.json();

            if (response.ok) {
                setUnregisterCurrencies(result.data);
            } else {
                navigate("/bank/error", { state: result });
            }
        } catch (error) {
            navigate("/bank/error", { state: { message: error.message, status: "Network Error" } })
        }
    }

    return (
        <>
            <div className="text-center fs-1 mt-5 mb-3 ">外幣帳號申請</div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="bg-light p-4 rounded col-md-4 p-5 ">
                        <form className="d-flex flex-column" onSubmit={handleSubmit}>

                            <select className="form-select-lg" name="code" onChange={handleChange} defaultValue="">
                                <option value="" disabled>請選擇</option>
                                {unregisterCurrencies.map((unregisterCurrency) => (
                                    <option key={unregisterCurrency.code} value={unregisterCurrency.code}>
                                        {unregisterCurrency.name} ( {unregisterCurrency.code} )
                                    </option>
                                ))}
                            </select>

                            <button type="submit" className="btn btn-success btn-lg mt-5">申請帳號</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )

}

export default ForeignRegister;
