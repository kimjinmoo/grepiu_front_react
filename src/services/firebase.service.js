import {collection, addDoc, getDocs, getFirestore, query, where} from "firebase/firestore/lite";
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

/**
 *
 * 문의하기
 *
 * @param subject 제목
 * @param contents 내용
 * @param type 타입
 * @returns {Promise<void>}
 */
export const addSupportReport = async (subject, contents, type) => {
  try {
    const docRef = await addDoc(collection(lottoDB, "help-service"), {
      subject: subject,
      contents: contents,
      type: type
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

