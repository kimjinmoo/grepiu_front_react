import {useLocation} from "react-router-dom";
import {useEffect, useState} from 'react';

const GrepIUNavigator = () => {
  const location = useLocation();
  const [navi, setNavi] = useState("");
  const [bgColor, setBgColor] = useState("#0f0f0f");

  const display = (path) => {
    switch (path) {
      case "/login":
        setNavi("로그인");
        break;
      case "/":
        setNavi("홈");
        break;
      case "/about":
        setNavi("관하여...");
        break;
      case "/post":
        setNavi("포스트");
        break;
      case "/toy":
        setNavi(" 토이프로젝트");
        break;
      case "/cloud":
        setNavi("클라우드");
        break;
      case "/admin":
        setNavi("관리자");
        break;
      case "/support":
        setNavi("지원받기");
        break;
      case "/toy/lotto":
        setNavi("ㅈㅈㄱㄹㄸ")
        break;
      default :
        if (path.indexOf("post/") > -1) {
          setNavi("상세보기");
        }
        break;
    }
  }

  useEffect(() => {
    display(location.pathname);
  }, [location.pathname])

  return <>
    <div
        className="bg-light d-flex flex-column justify-content-center align-items-center"
        style={{
          height: '3rem',
          borderWidth: '1px',
          borderColor: '#f0f0f0',
          borderStyle: 'none none solid none'
        }}>
      <h6>{navi}</h6>
    </div>
  </>
}

export default GrepIUNavigator;
