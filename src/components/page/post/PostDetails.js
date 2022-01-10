import react, {useEffect, useState} from 'react';
import {fetchPostDetail} from "../../../services/service";
import {Link, useParams} from "react-router-dom";
import './quill.snow.css';
import {Container} from "react-bootstrap";
import Moment from "react-moment";

const PostDetails = () => {
  const {id} = useParams()

  const [details, setDetails] = useState({});

  const fetchDetail = (id) => {
    console.log(`id : ${id}`);
    fetchPostDetail({
      id
    }).then(res=>{
      if(res.status === 200) {
        setDetails(res.data);
      }
    })
  }

  useEffect(()=>{
    fetchDetail(id);
  },[id])

  return <Container fluid>
    <div className="ql-snow w-100">{
      details?
          <>
            <div className="ql-editor" dangerouslySetInnerHTML={{__html: details?.post?.content}}></div>
            {
              details?.post?.hashTag.map(tags=><>#{tags}</>)
            }
            최종 수정<Moment interval={1000} format="YYYY/MM/DD" date={details?.post?.modifyDate}/>
            {
              details?.next?
                  <div>
                    다음글 - <Link to={`/post/${details.next.id}`}>{details.next.subject}</Link>
                  </div>:<></>
            }
            {
              details?.prev?
                  <div>
                    이전글 - <Link to={`/post/${details.prev.id}`}>{details.prev.subject}</Link>
                  </div>:<></>
            }
            </>
          :
          <>내용이 없습</>
    }</div>
  </Container>
}

export default PostDetails;
