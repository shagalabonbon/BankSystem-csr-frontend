import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const IndexPage = () => {

    const navigate = useNavigate();

    const [exchangeRates, setExchangeRates] = useState([]);

    const imageData = {
        USD: "/images/USA.png",
        EUR: "/images/EU.png",
        JPY: "/images/JP.png",
        CNY: "/images/CN.png"
    }

    const fetchExchangeRateData = async (token) => {

        try {
            const response = await fetch('http://localhost:8080/bank/transaction/exchange-rate', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (response.ok) {
                setExchangeRates(result.data);
            } else {
                navigate("/bank/error", { state: result });
            }
        } catch (error) {
            navigate("/bank/error", { state: { message: error.message, status: "Network Error" } })
        }
    }

    useEffect(() => {

        const token = localStorage.getItem('jwt');
        const decodeToken = jwtDecode(token);

        if (decodeToken) {
            fetchExchangeRateData(token);
        } else {
            alert("請重新登入");
            navigate("/bank/auth/userlogin");
        }

    }, []);

    return (

        <>
            {/* <!-- 廣告 --> */}
            <div className="container mb-5">

                <div className="row justify-content-center">

                    <div className="col-12">

                        <div className="my-5 d-none d-lg-flex" >
                            <img src="/images/index-logo.png" className="img-fluid my-5" />
                        </div>

                        <div className="d-flex justify-content-between my-5 ">
                            <div className="w-50 me-5 bg-light p-4 rounded">
                                <div id="carouselExampleControls" className="carousel slide "
                                    data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img src="/images/ESG.jpg" className="d-block w-100 rounded" alt="..." />
                                            <div className="pt-3 fs-3 fw-bolder">
                                                <span>ESG 驅動的未來：永續發展的企業新標準</span>
                                            </div>
                                        </div>
                                        <div className="carousel-item">
                                            <img src="/images/piggybank.jpg" className="d-block w-100 rounded" alt="..." />
                                            <div className="pt-3 fs-3 fw-bolder" />
                                            <div className="pt-3 fs-3 fw-bolder">
                                                <span>每一筆儲蓄，都是對未來自己的投資</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/images/team.jpg" className="d-block w-100 rounded" alt="..." />
                                        <div className="pt-3 fs-3 fw-bolder">
                                            <span>尊重與支持，成就每一位員工的職場旅程</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button"
                                    data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>

                            <div className="w-50 bg-light p-4 rounded ">
                                <div className="bg-white">
                                    <table className="table table-transparent">
                                        <tbody>
                                            <tr>
                                                <th>最新消息 </th>
                                            </tr>
                                            <tr>
                                                <td>重要通知：為了提供您更穩定和高效的服務，本行將於 YYY 年 MM 月 DD 日 00:00 至 06:00 進行系統升級維護 </td>
                                            </tr>
                                            <tr>
                                                <td>親愛的客戶您好:本行全新推出「XX 儲蓄計畫」/「XX 信用卡」，為您的財務規劃提供更多選擇！</td>
                                            </tr>
                                            <tr>
                                                <td>靈活貸款方案:額度高，利率優惠。即日起至 YYYY 年 MM 月 DD 日申辦，更享早鳥專屬禮遇！詳情請洽分行或官網查詢。</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

<div className="bg-light mb-5 p-3 rounded">

                        <h1 className="bg-white rounded text-center p-3 m-3 border">即時匯率</h1>

                        <div className="row justify-content-around">

                            {exchangeRates
                                .filter(exchangeRate => imageData[exchangeRate.currencyCode])
                                .map((exchangeRate) => (

                                    <div className="card p-3 m-3" style={{ width: '18rem' }} key={exchangeRate.currencyCode}>
                                        <img src={imageData[exchangeRate.currencyCode]} className="card-img-top" alt={exchangeRate.currencyCode} />
                                        <div className="card-body" data-currency="USD">
                                            <p className="card-text fs-4">
                                                買入：<span>{exchangeRate.spotBuy}</span>
                                            </p>
                                            <p className="card-text fs-4">
                                                賣出：<span>{exchangeRate.spotSell}</span>
                                            </p>
                                        </div>
                                    </div>
                                )
                                )}

                        </div>

                    </div>

                    
                    </div>

                </div>
            </div >

        </>
    )
}

export default IndexPage;
