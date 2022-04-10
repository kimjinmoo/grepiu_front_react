import {
  Collapse,
  FormControl,
  InputGroup,
  ListGroup,
  PageItem,
  Pagination
} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import {fetchPosts} from "../../../../services/service";
import {Link} from "react-router-dom";
import {BsSearch} from "react-icons/bs";

/**
 *
 * 게시글 관리
 *
 * @param tabKey 탭키
 * @returns {JSX.Element}
 * @constructor
 */
const PostManagement = ({tabKey}) => {

  // 토탈 카운트
  const [totalCount, setTotalCount] = useState(0);
  // 페이로드
  const [payload, setPayload] = useState({
    page: 0,
    searchText: ''
  })
  const scale = useRef(10);
  const [totalPage, setTotalPage] = useState([]);
  const [posts, setPosts] = useState([]);


  // 포스트 값 가져오기
  const fetch = ({cPage, filter}) => {
    fetchPosts({
      currentPage: cPage,
      filter: filter,
      size: scale.current
    }).then(res => {
      if (res.status === 200) {
        // 총 데이터
        setTotalCount(res.data.tCount);
        // 페이지 만들기
        let totalPage = res.data.tCount / scale.current;
        let pageItems = []
        for (let x = 0; x < totalPage; x++) {
          pageItems.push(x + 1);
        }
        setTotalPage(pageItems);

        // 리스트
        setPosts(res.data.list);

      }
    })
  }

  // 검색 이벤트
  const onSearchHandler = e => {
    console.log(e.target.value);
    setPayload({...payload, searchText: e.target.value, page: 0})
  }

  useEffect(() => {
    // 리스트 데이터
    fetch({
      cPage: payload.page,
      filter: payload.searchText
    });
  }, [payload, tabKey])

  return (
      <>
        <div>총 게시글 : {totalCount}</div>
        <Collapse in={true} dimension="width" >
          <div className="m-2">
            <InputGroup>
              <FormControl
                  type="text"
                  placeholder="검색어 입력"
                  value={payload.searchText}
                  onChange={onSearchHandler}
              />
              <InputGroup.Text>
                <BsSearch/>
              </InputGroup.Text>
            </InputGroup>
          </div>
        </Collapse>
        <ListGroup variant="flush" as="ol">
          {
            posts?.map(obj => <ListGroup.Item as="li" key={obj.id}>
              <Link to={`/admin/${obj.id}`}>
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{obj.subject}</div>
                </div>
              </Link>
            </ListGroup.Item>)
          }
        </ListGroup>
        <Pagination>
          {
            totalPage?.map(o => <PageItem key={o} active={o === (payload.page + 1)}
                                         onClick={() => setPayload({...payload, page: o - 1})}>{o}</PageItem>)
          }
        </Pagination>
      </>
  );
}

export default PostManagement;
