import {collection, getDocs, getFirestore, query, where} from "firebase/firestore/lite";
import {lottoFirebase} from "../constancs/firebase";


const lottoDB = getFirestore(lottoFirebase);

/**
 *
 * 데이터를 가져온다.
 *
 * @param round 횟차
 * @returns {Promise<DocumentData[]>}
 */
export const fetchLottoNumberByRound = async  (round) => {
  const lottoNumbers = query(collection(lottoDB, 'lotto'), where("round","==" ,round));
  const lottoSnapshot = await getDocs(lottoNumbers);
  const obj = lottoSnapshot.docs.map(doc => doc.data());
  return obj;
}
