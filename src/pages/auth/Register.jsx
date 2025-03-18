import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {

    const navigate = useNavigate();                         // Hook 必須在組件外宣告 ( 不能在 handleSubmit 內宣告 )

    // 管理表單輸入資料

    const [ formData , setFormData ] = useState ( {
        username: "",
        idNumber: "",
        gender: "",
        email: "",
        phone: "",
        rawPassword: "",
        checkPassword:""
    });

    const handleChange = (event) => {                        // event.target 代表觸發 onChange 事件的 input、select、textarea 等表單元素
        setFormData({ 
            ...formData,                                     // 解構formData，不使用會只保留最新輸入資料，其他屬性會消失，可視為保留全部屬性，再更新原資料或加入新輸入資料
            [event.target.name] : event.target.value         // 將資料更新成輸入值 ( [] 為動態鍵，根據不同的輸入框動態更新屬性名稱，未使用 [] 會被當成字串而非屬性 )
        })
    }

    // 表單提交

    const handleSubmit = async(event) => {

        event.preventDefault(); // 阻止表單提交

        const password = formData.rawPassword ;
        const checkPassword = formData.checkPassword ;

        if (password !== checkPassword) { // 密碼不一致時停止執行
            alert("輸入的密碼不一致!");
            return;                    
        }

        try{
            const { checkPassword, ...dataToSubmit } = formData;  // 不提交 checkPassword ( 解構賦值，...dataToSubmit 會保留除 checkPassword 外的所有屬性 )

            const response = await fetch( "http://localhost:8080/bank/auth/register" , {
                method:"post",
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify(dataToSubmit)                // Body 傳送的是用戶填寫的表單資料 json 格式 ( post 請求將資料提交到伺服器 )
            }); 

            const result = await response.json();      // 解析後端傳遞的資料為 JSON

            if (response.ok) {
                alert("註冊成功");                      // 可以在這裡處理註冊成功後的邏輯
                console.log(result);
                navigate("/bank/auth/userlogin");      // 註冊成功，跳轉至登入頁面
            } 

        }catch(error){
            console.error("註冊失敗",error);  // 須處裡
            alert("註冊發生錯誤");
        }
    }

    return (

        <>
            <div className="text-center fs-1 pt-5 mb-3 ">用戶註冊</div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="bg-light p-4 rounded col-md-4 p-5 ">

                        <form onSubmit={handleSubmit} className="d-flex flex-column">      {/* 使用 handleSubmit 取代一般表單提交，避免將請求發送到前端路由 */}
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label col-form-label-lg">姓名</label>
                                <input type="text" name="username" id="username" placeholder="Name" className="form-control form-control-lg" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="idNumber" className="form-label col-form-label-lg">身分證字號</label>
                                <input type="text" name="idNumber" id="idNumber" placeholder="idNumber"
                                    className="form-control form-control-lg" onChange={handleChange} required />  {/* 輸入框變更時觸發 onChange */}
                            </div>
                            <div className="mb-3">
                                <label className="form-label col-form-label-lg" htmlFor="gender">性別</label>
                                <select className="form-select form-control-lg" id="gender" name="gender" defaultValue="" onChange={handleChange} >  {/* 使用 defaultValue */}
                                    <option value="" disabled>請選擇</option>   {/* <option selected>請選擇</option> -> React 不支援 selected 屬性 */}
                                    <option value="male">男性</option>
                                    <option value="female">女性</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label col-form-label-lg">電子郵件</label>
                                <input type="email" name="email" id="email" placeholder="Email" className="form-control form-control-lg"  onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label col-form-label-lg">電話</label>
                                <input type="text" name="phone" id="phone" placeholder="Phone" className="form-control form-control-lg" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rawPassword" className="form-label col-form-label-lg">密碼</label>
                                <input type="password" name="rawPassword" id="rawPassword" placeholder="Password" className="form-control form-control-lg" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="checkPassword" className="form-label col-form-label-lg">確認密碼</label>
                                <input type="password" name="checkPassword" id="checkPassword" placeholder="checkPassword"
                                    className="form-control form-control-lg" onChange={handleChange} required />
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg mt-3">註冊</button> 

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Register;