import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const UserHomePage = () => {

    const navigate = useNavigate();

    const [ userDetail , setUserDetail ] = useState({
        id:"",
        username:"" ,
        gender: "",
        email: "",
        phone: "",
        role: "",
        approve: ""
    });

    const jwtToken = localStorage.getItem('jwt');

    // 驗證 Jwt
    const verifyJwt = (token) => {
        if(!token){
            return null;
        }

        try{
            const decodeToken = jwtDecode(token);
            if (!decodeToken.exp || decodeToken.exp < Date.now() / 1000) {
                return null;
            }
            return decodeToken; // 驗證成功返回解碼的 Token 

        }catch(error){
            console.error("JWT 解析錯誤:", error);
            return null;
        }

    }

    const fetchUser = async (userId,token) => {
        try {
            const response = await fetch(`http://localhost:8080/bank/user/${userId}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            if (response.ok) {
                const result = await response.json();
                setUserDetail(result.data); 

            } else {
                console.error("無法獲取用戶資料", response.status); 
                const result = await response.json();
                localStorage.setItem('errorMessage',result.message);
                localStorage.setItem('errorStatus',response.status.toString()); // 將錯誤回應存入 localStorge

                navigate("/bank/error");  // 統一錯誤處理頁面
            }
        } catch (error) {
            console.error("發生錯誤", error);
            navigate("/bank/error"); 
        }
    }



    useEffect(() => {

        const decodeToken = verifyJwt(jwtToken);

        if(decodeToken){
            fetchUser(decodeToken.sub,jwtToken);
        }

    }, [jwtToken]);


    return (

        <>
            <div className="text-center fs-1 mt-5 mb-3 ">
                <h1>
                    親愛的 <span> {userDetail ? userDetail.username : ''} </span>
                    { userDetail.gender === 'female' ? <span>女士</span>:"" } 
                    { userDetail.gender === 'male' ? <span>先生</span>:"" }      
                    您好
                </h1>
            </div>

        </>
    )
}

export default UserHomePage;