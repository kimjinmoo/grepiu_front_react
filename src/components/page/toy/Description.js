
// 설명
import {Link} from "react-router-dom";
import Vote from "./vote";

const Description = ({index = 0}) => {

  const display = (index) => {
    switch (index) {
      case 0:
        return grepPlace();
      case 1:
        return woori();
      case 2:
        return crawling();
      case 3:
        return Vote();
      default :
        return defaultDescription();
    }
  }

  // 기본값
  const defaultDescription = () => <>
    <h1>내용 없음</h1>
  </>

  // 그랩 플레이스
  const grepPlace = () => <>
    <h1>그랩 플레이스</h1>
    <a href="https://play.google.com/store/apps/details?id=com.grepiu.gsapp.grep_search_app" target="_blank">마켓가기</a>
  </>

  // 우리 어때
  const woori = () => <>
    <h1>우리 어때</h1>
    <a href="https://play.google.com/store/apps/details?id=faceapp.grepiu.com.flutter_face_app&hl=ko" target="_blank">마켓가기</a>
  </>

  // 크롤링
  const crawling = () => <>
    <h1>크롤링</h1>
    <Link to="/cloud">크롤링</Link>
  </>

  return <>
    {display(index)}
  </>
}

export default Description;
