import {fetchLottoNumberByRound} from "../../../../services/firebase.service";
import {useEffect, useRef, useState} from "react";
import {fetchLottoHistory} from "../../../../services/service";
import {Card, Container, Form, Table} from "react-bootstrap";
import {css} from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import {BounceLoader, CircleLoader} from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

/***
 *
 * 로또 통계 페이지
 *
 * @returns {JSX.Element}
 * @constructor
 */
const LottoStatistics = () => {

  // 에러
  const [error, setError] = useState(false);
  // 추출된 번호
  const [data, setData] = useState([]);
  // 조회 라운드
  const [round, setRound] = useState(0);
  // 현재 회차
  const [currentRound, setCurrentRound] = useState(0);
  // 처리중
  const [isProgress, setProgress] = useState(false)
  // 순위
  const [rank, setRank] = useState([0, 0, 0, 0, 0]);
  // 당첨 번호
  const roundNumbers = useRef([])
  // 보너스 번호
  const roundBonusNumbers = useRef(0);

  const sliderRef = useRef();

  // 최신 회차 및 당첨 번호
  const fetchRound = async (rnd) => {
    setProgress(true);
    // 최신 회차 기준 조회
    const response = await fetchLottoHistory({
      round: rnd
    }).catch(err => setError(true));
    if (response?.length > 0) {
      const info = response[0];
      // 라운드 Set
      setRound(info.round);
      // 당첨 번호 Set
      roundNumbers.current = [
        info.num_1,
        info.num_2,
        info.num_3,
        info.num_4,
        info.num_5,
        info.num_6,
      ]
      roundBonusNumbers.current = info.num_ex;
      if(rnd === null) {
        setCurrentRound(info.round);
      }
      await fetch(info.round)
    }
    setProgress(false);
  }

  // 통계
  const status = () => {
    const temRank = [0, 0, 0, 0, 0]

    data.map(o => {
      const rank = computeLotto([
        o.num1,
        o.num2,
        o.num3,
        o.num4,
        o.num5,
        o.num6
      ]);
      if (rank != 999) {
        temRank[rank - 1] += 1;
      }
    });
    // 랭킹적용
    setRank(temRank);
  }
  // 로또 계산
  const computeLotto = (arrayNumber) => {
    const lotto = new Set()
    arrayNumber.map(o => {
      if (roundNumbers.current.includes(o)) {
        lotto.add(o)
      }
    })

    // 로또 계산
    switch (lotto.size) {
      case 6:
        return 1;
      case 5:
        if (roundNumbers.current.includes(roundBonusNumbers.current)) {
          return 2;
        } else {
          return 3;
        }
      case 4:
        return 4;
      case 3:
        return 5;
      default :
        return 999
    }
  }

  // 총 생성된 번호를  추출한다.
  const fetch = async (round) => {
    const response = await fetchLottoNumberByRound(round);
    let lottoNumbers = [];
    response.map(o => {
      lottoNumbers = [...lottoNumbers, ...o.numbers];
    })
    setData(lottoNumbers)
  }

  useEffect(() => {
    status();
  }, [data])

  useEffect(() => {
    // 최초 라운드 조회
    fetchRound(null).finally();
  }, [])

  return <>
    <Container className="mt-4">
      <Form.Select aria-label="회차" value={round} onChange={e=> {
        fetchRound(e.target.value).finally();
      }}>
        {
          Array.from(Array(10), (e,i) => <option key={`round-select-${i}`} value={currentRound-i}>{currentRound-i}</option>)
        }
      </Form.Select>
      {
        isProgress ? <CircleLoader color={"#000000"} loading={isProgress}
                                   css={override} size={300}/> : <Card
            style={{width: '400'}}>
          <Card.Body>
            <Card.Title>
              <p>회차 : {round}</p>
            </Card.Title>
            <Card.Text>
              <Card.Subtitle className="mb-2 text-muted">총 생성된
                번호 {data.length}</Card.Subtitle>
              <div>1등 : {rank[0]}명</div>
              <div>2등 : {rank[1]}명</div>
              <div>3등 : {rank[2]}명</div>
              <div>4등 : {rank[3]}명</div>
              <div>5등 : {rank[4]}명</div>
            </Card.Text>
          </Card.Body>
        </Card>
      }
    </Container>
  </>
}

export default LottoStatistics;
