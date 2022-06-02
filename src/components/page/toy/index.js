import React, {useState} from 'react';
import {Carousel, Container} from "react-bootstrap";
import styled from "styled-components";
import Description from "./Description";

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.div`
  .vh-60 {
    height: 60vh
  }
`;
const Toy = () => {

  const [index, setIndex] = useState(0);



  return (<Wrapper>
    <Container>
      <Carousel fade activeIndex={index} onSelect={(index, e)=>setIndex(index)}>
        <Carousel.Item className="vh-60">
          <img
              className="d-block w-100"
              src="/resources/images/store.jpg"
              alt="로또 추첨기"
          />
          <Carousel.Caption>
            <h3>로또 추첨기</h3>
            <p>재미로 하는 AI 로또 추첨기</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="vh-60">
          <img
              className="d-block w-100"
              src="/resources/images/store.jpg"
              alt="그렙플레이스"
          />
          <Carousel.Caption>
            <h3>그렙플레이스</h3>
            <p>좌표로 나만의 장소 저장, 정보 공유.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="vh-60">
          <img
              className="d-block w-100"
              src="/resources/images/woori.jpg"
              alt="우리어때"
          />

          <Carousel.Caption>
            <h3>우리어때</h3>
            <p>사진을 통한 애정도 측정앱</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="vh-60">
          <img
              className="d-block w-100"
              src="/resources/images/cinema.jpg"
              alt="크롤링 테스트"
          />
          <Carousel.Caption>
            <h3>크롤링 테스트</h3>
            <p>크롤링을 통한 근방의 영화관 및 영화 찾기</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="vh-60">
          <img
              className="d-block w-100"
              src="/resources/images/websocket.jpg"
              alt="웹소켓"
          />

          <Carousel.Caption>
            <h3>웹소켓 투표</h3>
            <p>웹소켓을 이용한 투표</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
    <Description index={index}/>
  </Wrapper>)
};

export  default Toy;
