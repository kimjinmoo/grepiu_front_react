import React, {useState} from 'react';
import {Carousel, Col, Container, Image, Row} from "react-bootstrap";
import styled from "styled-components";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import s01 from './s01.png';
import s02 from './s02.png';
import s03 from './s03.png';
import s04 from './s04.png';

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.div`
  .carousel-item {
    text-align: center;
  }
  a {
    text-decoration:none;
  }
  a:link {
    color: black;
  }

  /* visited link */
  a:visited {
    color: black;
  }

  /* mouse over link */
  a:hover {
    color: crimson;
  }

  /* selected link */
  a:active {
    color: black;
  }
  .vh-65 {
    height: 65vh
  }
  .row {
    display: flex;
    align-items: center;
  }
`;
const Sign = () => {
  const [index, setIndex] = useState(0);

  return (<Wrapper>
    <Container className="mt-3" style={{
      borderRadius: "20px 20px 20px 20px",
      backgroundColor: "#ecf0f1"
    }}>
      <div className="h-100">
        <Row className="row" style={{height: 500}}>
          <Col sx={4}>
            <div style={{
              textAlign: "center"
            }}>
              <div>간편한 전자 서명이 필요하시다면..</div>
              <span style={{
                fontWeight: "bold",
                fontSize: "20px"
              }}><a href="https://gsapi-s3.s3.ap-northeast-2.amazonaws.com/sign/sign-1.0.0.apk" download>다운로드(1.0.0)</a></span>
              <span className="m-3"></span>
              <span style={{
                fontWeight: "bold",
                fontSize: "20px"
              }}><a href="https://smartstore.naver.com/bikehs/products/11475195834" target="_blank">구매하기</a></span>
              <div className="mt-2" style={{
                fontWeight: "bold",
                fontSize: "10px"
              }}>*Android 8 이상, 12 이상 권장
              </div>
            </div>
          </Col>
          <Col sx={8} className="d-none d-md-block" style={{
            textAlign: "center"
          }}>
            <div style={{
              width: 800, height: 400
            }}>
              <Slide>
                <div>
                  <div className="text-center">
                    <Image src={s01} height={400}/>
                  </div>
                </div>
                <div>
                  <div className="text-center">
                    <Image src={s02} height={400}/>
                  </div>
                </div>
                <div>
                  <div className="text-center">
                    <Image src={s03} height={400}/>
                  </div>
                </div>
                <div>
                  <div className="text-center">
                    <Image src={s04} height={400}/>
                  </div>
                </div>
              </Slide>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  </Wrapper>)
};

export default Sign;
