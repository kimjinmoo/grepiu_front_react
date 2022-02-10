import {useEffect, useState} from 'react';
import {fetchPostDetail} from "../../../services/service";
import {Link, useParams} from "react-router-dom";
import './quill.snow.css';
import {Container} from "react-bootstrap";
import Moment from "react-moment";

/**
 *
 * 포스팅 상세보기
 *
 * @returns {JSX.Element}
 * @constructor
 */
const PostDetails = () => {
  const {id} = useParams()
  // 상세 데이터
  const [details, setDetails] = useState({});

  // 데이터를 불러온다.
  const fetchDetail = (id) => {
    fetchPostDetail({
      id
    }).then(res => {
      if (res.status === 200) {
        setDetails(res.data);
      }
    })
  }

  // id가 변경 되면 새로 불러온다.
  useEffect(() => {
    fetchDetail(id);
  }, [id])

  return <Container>
    <div className="ql-snow w-100">{
      details ?
          <>
            <div className="mt-2">
              <h3>{details?.post?.subject}</h3>
            </div>
            <hr/>
            <div className="ql-editor"
                 dangerouslySetInnerHTML={{__html: details?.post?.content}}></div>
            <div className="d-flex justify-content-end">
              <Moment interval={1000} format="YYYY/MM/DD HH:MM"
                           date={details?.post?.modifyDate}/>
            </div>
            {
              details?.post?.hashTag.map(
                  tags => <span key={tags} className="m-1" style={{
                    color: '#72c02c'
                  }}>#{tags}</span>)
            }
            <hr/>
            {
              details?.next ?
                  <div>
                    다음글 - <Link className="text-decoration-none"
                      to={`/post/${details.next.id}`}>{details.next.subject}</Link>
                  </div> : <></>
            }
            {
              details?.prev ?
                  <div>
                    이전글 - <Link className="text-decoration-none"
                      to={`/post/${details.prev.id}`}>{details.prev.subject}</Link>
                  </div> : <></>
            }
          </>
          :
          <>내용이 없습</>
    }
    <hr/>
      <div className="d-flex justify-content-end bd-highlight">
        <Link className="text-decoration-none" to="/post">목록으로</Link>
      </div>
    </div>
  </Container>
}

export default PostDetails;
