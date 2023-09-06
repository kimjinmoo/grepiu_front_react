import {useParams} from "react-router-dom";
import {Button, Card, Col, ProgressBar, Row} from "react-bootstrap";
import ToyService from "../../../../services/toy.service";
import {useEffect, useState} from "react";

const Vote = () =>{

  let { id } = useParams();

  // 투표
  const [vote, setVote] = useState();

  const reduceVoteTotalCnt = (items) => {
    return items.reduce((a, b) => {
      return a + b.vote
    }, 0)
  }

  // 투표 리스트 불러오기
  const fetch = () => {
    ToyService.fetchVoteById(id).then(res => {
      if(res.status === 200) {
        setVote(res.data)
      }
    }).catch(err => {
      console.log(err);
    })
  }

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

  useEffect(()=>{
    fetch();
  },[id])

  return (<>
    {vote?<Card className="m-3" key={`vote_${id}`}>
      <Card.Body>
        <Card.Title>
          {`${vote.subject} 총투표 : ${reduceVoteTotalCnt(
              vote.items)}`}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {vote.contents}
        </Card.Subtitle>
        <Card.Text>
          {
            vote.items.map((i, iIndex) => {
                  const total = reduceVoteTotalCnt(vote.items);
                  return <Row key={`vote_row_${iIndex+1}`}>
                    <Col xl="3">
                      <a style={{
                        cursor: 'pointer'
                      }} onClick={() => onVote({
                        id: vote.id,
                        voteIndex: iIndex
                      })}>{i.item}(투표+)</a>
                    </Col>
                    <Col className="d-inline-block">
                      <Row>
                        <Col xl={1}>{i.vote}</Col>
                        <Col><ProgressBar now={i.vote} max={total} style={{
                          cursor: 'pointer'
                        }} onClick={() => onVote({
                          id: vote.id,
                          voteIndex: iIndex
                        })}/></Col>
                      </Row>
                    </Col>
                  </Row>
                }
            )
          }
        </Card.Text>
      </Card.Body>
    </Card>:<></>}
    </>)
}

export default Vote;
