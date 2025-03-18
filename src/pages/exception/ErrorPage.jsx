import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


const ErrorPage = () => {

    const [errorMessage, setErrorMessage] = useState("找不到頁面");

    const [errorStatus, setErrorStatus] = useState(404);

    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {

        const result = location.state?.result;
        const message = location.state?.errorMessage;
        const status = location.state?.status;

        if (result) {
            setErrorMessage(result.data.message);
            setErrorStatus(result.data.status);
            return;
        }

        if (status) {
            setErrorMessage(message);
            setErrorStatus(status);
            return;
        }
    }, [])

    const handleClick = () => {
        navigate("/bank/index");
    };

    return (

        <>
            <div className="container d-flex justify-content-center">
                <div className="alert alert-danger mt-3" role="alert">
                    <h1>error {errorStatus} -- {errorMessage} </h1>
                    <button onClick={handleClick} className="btn btn-secondary mt-3 me-2">返回首頁</button>
                </div>
            </div>
        </>
    )
}

export default ErrorPage;
