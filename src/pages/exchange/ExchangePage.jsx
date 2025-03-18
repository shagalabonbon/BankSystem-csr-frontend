import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExchangePage = () => {

    const navigate = useNavigate();

    const [ twdAccounts , setTwdAccounts ] = useState ([]);
    const [ foreignAccounts , setForeignAccounts ] = useState ([]);
    const [ foreignExchangeRates , setForeignExchangeRates ] = useState ([]);
    const [ targetRate , setTargetRate ] = useState ("");

    const [ formData , setFormData ] = useState ( {
        fromAccountNumber:"",
        toAccountNumber:"",
        amount:"",
        exchangeRate:"",
        currencyCode:"",
        description:""
    });

    // 填入表單資料
    const handleChange = (event) => {                        
        setFormData({ 
            ...formData,                                     
            [event.target.name] : event.target.value        
        })
    }

    // 動態更新匯率
    const changeRate = (event) => {
        const currencyCode   = event.target.value;
        const foreignAccount = foreignAccounts.find(account=> account.currency.code === currencyCode )
        const exchangeRate   = foreignExchangeRates.find( rate => rate.currencyCode === currencyCode );

        console.log(foreignAccount);
        if(exchangeRate){
            setTargetRate(exchangeRate.spotSell);
            setFormData({ 
                ...formData,
                exchangeRate:exchangeRate.spotSell,
                toAccountNumber: foreignAccount.accountNumber
            })
        } 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        navigate("/bank/transaction/exchange/check", { state: formData } )
    }

    const fetchExchangePageData = async(token,userId) => {
        try{
            const response = await fetch ( `http://localhost:8080/bank/transaction/exchange?id=${userId}` , {
            method: 'get',
            headers:{ 
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}` 
            }});
    
            const result = await response.json(); 
            
            if(response.ok){
                setTwdAccounts(result.data.twdAccountDtos);
                setForeignAccounts(result.data.foreignAccountDtos);
                setForeignExchangeRates(result.data.exchangeRates);

                setFormData({
                    ...formData,
                    fromAccountNumber: result.data.twdAccountDtos[0].accountNumber // 預設選擇第一個帳號
                });

            }else{
                navigate("/bank/error", { state: result })
            } 
        }catch(error){
            navigate("/bank/error", { state: { message:error.message , status:"Network Error" } })
        }
    }


    useEffect ( ()=>{
        const token = localStorage.getItem("jwt");
        const decodeToken = jwtDecode(token);

        if(decodeToken){
            fetchExchangePageData(token,decodeToken.sub);
        }else{
            alert("請重新登入");
            navigate("/bank/auth/userlogin");
        }

    },[])


    return (
        <>
            <div className="text-center fs-1 mt-5 mb-3 ">換匯</div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="bg-light rounded col-md-6 p-5">

                        <form onSubmit={handleSubmit}>

                            <div className="d-flex justify-content-around align-items-center mb-4">
                                <div>
                                    <div className="mb-3">
                                        <label className="form-label col-form-label-lg" htmlFor="fromAccountNumber">換匯帳號</label>
                                        <select className="form-select form-control-lg" name="fromAccountNumber" onChange={handleChange} >  
                                            {twdAccounts.map((twdAccount) => (
                                                <option key={twdAccount.id} value={twdAccount.accountNumber}>
                                                    {twdAccount.currency.name}帳號( {twdAccount.accountNumber} )
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label col-form-label-lg" htmlFor="amount">金額</label>
                                        <input type="number" className="form-control form-control-lg" name="amount" min="1" required onChange={handleChange} />
                                        {/* <!-- min 前端驗證金額 --> */}
                                    </div>
                                </div>

                                <div className="mx-4">
                                    <img src="/images/exchange-alt.png" width="35" height="35" />
                                </div>

                                <div>

                                    {/* <!-- 選擇貨幣 --> */}

                                    <div className="mb-3">
                                        <label className="form-label col-form-label-lg" htmlFor="targetCurrency">選擇幣別</label>
                                        <select className="form-select form-control-lg" name="currencyCode" onChange={changeRate} required defaultValue="">
                                            <option value="" disabled >請選擇</option>
                                            {foreignExchangeRates.map((foreignExchangeRate) => (
                                                <option key={foreignExchangeRate.currencyCode} value={foreignExchangeRate.currencyCode}>
                                                    {foreignExchangeRate.currencyName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* <!-- 顯示匯率  --> */}

                                    <div className="mb-3">
                                        <label className="form-label col-form-label-lg" >當前匯率</label>
                                        <input type="number" className="form-control form-control-lg" name="exchangeRate" value={targetRate} readOnly/>
                                    </div>

                                </div>
                            </div>

                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-success btn-lg">開始換匯</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>

        </>
    )

}



export default ExchangePage;