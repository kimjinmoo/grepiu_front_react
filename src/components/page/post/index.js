import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import Tags from "./Tags";
import {fetchPosts, fetchPostTags} from "../../../services/service";
import {Link} from "react-router-dom";
import useInfiniteScroll from "react-infinite-scroll-hook";

const Post = () => {

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [tags, setTags] = useState([]);
  const [lists, setLists] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  // 태그를 가져온다.
  const fetchTags = () => {
    fetchPostTags().then(res => {
      if (res.status === 200) {
        setTags(res.data);
      }
    })
  };

  // 포스트 값 가져오기
  const fetch = () => {
    fetchPosts({
      currentPage: page,
      size: 15
    }).then(res => {
      if (res.status === 200) {
        // 포스팅 총 수
        setTotalPage(res.data.tCount);
        // 리스트
        let appendList = [...lists, ...res.data.list];
        setLists(appendList);
      }
    })
  }

  // 페이지를 추가한다.
  const fetchMoreData = () => {
    setPage(page + 1);
  }

  // 무한 스클롤 대응
  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage: totalPage > lists.length,
    onLoadMore: fetchMoreData
  });

  useEffect(() => {
    // 태그 데이터
    fetchTags();
  }, [])

  useEffect(() => {
    // 리스트 데이터
    fetch();
  }, [page])

  return <Container fluid>
    <Row>
      <Col xs={0} xl={2} className="d-none d-lg-block"><Tags tags={tags}/></Col>
      <Col xs={10}>
        {
          lists.map(res =>
              <div keys={res.id}>
                <Link to={`/post/${res.id}`}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{res.subject}</Card.Title>
                      <Card.Subtitle
                          className="mb-2 text-muted">{res.hashTag.map(
                          tags => <Button>#{tags}</Button>)}</Card.Subtitle>
                      <Card.Text>
                        {res.regId}/{res.regDate}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
          )
        }
        {totalPage > lists.length && (
            <div ref={infiniteRef}>
              <h1>loading!!</h1>
            </div>
        )}
      </Col>
    </Row>
  </Container>
}

export default Post;
