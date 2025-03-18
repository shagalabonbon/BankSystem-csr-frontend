import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// 驗證 JWT 並回傳 Claims ( Payload )

const VerifyJwt = (token) => {

    if (!token) {
        return null;
    }

    try {
        const decodeToken = jwtDecode(token);
        if (!decodeToken.exp || decodeToken.exp < Date.now() / 1000) {
            return null;
        }
        return decodeToken; // 驗證成功返回解碼的 Token 
        
    } catch (error) {
        console.error("JWT 解析錯誤:", error);
        return null;
    }

}

export default VerifyJwt;