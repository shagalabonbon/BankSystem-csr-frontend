import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerifyJwt } from "../../utils";


const TransferPage = () => {

    const navigate = useNavigate();

    const [twdAccounts, setTwdAccounts] = useState([]);

    const [formData, setFormData] = useState({
        fromAccountNumber: "",
        toAccountNumber: "",
        amount: "",
        description: ""
    });

    // 資料請求
    
    const fetchTwdAccountData = async (token,userId) => {
        try {
            const response = await fetch(`http://localhost:8080/bank/transaction/transfer?id=${userId}`, {
                method: 'get',
                headers: { 
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            });
            
            const result = await response.json();
            
            if (response.ok) {
                setTwdAccounts(result.data);
                setFormData({
                    ...formData,
                    fromAccountNumber: result.data[0].accountNumber // 預設選擇第一個帳號
                });
            } else {
                navigate("/bank/error", { state: result });
            }
        } catch (error) {
            navigate("/bank/error", { state: { message: error.message, status: "Network Error" } })
        }
    }

    // 組件

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        navigate("/bank/transaction/transfer/check", { state: formData });  // 將表單資料傳遞到 check page
    }
    
    // 加載頁面

    useEffect(() => {
        
        const token = localStorage.getItem('jwt');
        const decodeToken = VerifyJwt(token);

        if(decodeToken){
            fetchTwdAccountData(token,decodeToken.sub);
        }else{
            alert("請重新登入");
            navigate("/bank/auth/userlogin");
        }
    }, [])


    return (
        <>
            <div className="text-center fs-1 mt-5 mb-3 ">臺幣轉帳</div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="bg-light p-4 rounded col-md-4 p-5 ">
                        <form className="d-flex flex-column" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label col-form-label-lg" htmlFor="fromAccountNumber">轉出帳號</label>
                                <select className="form-select form-control-lg " id="fromAccountNumber" onChange={handleChange} >
                                    {twdAccounts.map((twdAccount) => (
                                        <option key={twdAccount.id} value={twdAccount.accountNumber}>
                                            {twdAccount.currency.name}帳號 ( {twdAccount.accountNumber} )
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="toAccountNumber" className="form-label col-form-label-lg">轉入帳號</label>
                                <input type="text" className="form-control form-control-lg" id="toAccountNumber" name="toAccountNumber" required onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="amount" className="form-label col-form-label-lg">轉帳金額</label>
                                <input type="text" className="form-control form-control-lg" name="amount" required onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label col-form-label-lg">轉帳備註</label>
                                <input type="text" className="form-control form-control-lg" id="description" name="description" required onChange={handleChange} />
                            </div>

                            <button type="submit" className="btn btn-lg mt-5 btn-success">進行轉帳</button>

                        </form>
                    </div>
                </div>

            </div>

        </>
    )

}

export default TransferPage;