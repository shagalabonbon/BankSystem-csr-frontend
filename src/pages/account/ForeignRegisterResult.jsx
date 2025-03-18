
const ForeignRegisterResult = () => {

    return (
        <>
            <div class="text-center fs-1 mt-5 mb-3 ">申請成功</div>
            {/* <!-- 用 th:if 改寫 交易成功/失敗 --> */}

            <div class="container">
                <div class="row justify-content-center">
                    <div class="bg-light p-4 rounded col-md-4 p-5 ">

                        <table class="table border bg-transparent">
                            <tr>
                                <td>使用者</td>
                                <td th:text="${newForeignAccount.getUser.getUsername}"></td>
                            </tr>
                            <tr>
                                <td>新建帳號</td>
                                <td th:text="${newForeignAccount.getAccountNumber}"></td>
                            </tr>
                            <tr>
                                <td>幣別</td>
                                <td
                                    th:text="${newForeignAccount.getCurrency.getName} + ' (' + ${newForeignAccount.getCurrency.getCode} + ')'"></td>
                            </tr>
                            <tr>
                                <td>創建時間</td>
                                <td th:text="${newForeignAccount.getCreateTime}"></td>
                            </tr>

                        </table>

                        <div class="d-flex justify-content-center">
                            <form th:action="@{/bank/account/foreign-account}" method="get">
                                <button type="submit" class="btn btn-lg mt-5 btn-success" >返回首頁</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )

}

export default ForeignRegisterResult;