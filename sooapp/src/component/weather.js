import axios from 'axios';
import { useState, useEffect } from 'react';

function Weather() {
    const myKey = process.env.REACT_APP_API_KEY;
    const [weather, setWeather] = useState();

    useEffect(() => {
        const weatherFetchData = async () => {
            try {
                const response = await axios.get('http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList', {
                    params: {
                        serviceKey: myKey,
                        dataCd: 'ASOS',
                        dateCd: 'DAY',
                        startDt: 20100101,
                        endDt: 20100601,
                        stnIds: 108,
                        dataType: 'json',
                    },
                });

                weatherFetchData();
                console.log('날씨데이터 불러와졌나 :', response.data);
                setWeather(response.data);
            } catch (err) {
                console.log(err);
            }
        };
    }, [myKey]);

    return <div className="Weahter">ddd</div>;
}

export default Weather;
