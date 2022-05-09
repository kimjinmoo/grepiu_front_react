import {Button, ButtonGroup, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {HTTP_OK, HTTP_OK_CREATED} from "../../../../services/http.code.utils";
import {NotificationManager} from "react-notifications";
import AdminService from '../../../../services/admin.service'
import ReactQuill from "react-quill";
import {formats, modules} from "../../../../constancs/quill_options";

const PostAdd = () => {
  // 제목
  const [subject, setSubject] = useState('');
  // 해시태그 데이터
  const [hashTags, setHashTags] = useState([]);
  // 데이터
  const [content, setContent] = useState('');

  // 추가
  const onAdd = () => {
    // payload
    const payload = {
      subject,
      hashTag: hashTags.filter(item => item.selected).map(item => item.name),
      content: content
    }
    // 서버 호출
    AdminService.addPost(payload).then(res => {
      if (res.status === HTTP_OK_CREATED) {
        NotificationManager.success('등록 완료 되었습니다.');

      }
    }).finally(()=>{
      // 초기화
      setSubject('');
      const initHashTags = [...hashTags.map(item => item.selected = false)]
      setHashTags(initHashTags);
    })
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

  return <div>
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
    <div className="mb-2" style={{
      position:'relative'
    }}>
      <ReactQuill
          className="ql-editor-h50"
          theme="snow" value={content} onChange={setContent}
          modules={modules}
          formats={formats}
      />
    </div>
    <div className="d-flex align-items-end">
      <ButtonGroup size="lg" className="m-2 ms-auto">
        <Button onClick={onAdd}>등록</Button>
      </ButtonGroup>
    </div>
  </div>
}

export default PostAdd;
