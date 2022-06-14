import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import ReactQuill from "react-quill";
import {formats, modules} from "../../../constancs/quill_options";
import {addSupportReport} from "../../../services/firebase.service";
import {NotificationManager} from "react-notifications";

const Support = () => {

  // 제목
  const [subject, setSubject] = useState('');
  // 내용
  const [contents, setContents] = useState('');
  // 타입
  const [type, setType] = useState("1");

  // 접속
  const submit = async () => {
    await addSupportReport(subject, contents, type);
    setType("1")
    setContents('');
    setSubject('');
    NotificationManager.success('접속 완료 되었습니다.');
  }

  return <div>
    <Form.Select value={type} aria-label="선택하여 주세요"
                 onChange={e => setType(e.target.value)}
    >
      <option value="1">홈페이지 문의</option>
      <option value="2">Grep Search App 문의</option>
      <option value="3">우리어때 문의</option>
      <option value="3">한방!로또 문의</option>
    </Form.Select>
    <Form.Control
        type="text"
        id="subject"
        aria-describedby="subjectBlock"
        placeholder="제목"
        onChange={e => setSubject(e.target.value)}
        value={subject}
    />
    <Form.Text id="subject" muted>
      제목을 입력하세요
    </Form.Text>
    <ReactQuill
        theme="snow" value={contents}
        onChange={(content, delta, source, editor) => {
          setContents(content);
        }
        }
        modules={modules}
        formats={formats}
    />
    <div className="d-flex align-items-end">
      <Button className="ms-auto m-2" onClick={submit}>문의하기</Button>
    </div>
  </div>
};

export default Support;
