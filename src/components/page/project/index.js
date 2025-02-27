import React, {useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import styled from "styled-components";
// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.div`
  .vh-60 {
    height: 60vh
  }
`;
const Proejct = () => {

  const [index, setIndex] = useState(0);

  return (<Wrapper>
    <Container>
    </Container>
  </Wrapper>)
};

export default Proejct;
