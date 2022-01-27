import {ListGroup, PageItem, Pagination} from "react-bootstrap";
import {useEffect, useState} from "react";
import {fetchPosts} from "../../../../services/service";
import {Link} from "react-router-dom";

/**
 *
 * 게시글 관리
 *
 * @param tabKey 탭키
 * @returns {JSX.Element}
 * @constructor
 */
const PostManagement = ({tabKey}) => {

  const [totalCount, setTotalCount] = useState(0);
  const [scale, setScale] = useState(10);
  const [totalPage, setTotalPage] = useState([]);
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);

  // 포스트 값 가져오기
  const fetch = () => {
    fetchPosts({
      currentPage: page,
      size: scale
    }).then(res => {
      if (res.status === 200) {
        // 총 데이터
        setTotalCount(res.data.tCount);
        // 페이지 만들기
        let totalPage = res.data.tCount / scale;
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

  useEffect(() => {
    fetch();
  }, [page, tabKey])

  return (
      <>
        <ListGroup variant="flush" as="ol">
          {
            posts.map(obj => <ListGroup.Item as="li" key={obj.id}>
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
            totalPage.map(o => <PageItem key={o} active={o === (page + 1)}
                                         onClick={() => setPage(
                                             o - 1)}>{o}</PageItem>)
          }
        </Pagination>
      </>
  );
}

export default PostManagement;
