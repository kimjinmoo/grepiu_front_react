import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {increseCount} from "../../../reducers/counter";

const Home = () => {
  const dispatch = useDispatch();

  const { count } = useSelector(state => state.counter);

  const increse = () => {
    // store에 있는 state 바꾸는 함수 실행
    dispatch(increseCount());
  };

  return  <>
    <div>
      <Container fluid>
        {count}
        <button onClick={increse}>증가</button>
        <div>
          <div className="text-center p-4">
            <h2 data-aos="fade-right"># 하는것들</h2>
          </div>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>포스팅</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">개발/일상/쓰고싶은거</Card.Subtitle>
                  <Card.Text>
                    <p>
                      - 분류는 Tag로 구분, Tag 분류 보기 가능, 반응형<br/>
                      - MongoDB 사용<br/>
                      - 검색 기능(대소문자 가림)<br/>
                      - 자동 스크롤 펴짐<br/>
                    </p>
                  </Card.Text>
                  <Card.Link href="/post">보러가기</Card.Link>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>집창고</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">이것저것 해보고 싶은 것들</Card.Subtitle>
                  <Card.Text>
                    <p>
                      - 크롤링 구현, 현 위치 기준 근처 영화관 찾기(with Google Map)<br/>
                      - 롯데 시내마 상영 영화/상영시간 크롤링<br/>
                      - Selenium 이용하여 구연<br/>
                      - 프럭시 서버로 크롤링해야됨(aws 접근문제)<br/>
                    </p>
                  </Card.Text>
                  <Card.Link href="/lab">보러가기</Card.Link>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>웹폴더</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">개인 저장함(로그인필요)</Card.Subtitle>
                  <Card.Text>
                    <p>
                      - HTML5를 통한 파일 제어<br/>
                      - Web을 통한 자료 공유<br/>
                      - 음악 및 Text 읽기<br/>
                      - 추후 S3로 변경해서 저장 해볼 예정<br/>
                    </p>
                  </Card.Text>
                  <Card.Link href="/cloud">보러가기</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
      <Container fluid>
        <img src="/resources/images/post.png" alt="images"/>
        <Row>
          <Col>
            <h2>#</h2>
          </Col>
        </Row>
        <Row>
          <Col sm>
            <h3>Server</h3>
            <h6>Java</h6>
            <h6>Python</h6>
            <h6>Node</h6>
            <h6>Ehcache</h6>
          </Col>
          <Col sm>
            <h3>Front</h3>
            <h6>Vue</h6>
            <h6>React</h6>
            <h6>Javascript</h6>
            <h6>freemarker</h6>
          </Col>
          <Col sm>
            <h3>Authorization</h3>
            <h6>SpringBoot Oauth2</h6>
            <h6>Spring Security</h6>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>데이터</h3>
            <h6>Kafka</h6>
            <h6>엘라스틱서치</h6>
            <h6>fluentd</h6>
            <h6>logstash</h6>
          </Col>
          <Col>
            <h3>ETC</h3>
            <h6>Flutter</h6>
            <h6>Android</h6>
            <h6>RDB/NOSQL</h6>
          </Col>
          <Col>
            <h3>OS</h3>
            <h6>rockey</h6>
            <h6>centos</h6>
            <h6>Apache</h6>
            <h6>Nginx</h6>
          </Col>
        </Row>
      </Container>
    </div>
  </>
}

export default Home;
