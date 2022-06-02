import {fetchLottoNumberByRound} from "../../../../services/firebase.service";
import {useEffect, useRef, useState} from "react";
import {fetchLottoHistory} from "../../../../services/service";
import {Card, Container} from "react-bootstrap";
import Slider from "react-slick";
import {BiLeftArrow, BiRightArrow} from "react-icons/bi";

/***
 *
 * 로또 통계 페이지
 *
 * @returns {JSX.Element}
 * @constructor
 */
const LottoStatistics = () => {

  // 추출된 번호
  const [data, setData] = useState([]);
  // 조회 라운드
  const [round, setRound] = useState(null);
  // 순위
  const [rank, setRank] = useState([0, 0, 0, 0, 0]);
  // 당첨 번호
  const roundNumbers = useRef([])
  // 보너스 번호
  const roundBonusNumbers = useRef(0);
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
  const fetch = (round) => {
    fetchLottoNumberByRound(round).then(res => {
      let lottoNumbers = [];
      res.map(o => {
        lottoNumbers = [...lottoNumbers, ...o.numbers];
      })
      setData(lottoNumbers)
    });
  }

  useEffect(() => {
    status();
  }, [data])

  useEffect(() => {
    // 최신 회차 기준 조회
    fetchLottoHistory({
      round
    }).then(res => {
      if (res.length > 0) {
        const info = res[0];
        setRound(info.round);
        roundNumbers.current = [
          info.num_1,
          info.num_2,
          info.num_3,
          info.num_4,
          info.num_5,
          info.num_6,
        ]
        roundBonusNumbers.current = info.num_ex;
        fetch(round)
      }
    }).catch(err=>{
      roundNumbers.current = [0,0,0,0,0,0];
      roundBonusNumbers.current = 0;
      fetch(round);
      console.log("skip")
    });
  }, [round])

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    onSwipe: (current) => {
      switch (current) {
        case "right":
          if(round > 1) {
            setRound(round-1);
          }
          break;
        case "left":
          setRound(round+1);
          break;
      }
    },
    nextArrow: <BiLeftArrow />,
    prevArrow: <BiLeftArrow />
  };

  return <>
    <Container>
      <Slider {...settings}>
        <Card style={{width: '400'}}>
          <Card.Body>
            <Card.Title><p>회차 : {round ? round : "reading.."}</p></Card.Title>
            <Card.Text>
              <Card.Subtitle className="mb-2 text-muted">총 생성된 번호 {data.length}</Card.Subtitle>
              <div>1등 : {rank[0]}명</div>
              <div>2등 : {rank[1]}명</div>
              <div>3등 : {rank[2]}명</div>
              <div>4등 : {rank[3]}명</div>
              <div>5등 : {rank[4]}명</div>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{width: '400'}}>
          <Card.Body>
            <Card.Title><p>회차 : {round ? round : "reading.."}</p></Card.Title>
            <Card.Text>
              <Card.Subtitle className="mb-2 text-muted">총 생성된 번호 {data.length}</Card.Subtitle>
              <div>1등 : {rank[0]}명</div>
              <div>2등 : {rank[1]}명</div>
              <div>3등 : {rank[2]}명</div>
              <div>4등 : {rank[3]}명</div>
              <div>5등 : {rank[4]}명</div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Slider>
    </Container>

  </>
}

export default LottoStatistics;
