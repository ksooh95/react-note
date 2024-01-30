import { useEffect, useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';

function App() {
    const navi = useNavigate();

    useEffect(() => {
        const reset = localStorage.getItem('memoData');
        if (reset === null) {
            localStorage.setItem('memoData', JSON.stringify([]));
        }
    });

    return (
        <div className="App">
            <div className="container">
                <h1 className="top_title">NOTE</h1>
                <Routes>
                    <Route path="/" element={<List />} />
                    <Route path="/write" element={<Write navi={navi} />} />
                </Routes>
            </div>
        </div>
    );
}

function List(props) {
    const [searchInput, setSearchInput] = useState('');
    const [filterData, setFilterData] = useState([]);

    const listData = JSON.parse(localStorage.getItem('memoData'));
    console.log('리스트데이터 :', listData);

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };

    const searchBtn = () => {
        const listData = JSON.parse(localStorage.getItem('memoData'));
        const filterData = listData.filter((e) => {
            return e.title.includes(searchInput);
        });
        setFilterData(filterData);
    };

    return (
        <div className="container2">
            <input type="text" placeholder="검색" onChange={handleSearch} value={searchInput} />
            <button type="button" onClick={searchBtn}>
                검색하기
            </button>
            <div className="memo_list">
                {(filterData.length > 0 ? filterData : listData).map((e) => {
                    return (
                        <div className="memo">
                            <h1 className="memo_title">{e.title}</h1>
                            <p className="memo_text">{e.text}</p>
                        </div>
                    );
                })}
                {filterData.length === 0 && listData.length === 0 && <div className="no-result">검색 결과 없음</div>}
            </div>
            <div className="r_btn">
                <Link to="/write" className="wrt_btn">
                    글쓰기
                </Link>
            </div>
        </div>
    );
}

function Write(props) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const handleTitle = (e) => {
        setTitle(e.target.value);
        console.log(title);
    };
    const handleText = (e) => {
        setText(e.target.value);
        console.log(text);
    };

    const writeData = {
        id: Date.now(),
        title: title,
        text: text,
    };
    const createMemoBtn = () => {
        let getMemoData = localStorage.getItem('memoData');
        getMemoData = JSON.parse(getMemoData);
        getMemoData.push(writeData);
        localStorage.setItem('memoData', JSON.stringify(getMemoData));
        props.navi('/');
    };
    return (
        <div className="container2">
            <div className="write">
                <input type="text" placeholder="제목" onChange={handleTitle} value={title} />
                <textarea cols="30" rows="10" placeholder="내용" onChange={handleText} value={text}></textarea>
            </div>
            <div className="r_btn">
                <button type="button" onClick={createMemoBtn}>
                    작성완료
                </button>
                <Link to="/" className="list_btn">
                    목록으로
                </Link>
            </div>
        </div>
    );
}

export default App;
