import React, {useEffect, useState} from 'react';
import {
  Card,
  Col,
  Container,
  FormControl,
  InputGroup,
  ProgressBar,
  Row
} from "react-bootstrap";
import Tags from "./Tags";
import {fetchPosts, fetchPostTags} from "../../../services/service";
import {Link} from "react-router-dom";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Moment from "react-moment";
import {BsSearch} from "react-icons/bs";
import {useCollapse} from 'react-collapsed'

/**
 *
 * 포스팅
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Post = () => {

  // 로딩
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(false);
  // 페이로드
  const [payload, setPayload] = useState({
    page: 0,
    hashTags: '',
    searchText: ''
  })
  // 태그
  const [tags, setTags] = useState([]);
  // 리스트
  const [lists, setLists] = useState([]);
  // 리스트 토탈 카운트
  const [totalCount, setTotalCount] = useState(0);
  // 페이지
  const [totalPage, setTotalPage] = useState(0);

  const [isExpanded, setExpanded] = useState(false)
  const {getCollapseProps, getToggleProps} = useCollapse(
      {isExpanded, duration: 100})

  // 태그를 가져온다.
  const fetchTags = () => {
    setProgress(true);
    fetchPostTags().then(res => {
      if (res.status === 200) {
        setTags(res.data);
      }
    }).finally(() => setProgress(false))
  };

  // 포스트 값 가져오기
  const fetch = ({
    cPage,
    hashTags,
    filter
  }) => {
    fetchPosts({
      currentPage: cPage,
      size: 15,
      hashTags: hashTags,
      filter: filter
    }).then(res => {
      if (res.status === 200) {
        // 포스팅 총 수
        setTotalCount(res.data.tCount);
        // 토탈 페이지 수
        setTotalPage(res.data.tPage);
        // 리스트
        if (cPage === 0) {
          // 페이지가 0일 경우
          setLists(res.data.list);
        } else {
          //페이지가 0이 아닌경우 append
          let appendList = [...lists, ...res.data.list];
          setLists(appendList);
        }
      }
    })
  }

  // 페이지를 추가한다.
  const fetchMoreData = () => {
    const currentPage = payload.page + 1;
    // 페이지 업데이트
    setPayload({
      ...payload, page: currentPage
    })
  }

  // 무한 스클롤 대응
  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage: totalCount > lists.length,
    onLoadMore: fetchMoreData
  });

  // tag값을 불러온다.
  useEffect(() => {
    // 태그 데이터
    fetchTags();
  }, [])

  // 리스트를 갱신한다.
  useEffect(() => {
    // 리스트 데이터
    fetch({
      cPage: payload.page,
      hashTags: payload.hashTags,
      filter: payload.searchText
    });
  }, [payload])

  // HashTag를 검색한다.
  const onHashTagSearch = (filter) => {
    // 검색 엔진 Set
    setPayload({...payload, page: 0, hashTags: filter.hashTags})
  }

  // 검색 바 토클
  const searchBarToggle = () => {
    if (isExpanded) {
      setPayload({...payload, page: 0, searchText: ''})
    }
    setExpanded(!isExpanded);
  }

  return <Container>
    <Row>
      <Col xs={0} lg={2} className="d-none d-lg-block"><Tags tags={tags}
                                                             searchBarToggle={searchBarToggle}
                                                             currentTags={payload.hashTags}
                                                             onClickHandler={onHashTagSearch}/></Col>
      <Col xs={12} lg={10}>
        <section {...getCollapseProps()}>
          <div className="m-2">
            <InputGroup style={{
              minWidth: "200px"
            }}>
              <FormControl
                  type="text"
                  placeholder="검색어 입력"
                  value={payload.searchText}
                  onChange={(e) => setPayload(
                      {...payload, searchText: e.target.value, hashTags: ''})}
              />
              <InputGroup.Text>
                <BsSearch/>
              </InputGroup.Text>
            </InputGroup>
          </div>
        </section>
        {
          lists.map(res =>
              <div key={res.id} className="m-2">
                <Link to={`/post/${res.id}`}
                      style={{textDecoration: 'none', color: '#0f0f0f'}}>
                  <Card>
                    <Card.Body>
                      <Card.Title style={{
                        height: '70px'
                      }} className="text-truncate">{res.subject}</Card.Title>
                      <Card.Subtitle
                          className="mb-2 text-muted">{res.hashTag.map(
                          (tags, index) => <span key={`${tags}_${index}`}
                                                 className="m-1" style={{
                            color: '#72c02c'
                          }}>#{tags}</span>)}</Card.Subtitle>
                      <div className="d-flex justify-content-end">
                        <Card.Text>
                          <Moment interval={1000}
                                  format="YYYY-MM-DD HH:MM"
                                  date={res.regDate}/>
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
          )
        }
        {
          lists.length === 0 ? <div className="m-2">
                {progress ?
                    <>
                      <ProgressBar/>
                    </> :
                    <>데이터가 존재하지 않습니다.</>}
              </div>
              : <></>
        }
        {(totalPage - 1) > payload.page && (
            <div ref={infiniteRef} className="justify-content-center">
              <h6>데이터를 읽고 있습니다.....</h6>
            </div>
        )}
      </Col>
    </Row>
  </Container>
}

export default Post;
