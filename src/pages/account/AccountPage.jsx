import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {

    const navigate = useNavigate();

    const jwtToken = localStorage.getItem('jwt');
    
    const [accounts, setAccounts] = useState([]);

    const VerifyJwt = (token) => {
    
        if (!token) {
            return null;
        }
    
        try {
            const decodeToken = jwtDecode(token);
            if (!decodeToken.exp || decodeToken.exp < Date.now() / 1000) {
                return null;
            }
            return decodeToken; // 驗證成功返回解碼的 Token 
    
        } catch (error) {
            console.error("JWT 解析錯誤:", error);
            return null;
        }
    
    }

    const fetchAccounts = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8080/bank/accounts?userId=${userId}`, {
                method: "get",
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    "Content-Type": "application/json"
                }
                // GET 請求不需要 Body
            })

            if (response.ok) {
                const result = await response.json();
                setAccounts(result.data);
            } else {
                // 將錯誤 response 傳遞至 error page
 //             navigate("/bank/error");
                return;
            }
        } catch (error) {

        }
    }


    useEffect(() => {

        const decodeToken = VerifyJwt(jwtToken);

        fetchAccounts(decodeToken.sub);

    }, [jwtToken])

    // 

    const handleOnclick = async (event,accountId) => {

        event.preventDefault();

        navigate("/bank/accounts/histories", { state: accountId })

    }


    return (
        <>
            <div className="text-center fs-1 mt-5 mb-3 ">帳號總覽</div>

            <div className="container d-flex">
                {accounts.map((account) => ( 
                    <div className="card m-3" key={account.id} style={{ width: '18rem' }} >
                        <div className="card-body">
                            <h5 className="card-title fw-bold" >
                                <span>{account.currency.name}</span>帳戶
                            </h5>
                            <div className="my-3">
                                帳號：<span className="" >{account.accountNumber}</span>
                            </div>
                            <div className="mb-3">
                                存款：<span className="">{account.balance}</span>
                            </div>
                            <div className="mb-3">
                                幣別：<span className="" > {account.currency.name} ( {account.currency.code} )</span>
                            </div>
                            <button className="btn btn-warning border border-dark" onClick={(e)=>handleOnclick(e,account.id)}>查詢交易紀錄</button>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )

}

export default AccountPage;
