import {useLocation} from "react-router-dom";
import react, {useEffect, useState} from 'react';
import defaultLogger from "redux-logger/src";
import {Container} from "react-bootstrap";

const GrepIUNavigator = () => {
  const location = useLocation();
  const [navi, setNavi] = useState("");

  const display = (path) => {
    switch (path) {
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
    <div style={{
      height: '3rem',
      borderWidth: '1px',
      borderColor: '#c6c8ca',
      borderStyle: 'none none solid none',
      margin: 'auto'
    }}>
      <div className="align-self-center">
        <h6>{navi}</h6>
      </div>
    </div>
  </>
}

export default GrepIUNavigator;
