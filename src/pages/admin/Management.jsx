import React, { useEffect, useState } from "react";

const Management = () => {

    const [users, setUsers] = useState([]);

    const [idNumber, setIdNumber] = useState("");

    const [errorMessage,setErrorMessage] = useState("");

    useEffect( () => { 
        fetchAllUsers(); 
    }, []); 


    // 加載所有用戶資料
    const fetchAllUsers = async () => {
        const response = await fetch('http://localhost:8080/bank/admin/user-manage', {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();

        if (response.ok) {
            setUsers(result.data);
        } else {
            console.error(`錯誤碼： ${response.status} 訊息： ${result.message}`);
        }
    }

    // 查詢單一用戶資料
    const fetchUserByIdNumber = async (idNumber) => {
        const response = await fetch(`http://localhost:8080/bank/admin/user-manage?idNumber=${idNumber}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();

        if (response.ok) {
            setUsers(result.data);
            setErrorMessage("");    // 清除錯誤訊息
        } else {
            setErrorMessage("找不到用戶");
        }
    }
    
    const handleChange = (e) => {
        setIdNumber(e.target.value);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();             
        fetchUserByIdNumber(idNumber);  
    }
    
    return (
        <>
            <div className="container px-3">

                <div className="row d-flex">
                    <form action="/bank/admin/user-manage/{idNumber}" onSubmit={handleSubmit} className="my-4">
                        <span className="fs-5">查詢用戶 ( 請輸入身分證字號 )：</span>
                        <input type="text" name="idNumber" onChange={handleChange} />
                        <button type="submit" className="btn btn-success mx-3">查詢</button>
                    </form>

                    {/* <!-- 顯示錯誤訊息 --> */}
                    {errorMessage.length > 0 ? <div className="alert alert-danger d-flex align-items-center" role="alert">{errorMessage}</div> : "" }
                    
                </div>
            


            <table className="table" id="user-manage-table">
                <thead>
                    <tr>
                        <th scope="col">編號</th>
                        <th scope="col">用戶</th>
                        <th scope="col">性別</th>
                        <th scope="col">郵箱</th>
                        <th scope="col">手機</th>
                        <th scope="col">權限</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.gender}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                            
                        </tr>
                    ))) : (

                        <tr>
                            <td colSpan={9} className="text-center">
                                暫無用戶
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
            </div>

        </>
    )

}

export default Management;
