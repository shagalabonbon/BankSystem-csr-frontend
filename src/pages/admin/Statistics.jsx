import React, { useEffect, useState } from "react";

const Statistics = () => {

    const [ maleCount, setMaleCount ] = useState (0);
    
    const [ femaleCount, setFemaleCount ] = useState (0);

    const fetchStatistics = async () => {
        const response = await fetch('http://localhost:8080/bank/admin/statistics', {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();

        if (response.ok) {
            setMaleCount(result.data.maleCount);
            setFemaleCount(result.data.femaleCount);
        } else {
            console.error(`錯誤碼： ${response.status} 訊息： ${result.message}`);
        }
    }

    useEffect ( () => { 

        fetchStatistics();

        // @ts-ignore
        google.charts.load("current", { packages : [ "corechart" ]});
		// @ts-ignore
		google.charts.setOnLoadCallback(drawChart);

		function drawChart() {
			// @ts-ignore
			var data = google.visualization.arrayToDataTable([
				[ 'Gender', 'Quantity' ], 
				[ '男性', maleCount ],
				[ '女性', femaleCount ] 
            ]);

			var options = {
				pieHole : 0.4,
				backgroundColor : 'transparent',  // 背景透明
				colors : [ '#0066CC', '#D9006C' ] // 男姓藍色、女性粉色
			};

			// @ts-ignore
			var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
			chart.draw(data, options);
		}
    } ,[maleCount,femaleCount]) 

    return (
        <>
            {/* <!-- 圖表 ( 需要置中 ) --> */}

            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-6 bg-light border border-dark border-2 rounded my-5 p-0 ">
                        <div className="fs-4 fw-bolder text-center border-bottom border-black border-2 p-3 mx-0 ">
                            用戶性別統計
                        </div>

                        <div className="d-flex justify-content-center">
                            <div id="donutchart" style={{ height:'300px', width:'500px' }}> </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Statistics;
