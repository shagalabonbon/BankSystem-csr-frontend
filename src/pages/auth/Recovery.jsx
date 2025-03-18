import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Recovery = () => {

    const navigate = useNavigate();

    const [ formData , setFormData ] = useState ( {
        email: "",
        authCode: "",
        newPassword: ""
    });

    const handleChange = (event) => {                        
        setFormData({ 
            ...formData,                                     
            [event.target.name] : event.target.value        
        })
    }

    const handleSubmit = async(event) => {

        event.preventDefault();
    
        try{
            const response = await fetch ( 'http://localhost:8080/bank/auth/recovery' , {
            method: 'post',
            headers:{
                'Content-Type' : 'application/json',    
            },
            body:JSON.stringify(formData)
            });
    
            const result = await response.json(); 
            
            if(response.ok){
                navigate("/bank/auth/recovery/verify", { state: formData });
            
            }else{
                navigate("/bank/error", { state: result });
            } 
        }catch(error){
            navigate("/bank/error", { state: { message:error.message , status:"Network Error" } })
        }
    }

    return (

        <>
            <div className="text-center fs-1 mt-5 mb-3 ">忘記密碼</div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="bg-light p-4 rounded col-md-4 p-5 ">
                        <form className="d-flex flex-column" onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label col-form-label-lg">請輸入註冊電子郵件</label>
                                <input type="text" name="email" id="email" placeholder="Email" className="form-control form-control-lg" required onChange={handleChange} />
                            </div>

                            {/* <p th:if="${errorMassage}!=null" th:text="${errorMassage}"></p> */}

                            <button type="submit" className="btn btn-primary btn-lg mt-3" >確認</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recovery;