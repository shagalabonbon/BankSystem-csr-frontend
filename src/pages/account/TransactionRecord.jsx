import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useLocation, useNavigate } from "react-router-dom";

const TransactionRecord = () => {

	const location = useLocation();

	const navigate = useNavigate();

	// DataTable 欄位
	const column = [
		{ name: "交易帳戶", selector: row => row.fromAccountNumber, sortable: true },   // selector 從 data 中提取指定欄位值
		{ name: "目標帳戶", selector: row => row.toAccountNumber, sortable: true },
		{ name: "交易金額", selector: row => row.amount, sortable: true },
		{ name: "交易時間", selector: row => row.transactionTime, sortable: true },
		{ name: "交易類型", selector: row => row.transactionType, sortable: true },
		{ name: "交易狀態", selector: row => row.status, sortable: true },
		{ name: "交易備註", selector: row => row.description, sortable: true }
	];

	const [txHistoryData, setTxHistoryData] = useState([]);

	const fetchData = async (token, accountId) => {

		try {
			const response = await fetch(`http://localhost:8080/bank/accounts/${accountId}/histories`, {
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			});

			const result = await response.json();

			if (response.ok) {
				setTxHistoryData(result.data);
			} else {
				navigate("/bank/error", { state: result })
			}
		} catch (error) {
			navigate("/bank/error", { state: { message: error.message, status: "Network Error" } })
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('jwt');
		const decodeToken = jwtDecode(token);
		const accountId = location.state;

		if (decodeToken && accountId) {
			fetchData(token, accountId);
		} else {
			alert("請重新登入");
			navigate("/bank/auth/userlogin");
		}

	}, [])

	return (
		<div className="container">
			<div className="mt-5">

				{/* 將資料帶入 DataTable 物件，並提供額外功能 */}

				<DataTable
					title="交易紀錄"
					columns={column}
					data={txHistoryData}
					pagination           // 分頁功能
					highlightOnHover     // 標籤上顯著提示
				/>
				
			</div>

		</div>


	)
}

export default TransactionRecord;

