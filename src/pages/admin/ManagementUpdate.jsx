import React, { useEffect, useState } from "react";

const Management = () => {

    const [formData, setFormData] = useState({
        id:"",
        username: "",
        idNumber: "",
        gender: "",
        email: "",
        phone: "",
    });

    const handleChange = (event) => {                        // event.target 代表觸發 onChange 事件的 input、select、textarea 等表單元素
        setFormData({
            ...formData,                                     // 解構formData，不使用會只保留最新輸入資料，其他屬性會消失，可視為保留全部屬性，再更新原資料或加入新輸入資料
            [event.target.name]: event.target.value         // 將資料更新成輸入值 ( [] 為動態鍵，根據不同的輸入框動態更新屬性名稱，未使用 [] 會被當成字串而非屬性 )
        })
    }

    useEffect(() => {
    }, [])


    const handleSubmit = async (event, userId) => {

        event.preventDefault();

        const response = await fetch(`http://localhost:8080/bank/admin/user-manage/update/${userId}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const result = await response.json();

        }
    }

    return (
        <>

            <div className="container px-3">
                <form className="d-flex flex-column" onSubmit={handleSubmit}>
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
                        <input type="email" name="email" id="email" placeholder="Email" className="form-control form-control-lg" onChange={handleChange} required />
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

        </>
    )

}

export default Management;
