import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import {
  fetchLottoNumberCount,
  fetchUserCount
} from "../../../../services/firebase.service";

/***
 *
 * 로또 통계 페이지
 *
 * @returns {JSX.Element}
 * @constructor
 */
const LottoTotalStatistics = () => {

  const [totalCount, setTotalCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  /**
   *
   * 번호 생성 카운트
   *
   */
  const fetchNumber = () => {
    fetchLottoNumberCount().then(count => setTotalCount(count));
  }

  const fetchUsers = () => {
    fetchUserCount().then(count => setUserCount(count));
  }

  useEffect(() => {
    fetchNumber();
    fetchUsers();
  }, [])

  return <>
    <Container className="mt-5">
      <h5>지금까지 총 생성된 번호</h5>
      <div>{totalCount}</div>
      <hr/>
      <h5>생성된 유저수</h5>
      <div>{userCount}</div>
      <hr/>
    </Container>

  </>
}

export default LottoTotalStatistics;
