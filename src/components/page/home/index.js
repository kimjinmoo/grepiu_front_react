import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import styled from "styled-components";

const Wrapper = styled.div`
  #hello {
    font-size: 10vw;
    background: -webkit-linear-gradient(#00DFD8, #007CF0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Home = () => {

  return <Wrapper>
    <div>
      <Container>
        <div className="text-center">
          <h2 data-aos="fade-right">#ERROR #FAIL</h2>
        </div>
        <div className="text-center">
          <p id="hello">
            HELLO
          </p>
          <p id="hello">
            WORLD
          </p>
        </div>
      </Container>
      <Container>
        <div>
          <div className="text-center p-4">
            <h2 data-aos="fade-right"># My</h2>
          </div>
          <Row>
            <Col lg={4}>
              <Card>
                <Card.Body style={{
                  height: '250px'
                }}>
                  <Card.Title>포스팅</Card.Title>
                  <Card.Subtitle
                      className="mb-2 text-muted">개발/일상/쓰고싶은거</Card.Subtitle>
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
            <Col lg={4}>
              <Card>
                <Card.Body style={{
                  height: '250px'
                }}>
                  <Card.Title>토이프로젝트</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">이것저것 해보고 싶은
                    것들</Card.Subtitle>
                  <Card.Text>
                    <p>
                      - 토이프로젝트 앱들<br/>
                      - 실시간 투표<br/>
                      - 크롤링 테스트<br/>
                      - 토이프로젝트 슬랙 채널<br/>
                    </p>
                  </Card.Text>
                  <Card.Link href="/toy">보러가기</Card.Link>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card>
                <Card.Body style={{
                  height: '250px'
                }}>
                  <Card.Title>웹폴더</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">개인
                    저장함(로그인필요)</Card.Subtitle>
                  <Card.Text>
                    <p>
                      - HTML5를 통한 파일 제어<br/>
                      - Web을 통한 자료 공유<br/>
                      - 음악 및 Text 읽기<br/>
                      - AWS S3사용<br/>
                    </p>
                  </Card.Text>
                  <Card.Link href="/cloud">보러가기</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
      <Container className="mt-3" style={{
        backgroundColor: "#32383e",
        color: "#f0f0f0"
      }}>
        <div className="w-auto p-3">
          <Row className="text-center">
            <Col lg={4}>
              <h3>Server</h3>
              <h6>Java</h6>
              <h6>Node</h6>
              <h6>Python</h6>
              <h6>Ehcache</h6>
            </Col>
            <Col lg={4}>
              <h3>Front</h3>
              <h6>Vue</h6>
              <h6>React</h6>
              <h6>freemarker</h6>
            </Col>
            <Col lg={4}>
              <h3>Authorization</h3>
              <h6>SpringBoot Oauth2</h6>
              <h6>Spring Security</h6>
            </Col>
          </Row>
          <Row className="text-center mt-2">
            <Col lg={4}>
              <h3>데이터</h3>
              <h6>Kafka</h6>
              <h6>엘라스틱서치</h6>
              <h6>fluentd</h6>
              <h6>logstash</h6>
            </Col>
            <Col lg={4}>
              <h3>ETC</h3>
              <h6>Flutter</h6>
              <h6>Android</h6>
              <h6>RDB/NOSQL</h6>
            </Col>
            <Col lg={4}>
              <h3>OS</h3>
              <h6>rockey</h6>
              <h6>centos</h6>
              <h6>Apache</h6>
              <h6>Nginx</h6>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  </Wrapper>
}

export default Home;
