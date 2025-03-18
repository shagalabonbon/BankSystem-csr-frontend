import React, { useEffect, useState } from "react";

const Approval = () => {

    const [pendingUsers, setPendingUsers] = useState( [] );

    // 初次渲染未審核用戶

    useEffect(() => {

        const fetchData = async () => {

            const response = await fetch('http://localhost:8080/bank/admin/user-approval', {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });

            const result = await response.json();

            if (response.ok) {
                setPendingUsers(result.data);
            } else {
                console.error(`錯誤碼： ${response.status} 訊息： ${result.message}`)
            }

            console.log(result);
        }

        fetchData(); // 執行 fetchData

        }, [])


    const handleAgreement = async(event,userId) => {
        
        event.preventDefault();

        const response = await fetch( `http://localhost:8080/bank/admin/user-approval/approve/${userId}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        });
        
        const result = await response.json();

        if(response.ok){
            alert(result.data);
            setPendingUsers( (prevUsers) => prevUsers.filter( (user) => user.id !== userId ) );    // 過濾已審核的用戶
        }else {
            console.error(`錯誤碼： ${response.status} 訊息： ${result.message}`)
        }
    }

    const handleDecline = async(event,userId) => {
        
        event.preventDefault();

        const response = await fetch( `http://localhost:8080/bank/admin/user-approval/reject/${userId}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();

        if(response.ok){
            alert(result.data);
            setPendingUsers( (prevUsers) => prevUsers.filter( (user) => user.id !== userId ) );    // 過濾已審核的用戶
        }else {
                console.error(`錯誤碼： ${response.status} 訊息： ${result.message}`)
            }
    }

    return (
        <>
            <div className="container">

                <h1 className="text-center my-4">待審核用戶</h1>

                <table className="table">

                    <thead>
                        <tr>
                            <th>編號</th>
                            <th>姓名</th>
                            <th>性別</th>
                            <th>郵件</th>
                            <th>電話</th>
                            <th>權限</th>
                            <th>審核</th>
                        </tr>
                    </thead>

                    <tbody>

                    {pendingUsers.length > 0 ? (pendingUsers.map((pendingUser) => (
                        <tr key={pendingUser.id}>
                            <td>{pendingUser.id}</td>
                            <td>{pendingUser.username}</td>
                            <td>{pendingUser.gender}</td>
                            <td>{pendingUser.email}</td>
                            <td>{pendingUser.phone}</td>
                            <td>{pendingUser.role}</td>
                            <td>
                                <button className="btn btn-success" onClick={(e) => handleAgreement(e,pendingUser.id)}>通過</button>    {/* 當按鈕被點擊時 (e)，執行 handleAgreement(e, pendingUser.id)，並將該用戶的 ID 傳遞進去 */}
                                <button className="btn btn-danger"  onClick={(e) => handleDecline(e,pendingUser.id)}>不通過</button>
                            </td>
                        </tr>
                    ))) : ( 

                        <tr>
                            <td colSpan={7} className="text-center">
                                暫無待審核用戶
                            </td>
                        </tr>
                    )}

                    </tbody>

                </table>
            </div>

        </>
    )

}

export default Approval;
