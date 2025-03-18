import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const RecoveryReset = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({});

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/bank/auth/recovery/reset', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                navigate("/bank/auth/recovery/result");
            } else {
                navigate("/bank/error", { state: result });
            }
        } catch (error) {
            navigate("/bank/error", { state: { message: error.message, status: "Network Error" } })
        }
    }

    useEffect(() => {
        const data = location.state;
        if (data) {
            setFormData(data);
        }
    }, [])


    return (

        <>
            <div className="text-center fs-1 mt-5 mb-3 ">密碼重設</div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="bg-light p-4 rounded col-md-4 p-5 ">
                        <form className="d-flex flex-column" onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="newPassword" className="form-label col-form-label-lg">請輸入新密碼</label>
                                <input type="password" name="newPassword" id="newPassword" placeholder="newPassword" className="form-control form-control-lg" required onChange={handleChange} />
                            </div>

                            <div>
                                <button type="submit" className="btn btn-primary btn-lg mt-3">確認</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}

export default RecoveryReset;