import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerifyJwt } from "../../utils";


const UserUpdate = () => {

    const navigate = useNavigate();
    

    const [ formData , setFormData ] = useState ( {
        id: "",
        username: "",
        gender: "",
        email: "",
        phone: "",

    });

    // 更新表單資料
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    // 提交表單資料
    const handleSubmit = async (event) => {
        event.preventDefault(); // 防止表單重新載入頁面

        try {
            const token = localStorage.getItem("jwt");
            const decodeToken = jwtDecode(token);

            if (decodeToken) {
                const response = await fetch('http://localhost:8080/bank/user/update', {
                    method:'put',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData) 
                });

                const result = await response.json();
                if (response.ok) {
                    alert('資料更新成功！');
                    // 可以選擇重新導向
                    navigate('/bank/user/update');
                } else {
                    navigate("/bank/error", { state: result });
                }
            } else {
                alert("請重新登入");
                navigate("/bank/auth/userlogin");
            }
        } catch (error) {
            navigate("/bank/error", { state: { message: error.message, status: "Network Error" } });
        }
    }

    // 獲取預設資料
    const fetchUserData = async(token,userId) => {
        
        try{
            const response = await fetch ( `http://localhost:8080/bank/user/${userId}` , {
            method: 'get',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`    
            }
            });
    
            const result = await response.json(); 
            
            if(response.ok){
                setFormData(result.data);
            }else{
                navigate("/bank/error", { state: result});
            } 
        }catch(error){
            navigate("/bank/error", { state: { message:error.message , status:"Network Error" } })
        }
    }

    useEffect ( ()=>{
        const token = localStorage.getItem("jwt");
        const decodeToken = VerifyJwt(token);

        if(decodeToken){
            const userId = decodeToken.sub;
            setFormData({ ...formData,id:userId});
            fetchUserData(token,userId);
        } else {
            alert("請重新登入");
            navigate("/bank/auth/userlogin");
        }

    },[])

    return (

        <>
            <div className="text-center fs-1 mt-5 mb-3 ">用戶資料變更</div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="bg-light p-4 rounded col-md-4 p-5 ">
                        <form className="d-flex flex-column" onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="username" className="form-label col-form-label-lg">姓名</label>
                                <input type="text" name="username" placeholder="Name"
                                    className="form-control form-control-lg" id="username" required readOnly value={formData.username} onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label col-form-label-lg" htmlFor="gender">性別</label>
                                <select className="form-select form-control-lg" id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                                    <option value="male">男性</option>
                                    <option value="female">女性</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label col-form-label-lg">電子郵件</label>
                                <input type="email" name="email"  placeholder="Email"
                                    className="form-control form-control-lg" id="email" required value={formData.email} onChange={handleChange}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label col-form-label-lg">電話</label>
                                <input type="text" name="phone"  placeholder="Phone"
                                    className="form-control form-control-lg" id="phone" required value={formData.phone} onChange={handleChange}/>
                            </div>

                            <button type="submit" className="btn btn-success btn-lg mt-3">更新資料</button>

                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}

export default UserUpdate;
