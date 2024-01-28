import axios from 'axios';
import { useState, useEffect } from 'react';

function Dust() {
    const [geowalDust, setGeowalDust] = useState(null);

    const myKey = process.env.REACT_APP_API_KEY;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty',
                    {
                        params: {
                            serviceKey: myKey,
                            numOfRows: 42,
                            returnType: 'json',
                            sidoName: '인천',
                        },
                    }
                );
                const items = response.data?.response?.body?.items;
                if (items) {
                    const filterGeowal = items.find((e) => {
                        return e.stationName.includes('구월동');
                    });
                    setGeowalDust(filterGeowal);
                    console.log('불러와졌나 :', geowalDust);
                }
                console.log('불러와졌나 :', response.data);
            } catch (err) {
                console.log('캐치에서 잡힘 :', err);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="Dust">
            <div className="dust_info">
                {geowalDust ? (
                    <>
                        <div className="dust_state">
                            {geowalDust?.pm10Value >= 151 ? (
                                <div className="verybad">
                                    <h1>미세먼지</h1>
                                    <h2>매우나쁨</h2>
                                    <p>미세먼지 농도 : {geowalDust?.pm10Value}ug/m3</p>
                                </div>
                            ) : geowalDust?.pm10Value >= 81 ? (
                                <div className="bad">
                                    <h1>미세먼지</h1>
                                    <h2>나쁨</h2>
                                    <p>미세먼지 농도 : {geowalDust?.pm10Value}ug/m3</p>
                                </div>
                            ) : geowalDust?.pm10Value >= 31 ? (
                                <div className="soso">
                                    <h1>미세먼지</h1>
                                    <h2>보통</h2>
                                    <p>미세먼지 농도 : {geowalDust?.pm10Value}ug/m3</p>
                                </div>
                            ) : geowalDust?.pm10Value >= 0 ? (
                                <div className="good">
                                    <h1>미세먼지</h1>
                                    <h2>좋음</h2>
                                    <p>미세먼지 농도 : {geowalDust?.pm10Value}ug/m3</p>
                                </div>
                            ) : null}
                        </div>
                    </>
                ) : (
                    <>
                        <div>미세먼지 정보 불러오는중 . . .</div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Dust;
