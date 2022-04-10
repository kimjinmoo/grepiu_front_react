import {Button, Form, InputGroup} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import AdminService from "../../../../services/admin.service";
import {
  HTTP_OK_ACCEPT,
  HTTP_OK_CREATED
} from "../../../../services/http.code.utils";
import {NotificationManager} from "react-notifications";

const PostAddHashTags = () => {
  // 해시태그
  const [tags, setTags] = useState('');

  // 해시태그 데이터
  const [hashTags, setHashTags] = useState([]);

  // 삭제
  const onRemove = (name) => {
    if (window.confirm("삭제하시겠습니까?")) {
      AdminService.deleteHashTags({
        name: name
      }).then(res => {
        if (res.status === HTTP_OK_ACCEPT) {
          NotificationManager.warning('삭제 완료 되었습니다.');
          setTags('');
          fetch();
        }
      })
    }
  }

  // 등록
  const onAdd = () => {
    AdminService.addHashTags({
      name: tags
    }).then(res => {
      if (res.status === HTTP_OK_CREATED) {
        NotificationManager.success('등록 완료 되었습니다.');
        fetch();
      }
    })
  }
  const fetch = () => {
    AdminService.fetchHashTags().then(res => {
      if (res.status === 200) {
        setHashTags(res.data);
      }
    })
  }
  useEffect(() => {
    fetch();
  }, [])

  return <>
    <InputGroup className="mb-3">
      <Form.Control
          type="text"
          id="tags"
          placeholder="해시태그명"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
      />
      <Button disabled={tags.length < 1} variant="outline-secondary"
              id="button-addon1" onClick={onAdd}>
        등록
      </Button>
    </InputGroup>
    <div>
      {
        hashTags.map((tags, index) => <Button key={`tag_${index}`}
            onClick={() => onRemove(tags.name)}>{tags.name}</Button>)
      }
    </div>
  </>
}

export default PostAddHashTags;
