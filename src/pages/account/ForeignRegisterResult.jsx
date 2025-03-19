import React from "react";

const ForeignRegisterResult = () => {

    return (
        <>
            <div className="text-center fs-1 mt-5 mb-3 ">申請成功</div>
            {/* <!-- 用 th:if 改寫 交易成功/失敗 --> */}

            <div className="container">
                <div className="row justify-content-center">
                    <div className="bg-light p-4 rounded col-md-4 p-5 ">

                        <table className="table border bg-transparent">
                            <tr>
                                <td>使用者</td>
                                <td>"newForeignAccount.getUser.getUsername"</td>
                            </tr>
                            <tr>
                                <td>新建帳號</td>
                                <td> "newForeignAccount.getAccountNumber"</td>
                            </tr>
                            <tr>
                                <td>幣別</td>
                                <td>
                                    "$newForeignAccount.getCurrency.getName + ' (' + newForeignAccount.getCurrency.getCode + ')'"</td>
                            </tr>
                            <tr>
                                <td>創建時間</td>
                                <td> "newForeignAccount.getCreateTime"</td>
                            </tr>

                        </table>

                        <div className="d-flex justify-content-center">
                            <form action="@{/bank/account/foreign-account}" method="get">
                                <button type="submit" className="btn btn-lg mt-5 btn-success" >返回首頁</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )

}

export default ForeignRegisterResult;