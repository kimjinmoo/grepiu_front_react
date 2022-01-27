import {Button, ButtonGroup, Form} from "react-bootstrap";
import {Editor} from "react-draft-wysiwyg";
import React, {useEffect, useState} from "react";
import {ContentState, convertToRaw, EditorState} from "draft-js";
import draftToHtml from "draftjs-to-html";
import {HTTP_OK, HTTP_OK_CREATED} from "../../../../services/http.code.utils";
import {NotificationManager} from "react-notifications";
import AdminService from '../../../../services/admin.service'
import htmlToDraft from "html-to-draftjs";

const PostAdd = () => {

  // 제목
  const [subject, setSubject] = useState('');
  // 에디터
  const [editorState, setEditorState] = useState(
      EditorState.createEmpty()
  );
  // 해시태그 데이터
  const [hashTags, setHashTags] = useState([]);

  // 추가
  const onAdd = () => {
    // 에디터
    const editState = editorState.getCurrentContent();
    // payload
    const payload = {
      subject,
      hashTag: hashTags.filter(item => item.selected).map(item => item.name),
      content: draftToHtml(convertToRaw(editState))
    }
    // 서버 호출
    AdminService.addPost(payload).then(res => {
      if (res.status === HTTP_OK_CREATED) {
        NotificationManager.success('등록 완료 되었습니다.');
        // 초기화
        setSubject('');
        initEditor();
        const initHashTags = [...hashTags.map(item => item.selected = false)]
        setHashTags(initHashTags);
      }
    })
  }

  // 에디터를 초기화 한다.
  const initEditor = () => {
    const blocksFromHtml = htmlToDraft('');
    if (blocksFromHtml) {
      const {contentBlocks, entityMap} = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks,
          entityMap);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }

  // tag를 처리한다.
  const onChangeHashTag = e => {
    const tags = [...hashTags];
    const index = tags.findIndex(item => item.name === e.target.value);
    // 체크박스를 변경한다.
    tags[index].selected = e.target.checked
    setHashTags(tags);
  }

  const fetch = () => {
    AdminService.fetchHashTags().then(res => {
      if (res.status === HTTP_OK) {
        const tags = res.data.map(tagObject => {
          tagObject.selected = false;
          return tagObject;
        });
        setHashTags(tags);
      }
    })
  }
  useEffect(() => {
    fetch();
  }, [])

  return (<div>
    <Form.Control
        type="text"
        id="subject"
        placeholder="제목"
        value={subject}
        onChange={e => setSubject(e.target.value)}
    />
    <div><h6># 태그 선택</h6></div>
    <div>
      {
        hashTags.map(tags => <Form.Check
            inline
            key={tags.name}
            type='checkbox'
            id={`default-check`}
            label={tags.name}
            value={tags.name}
            onChange={onChangeHashTag}
        />)
      }
    </div>

    <Editor
        localization={{
          locale: 'ko',
        }}
        editorState={editorState}
        toolbarClassName="rdw-editor-toolbar"
        wrapperClassName="home-wrapper rdw-editor-wrapper"
        editorClassName="home-editor rdw-editor-main"
        onEditorStateChange={state => setEditorState(state)}

    />
    <ButtonGroup size="lg" className="mb-2">
      <Button onClick={onAdd}>등록</Button>
    </ButtonGroup>
  </div>);
}

export default PostAdd;
