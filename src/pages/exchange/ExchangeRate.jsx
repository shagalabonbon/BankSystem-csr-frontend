import React, { useCallback, useEffect, useState } from "react";

const ExchangeRate = () => {

    const [exchangeRates, setExchangeRates] = useState([]);

    const [renewTime,setRenewTime] = useState("");

    useEffect(() => {

        fetchTwdAccountData(); // 立即獲取數據

        const intervalId = setInterval( () => { fetchTwdAccountData(); },300000);   // 每隔 5 分鐘刷新數據

        return () => { clearInterval(intervalId);};   // 清除計時器 ( 組件卸載時 )
        
    }, []);

    

    const fetchTwdAccountData = useCallback(async () => {    // useCallback 避免每次呼叫 fetchTwdAccountData 都重新創建計時器
        try {
            const response = await fetch('http://localhost:8080/bank/transaction/exchange-rate', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const result = await response.json();

            if (response.ok) {
                setExchangeRates(result.data);
                setRenewTime(result.data[0].renewTime);
            } else {
                console.error("API 回應錯誤:", result.message);
            }
        } catch (error) {
            console.error("獲取匯率數據失敗:", error);
        }
    },[]);

    return (
        <>  
            <div className="text-center fs-1 mt-5 mb-3 ">牌告匯率</div>

            <div className="container">

                {/* <!-- 公告 --> */}

                <div className="row my-3">
                    <div className="alert alert-warning " role="alert">
                        <div>請注意！</div>
                        <div>1. 本表資料僅供參考，不代表實際交易匯率。</div>
                        <div>2. 「網路銀行」之實際交易匯率，以交易時顯示之匯率為準。</div>
                        <div>3. 臨櫃實際交易匯率以交易時本行匯率為準。</div>
                        <div>4. 本網頁牌告匯率資訊為動態顯示，每隔 5 分鐘進行數據更新</div>
                    </div>
                </div>

                {/* <!-- 更新時間、按鈕 --> */}

                <div className="my-3 d-flex justify-content-between">

                    <div className="d-flex">
                        <div className="fs-5">最新掛牌時間：{renewTime}</div>
                    </div>

                </div>

                {/* <!-- 匯率表格 --> */}

                <div className="row mb-5">

                    <table className="table table-bordered table-striped text-center fs-5 table-hover">
                        <thead>
                            <tr>
                                <th rowSpan={2} className="align-middle">幣別</th>
                                <th colSpan={2}>現金匯率</th>
                                <th colSpan={2}>即期匯率</th>
                            </tr>

                            <tr>
                                <th>買入</th>
                                <th>賣出</th>
                                <th>買入</th>
                                <th>賣出</th>
                            </tr>
                        </thead>

                        <tbody>
                            {exchangeRates.map((exchangeRate) => (
                                <tr key={exchangeRate.currencyCode}>
                                    <td>{exchangeRate.currencyName}</td>
                                    <td>{exchangeRate.cashBuy}</td>
                                    <td>{exchangeRate.cashSell}</td>
                                    <td>{exchangeRate.spotBuy}</td>
                                    <td>{exchangeRate.spotSell}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

            </div>

        </>
    )

}

export default ExchangeRate;