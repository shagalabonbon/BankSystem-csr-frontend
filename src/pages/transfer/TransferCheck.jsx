import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VerifyJwt } from "../../utils";

const TransferCheck = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fromAccountNumber: "",
        toAccountNumber: "",
        amount: "",
        description: ""
    });

    const handleSubmit = async (event) => {

        event.preventDefault();

        const token = localStorage.getItem("jwt"); 

        try {
            const response = await fetch('http://localhost:8080/bank/transaction/transfer', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                navigate("/bank/transaction/transfer/result" , { state: formData });  // 改成後端回應資料
            } else {
                navigate("/bank/error", { state: result });
            }
        } catch (error) {
            navigate("/bank/error", { state: { message: error.message, status: "Network Error" } });
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        alert("交易取消");
        navigate("/bank/transaction/transfer");
    }

    useEffect(() => {

        const token = localStorage.getItem('jwt');
        const decodeToken = VerifyJwt(token);

        if(decodeToken){
            setFormData(location.state);
        }else{
            alert("請重新登入");
            navigate("/bank/auth/userlogin");
        }

    }, [])

    return (
        <>
            <div className="text-center fs-1 mt-5 mb-3 ">轉帳明細</div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="bg-light p-4 rounded col-md-4 p-5 ">

                        <table className="table border">
                            <thead>
                                <tr>
                                    <th scope="col" colSpan={2}>項目明細</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">轉出帳號</th>
                                    <td><span>{formData.fromAccountNumber}</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">轉入帳號</th>
                                    <td><span>{formData.toAccountNumber}</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">轉帳金額</th>
                                    <td><span>{formData.amount}</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">轉帳備註</th>
                                    <td><span>{formData.description}</span></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="d-flex justify-content-around">

                            <form onSubmit={handleSubmit}>
                                <button type="submit" className="btn btn-lg btn-success mt-5" >確認轉帳</button>
                            </form>

                            
                            <button className="btn btn-lg mt-5 btn-danger" onClick={handleCancel}>取消交易</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default TransferCheck;