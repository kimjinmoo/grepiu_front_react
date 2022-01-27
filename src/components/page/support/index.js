import React, {useState} from 'react';
import {EditorState} from 'draft-js';
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {Button, Form} from "react-bootstrap";

const Support = () => {
  const [editorState, setEditorState] = useState(
      EditorState.createEmpty()
  );

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
    />
    <Form.Text id="subject" muted>
      제목을 입력하세요
    </Form.Text>
    <Editor
        editorState={editorState}
        toolbarClassName="rdw-editor-toolbar"
        wrapperClassName="home-wrapper rdw-editor-wrapper"
        editorClassName="home-editor rdw-editor-main"
        onEditorStateChange={state => setEditorState((state))}

    />
    <div className="d-flex align-items-end">
      <Button className="ms-auto">문의하기</Button>
    </div>
  </div>
};

export default Support;
