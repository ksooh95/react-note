import axios from 'axios';
import { useEffect, useState } from 'react';
import Dust from './component/dust';
import Weather from './component/weather';

function App() {
    return (
        <div className="App">
            <div className="container">
                <div className="top">
                    <Dust />
                    <Weather />
                </div>

                <div className="memo_wrap">
                    <ul>
                        <li>
                            <p>메모</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;
