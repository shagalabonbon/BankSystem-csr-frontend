import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VerifyJwt } from "../../utils";

const ExchangeResult = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
            fromAccountNumber: "",
            toAccountNumber: "",
            amount: "",
            exchangeRate: "",
            currencyCode: "",
            description: ""
        });

    useEffect ( ()=>{

        const token = localStorage.getItem('jwt');
        const decodeToken = VerifyJwt(token);

        if(decodeToken){
            setFormData(location.state);
        }else{
            alert("請重新登入");
            navigate("/bank/auth/userlogin");
        }

    },[])

    const backToExchangePage = (e) => {
        e.preventDefault();
        navigate("/bank/transaction/exchange");
    }

    return (
        <>
            <div className="text-center fs-1 mt-5 mb-3 ">交易結果</div>  
            {/* <!-- 用 th:if 改寫 交易成功/失敗 --> */}

            <div className="container">
                <div className="row justify-content-center ">
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
                                    <th scope="row">換匯金額</th>
                                    <td><span>{formData.amount}</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">交易匯率</th>
                                    <td><span>{formData.exchangeRate}</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">外幣金額</th>
                                    <td><span>{(parseFloat(formData.amount)/parseFloat(formData.exchangeRate)).toFixed(0)}</span></td>
                                </tr>
                                <tr>
                                    <th scope="row">換匯備註</th>
                                    <td><span>{formData.description}</span></td>
                                </tr>
                            </tbody>
                        </table>

                        <button className="btn btn-lg mt-5 btn-success" onClick={backToExchangePage}>返回首頁</button>

                    </div>
                </div>
            </div>

        </>
    )

}

export default ExchangeResult;