import {useState} from "react";
import {readBlobCloud} from "../../../../services/service";
import {saveAs} from 'file-saver';
import {Button, ProgressBar} from "react-bootstrap";
import Rename from "../utils/Rename";

const FileAsSave = ({
  id,
  fileName
}) => {
  const [percent, setPercent] = useState(0);
  const [isProgress, setProgress] = useState(false);
  const fetchFile = () => {
    // 중복 다운로드 막음
    if (!isProgress) {
      setProgress(true);
      // 파일을 모두 다운로드 받은 후 처리한다.
      readBlobCloud(id, (evt) => {
        let percent = parseInt((evt.loaded / evt.total) * 100);
        setPercent(percent);
      }).then(res => {
        // 파일 저장
        saveAs.saveAs(res, fileName);
        // 초기화
      }).finally(() => setProgress(false));
    }

  }

  return <>
    <div>
      <Rename/>
      <Button onClick={fetchFile}>{fileName}다운로드</Button>
    </div>
    {isProgress && <ProgressBar now={percent}/>}
  </>
}

export default FileAsSave;
