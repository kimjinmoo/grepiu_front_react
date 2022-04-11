import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import ReactQuill from "react-quill";
import {
  formats,
  supportModules
} from "../../../constancs/quill_options";

const Support = () => {

  // 제목
  const [subject, setSubject] = useState();
  // 내용
  const [content, setContent] = useState();

  return <div>
    <Form.Select aria-label="선택하여 주세요">
      <option value="1">홈페이지 문의</option>
      <option value="2">Grep Search App 문의</option>
      <option value="3">우리어때 문의</option>
    </Form.Select>
    <Form.Control
        type="text"
        id="subject"
        aria-describedby="subjectBlock"
        placeholder="제목"
        value={subject}
    />
    <Form.Text id="subject" muted>
      제목을 입력하세요
    </Form.Text>
    <ReactQuill
        theme="snow" value={content} onChange={setContent}
        modules={supportModules}
        formats={formats}
    />
    <div className="d-flex align-items-end">
      <Button className="ms-auto m-2">문의하기</Button>
    </div>
  </div>
};

export default Support;
