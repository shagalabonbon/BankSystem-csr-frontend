import React from "react";
import { useNavigate } from "react-router-dom";


const RecoveryResult = () => {

    const navigate = useNavigate();

    const backToIndex = (e) => {
        navigate("/bank/index");
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="text-center fs-1 pt-5 mb-3 ">
                        <img src="/images/correct.png" alt="logo" width="35" height="35" className="d-inline-block align-text-middle" />
                        新密碼設定成功，請使用更新資料登入
                    </div>

                    <div className="d-flex justify-content-center">
                        <img src="/images/unlocked.png" alt="unlocked" width="300" height="300" className="" />
                        
                    </div>

                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary btn-lg mt-3" onClick={backToIndex}>返回首頁</button>
                    </div>

                </div>
            </div>

        </>
    )
}

export default RecoveryResult;