import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminHomePage = () => {

    const navigate = useNavigate();
    const [jwtToken, setJwtToken] = useState("");

    const [adminDetail, setAdminDetail] = useState({
        id: "",
        username: "",
        gender: "",
        email: "",
        phone: "",
        role: "",
        approve: ""
    });

    // 初次加載
    useEffect(() => {
        const token = localStorage.getItem('jwt');

        if (!token) {
            navigate("/bank/auth/adminlogin");  // 如果沒找到 JWT，重定向到登錄頁面
            return;
        }
        setJwtToken(token);
        
    }, []);    
    
    // JWT 更新時加載
    useEffect(() => {

        if (jwtToken === "") {  // 初次渲染時 jwtToken 的值還是初始空值，因此要讓這個 useEffect 跳過初次渲染 
            return;
        }
        const decodeToken = jwtDecode(jwtToken);  // 解碼 JWT 
        const userId = decodeToken.sub;

        if (decodeToken.exp < Date.now()/1000 ) {   // decodeToken.exp 會返回「秒」級的時間戳，但 Date.now() 提供的是毫秒，因此要除以 1000
            navigate("/bank/auth/adminlogin");
            return;
        }

        fetchAdmin(userId);

    }, [jwtToken]);          // 當 jwtToken 更新時，這個 useEffect 才會觸發

    const fetchAdmin = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8080/bank/user/${userId}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`
                }
            })

            if (response.ok) {
                const result = await response.json();
                setAdminDetail(result.data); 
            } else {
                console.error("無法獲取管理者資料", response.status);
            }
        } catch (error) {
            console.error("發生錯誤", error);
        }
    }

    return (
        <>
            <div className="container ">

                <div className="text-center fs-1 mt-5 mb-5">
                    <h1>
                        親愛的
                        {adminDetail ? <span> {adminDetail.username} </span> : ""}
                        {adminDetail.gender === "female" ? <span>女士</span> : ""}
                        {adminDetail.gender === "male" ? <span>先生</span> : ""}
                        您好
                    </h1>
                </div>

            </div>

        </>
    )

}

export default AdminHomePage;