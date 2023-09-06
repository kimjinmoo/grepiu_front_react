import {
  Button, Card, Col,
  Container,
  Form,
  FormControl,
  InputGroup, ProgressBar, Row
} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import ToyService from '../../../../services/toy.service'
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

const Vote = () => {

  // 주제
  const [subject, setSubject] = useState('');
  // 내용
  const [description, setDescription] = useState('');
  // input 박스
  const [inputs, setInputs] = useState([]);
  // 투표
  const [vote, setVote] = useState([]);

  const client = useRef(null);

  // 투표
  const fetch = () => {
    ToyService.fetchVote().then(res => {
      setVote(res.data)
    })
  }

  // 투표를 한다.
  const onVote = ({
    id, voteIndex
  }) => {
    ToyService.updateVote({
      id,
      voteIndex
    }).finally(() => {
      fetch();
    })
  }

  // input삭제
  const removeHandler = (key) => {
    const data = [...inputs].filter(item => item.id !== key);
    // re-index
    setInputs(data.map((item, index) => {
      item.id = index;
      return item;
    }));
  }

  // 투표 항목을 추가한다.
  const addHandler = (key) => {
    let inputData = [...inputs];
    inputData.push({
      id: key,
      contents: ''
    });
    setInputs(inputData);
  }

  // 총 카운트롤 계산한다.
  const reduceVoteTotalCnt = (items) => {
    return items.reduce((a, b) => {
      return a + b.vote
    }, 0)
  }

  // input를 수정이벤트 처리
  const onChangeHandler = (key, contents) => {
    const data = [...inputs];
    const modifyIndex = data.findIndex(item => item.id === key);
    data[modifyIndex].contents = contents;
    setInputs(data);
  }

  // websocket 초기화
  const initWs = () => {
    client.current = new StompJs.Client({
      brokerURL: "wss://conf.grepiu.com/ws",
      debug: function (str) {
        // console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    client.current.webSocketFactory = function () {
      return new SockJS('https://conf.grepiu.com/ws');
    }
    client.current.onConnect = function (frame) {
      client.current.subscribe("/topic/vote", (tick) => {
        fetch();
      })
    }
    client.current.onStompError = function (error) {
      console.log(error);
    }
    client.current.onDisconnect = function (msg) {
      console.log("disconnect");
    }
    client.current.activate();
  }

  useEffect(()=>{
    fetch();
  },[])
  useEffect(() => {
    initWs();
    return () => {
      if(client.current?.status) {
        client.current.disconnect();
      }
    }
  }, [client])

  return <Container>
    <h3>*자신의 ID를 잘 보관하여 주세요. 리스트에는 max 10개까지만 나옵니다.</h3>
    <hr/>
    <Form.Label htmlFor="subject">주제</Form.Label>
    <InputGroup className="mb-3">
      <FormControl
          id="subject"
          placeholder="투표 주제를 입력해주세요."
          aria-label="투표 주제를 입력해주세요."
          value={subject}
          aria-autocomplete={"none"}
          autoComplete="off"
          onChange={e => setSubject(e.target.value)}
      />
    </InputGroup>
    <Form.Label>투표 내용을 작성해주세요.</Form.Label>
    <InputGroup className="mb-3">
      <FormControl
          id="description"
          placeholder="투표 내용을 입력해주세요."
          aria-label="투표 내용을 입력해주세요."
          value={description}
          aria-autocomplete={"none"}
          autoComplete="off"
          onChange={e => setDescription(e.target.value)}
      />
    </InputGroup>
    <Form.Label htmlFor="description">투표 항목 [+] 눌러 작성해주세요.</Form.Label>
    <InputGroup>
      <Button onClick={() => addHandler(inputs.length + 1)}>+</Button>
    </InputGroup>
    {
      inputs.map(item => <InputGroup className="mb-3" key={item.id}>
        <FormControl
            placeholder="항목을 입력하세요"
            value={item.contents}
            onChange={e => onChangeHandler(item.id, e.target.value)}
        />
        <Button variant="outline-secondary" id="delete"
                onClick={() => removeHandler(item.id)}> -
        </Button>
      </InputGroup>)
    }
    <hr/>
    {
      vote.map((item, index) =>
          <>
            <Card className="m-3" key={`vote_${index+1}`}>
              <Card.Body>
                <Card.Title>{`${item.subject} 총투표 : ${reduceVoteTotalCnt(
                    item.items)}`}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {item.contents}
                </Card.Subtitle>
                <Card.Text>
                  {
                    item.items.map((i, iIndex) => {
                          const total = reduceVoteTotalCnt(item.items);
                          return <Row key={`vote_row_${iIndex+1}`}>
                            <Col xl="3">
                              <a style={{
                                cursor: 'pointer'
                              }} onClick={() => onVote({
                                id: item.id,
                                voteIndex: iIndex
                              })}>{i.item}(투표+)</a>
                            </Col>
                            <Col className="d-inline-block">
                              <Row>
                                <Col xl={1}>{i.vote}</Col>
                                <Col><ProgressBar now={i.vote} max={total} style={{
                                  cursor: 'pointer'
                                }} onClick={() => onVote({
                                  id: item.id,
                                  voteIndex: iIndex
                                })}/></Col>
                              </Row>
                            </Col>
                          </Row>
                        }
                    )
                  }
                </Card.Text>
                <Button variant="outline-secondary">클립보드 복사</Button>
              </Card.Body>
            </Card>
          </>
      )
    }
  </Container>
}
export default Vote;
