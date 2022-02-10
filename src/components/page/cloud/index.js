import React, {useEffect, useState} from 'react';
import AdminService from "../../../services/admin.service"
import {
  deleteFolder,
  fetchCloud,
  newFolder,
  updateName
} from "../../../services/service";
import {Button, ButtonGroup, Col, Form, InputGroup, Row} from "react-bootstrap";
import ImageReader from "./readers/ImageReader";
import AudioReader from "./readers/AudioReader";
import FileAsSave from "./readers/FileAsSave";
import {NotificationManager} from "react-notifications";
import {useDispatch, useSelector} from "react-redux";
import {HTTP_OK} from "../../../services/http.code.utils";
import {logout} from "../../../actions/authorization";

const Cloud = () => {
  // user
  const {user: currentUser} = useSelector(state => state.authorization);
  // dispatch
  const dispatch = useDispatch();

  const [parentId, setParentId] = useState('');
  const [upperInfo, setUpperInfo] = useState({});
  // 폴더
  const [folders, setFolders] = useState([]);
  // 파일들
  const [files, setFiles] = useState([]);
  // 팝업
  const [popup, setPopup] = useState(false);
  // 파일
  const [file, setFile] = useState({});
  // 폴더명
  const [folderName, setFolderName] = useState(upperInfo.name);
  // 데이터를 읽는다.
  const fetchData = () => {
    fetchCloud({
      parentId
    }).then(res => {
      let data = res.data;
      setFolders(data.list.filter(item => item.attribute === 'D'));
      setFiles(data.list.filter(item => item.attribute === 'F'));
      setUpperInfo(data.upperInfo);
      setFolderName(data.upperInfo.name ? data.upperInfo.name : '')
    }).catch(e=>{
      // 토큰 확인
      AdminService.tokenValidation({
        token: currentUser.accessToken
      }).then(response=>{
        if(response.status === HTTP_OK) {
          if(!response.data.isValid) {
            dispatch(logout());
          }
        }
      })
      NotificationManager.warning(e.message);
    });
  }

  const onClosePopup = () => {
    setPopup(false);
  }

  // 데이터를 읽는다.
  useEffect(() => {
    fetchData();
  }, [parentId])

  const onClickListener = (file) => {
    // one click
    switch (file.attribute) {
      case "D" :
        // 폴더인경우 parentId를 변경한다.
        setParentId(parentId);
        break;
      case "F" :
        setFile(file);
        setPopup(true);
        break;
    }
  }

  function isImage(fileName) {
    return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(fileName)
  }

  function isText(fileName) {
    return (/\.(txt)$/i).test(fileName)
  }

  function isAudio(fileName) {
    return (/\.(mp3|mp4|wav)$/i).test(fileName)
  }

  // 타입에 따른 reader를 읽는다.
  const reader = () => {
    if (file) {
      if (isImage(file.name)) {
        // image
        return <ImageReader id={file.id} close={() => setPopup(false)}/>
      }
      if (isAudio(file.name)) {
        // audio
        return <AudioReader id={file.id}/>
      }
      return <FileAsSave id={file.id} fileName={file.name}/>
    }
    return <></>
  }

  // 신규 폴더 생성
  const newFolderHandler = () => {
    newFolder({
      name: "새폴더",
      parentId: parentId
    }).then(res => {
      fetchData();
    })
  }

  // 폴더 삭제
  const deleteFolderHandler = () => {
    deleteFolder({id: upperInfo.id}
    ).then(res => setParentId(upperInfo.parentId)).finally()
  }

  // 이름 변경
  const rename = () => {
    updateName({
      id: upperInfo.id,
      name: folderName
    }).then(res => {
      console.log(res);
    })
  }

  return <>
    <Form className="mb-3">
      <Row className="m-1">
        <ButtonGroup as={Col}>
          <Button onClick={newFolderHandler}>폴더생성</Button>
          <Button onClick={() => setParentId('')}>최상위</Button>
          {
            upperInfo.parentId ? <Button onClick={() => setParentId(
                    upperInfo.parentId ? upperInfo.parentId : '')}>상위로 이동</Button>
                : <></>
          }
        </ButtonGroup>
        <InputGroup as={Col}>
          <Form.Control type="text" style={{
            width: '200px'
          }} onChange={e => {
            setFolderName(e.target.value)
          }} value={folderName} disabled={folderName === ''}></Form.Control>
          <Button onClick={rename}>수정</Button>
          <Button onClick={deleteFolderHandler}>삭제</Button>
        </InputGroup>
      </Row>
    </Form>
    {
      folders.length > 0 ? <h6>#디렉토리</h6> : <></>
    }
    {
      folders.map(folder =>
          <Button key={folder.id} onClick={() => {
            setParentId(folder.id);
          }}>{folder.name}</Button>
      )
    }
    <div className="mt-3">
      {
        files.length > 0 ? <h6>#파일</h6> : <></>
      }
      {
        files.map(file => <div key={file.id}>
          <a key={file.id}
             onClick={e => onClickListener(
                 file)}>{file.name}</a>
        </div>)
      }
    </div>
    {
      popup && reader()
    }
  </>
}

export default Cloud;
