import {Editor} from "react-draft-wysiwyg";
import React, {useEffect, useState} from "react";
import {ContentState, convertToRaw, EditorState} from "draft-js";
import {Button, ButtonGroup, Form} from "react-bootstrap";
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import {useNavigate, useParams} from "react-router-dom";
import {fetchPostDetail} from "../../../../services/service";
import AdminService from "../../../../services/admin.service"
import {HTTP_OK, HTTP_OK_ACCEPT} from "../../../../services/http.code.utils";
import {NotificationManager} from "react-notifications";

/**
 *
 * 관리자 상세 보기
 *
 * @returns {JSX.Element}
 * @constructor
 */
const PostManagementDetail = () => {

  const navigate = useNavigate();

  // path ID
  const {id} = useParams();
  const [detail, setDetail] = useState({
    subject: "",
    content: "",
    hashTag: []
  });
  const [hashTags, setHashTags] = useState([])
  // 상태
  const [editorState, setEditorState] = useState(
      EditorState.createEmpty()
  );

  // 수정
  const onModify = () => {
    // 입력항목을 가져온다.
    const editState = editorState.getCurrentContent();
    // 파라메터를 생성한다.
    let payload = {
      id: id,
      subject: detail.subject,
      hashTag: hashTags.filter(item => item.selected).map(item => item.name),
      content: draftToHtml(convertToRaw(editState))
    };
    // 업데이트 진행
    AdminService.updatePost(payload).then(res => {
      if (res.status === HTTP_OK_ACCEPT) {
        NotificationManager.success('수정 완료 되었습니다.');
      }
    })
  }

  // 상세 보기
  const fetchDetail = () => {
    fetchPostDetail({
      id
    }).then(res => {
      if (res.status === 200) {
        setDetail(res.data.post);
        // 선택된 Hash
        let selectedTag = res.data.post?.hashTag;
        // 성공시 tag를 Set 한다.
        AdminService.fetchHashTags().then(tags => {
          if (tags.status === 200) {
            // 맵을 새로 그린다.
            const obj = tags.data.map(tagObject => {
              if (selectedTag.filter(item => item === tagObject.name).length
                  > 0) {
                tagObject.selected = true;
              } else {
                tagObject.selected = false;
              }
              return tagObject;
            })
            // 가공한 객체를 Set 한다.
            setHashTags(obj);
          }
        })
      } else {
        window.alert("잘못된 호출입니다.");
        navigate(-1);
      }
    })
  }

  // 삭제
  const onDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      AdminService.deletePost({
        id
      }).then(res => {
        if (res.status === HTTP_OK) {
          NotificationManager.warning('삭제 완료 되었습니다.');
          navigate(-1);
        }
      })
    }
  }

  // 읽기
  const read = () => {
    const blocksFromHtml = htmlToDraft(detail?.content);
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

  useEffect(() => {
    // 데이터 조회
    fetchDetail(id);
  }, [id])

  useEffect(() => {
    if (detail) {
      read();
    }
  }, [detail])

  return <>
    <Form.Control
        type="text"
        id="subject"
        aria-describedby="subjectBlock"
        placeholder="제목"
        onChange={e => {
          const update = {...detail, subject: e.target.value};
          setDetail(update);
        }}
        value={detail?.subject}
    />
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      {
        hashTags?.map(tag => <Form.Check key={tag.name} inline type="checkbox"
                                         value={tag.name}
                                         onChange={onChangeHashTag}
                                         label={tag.name}
                                         checked={tag.selected}/>)
      }
    </Form.Group>
    <Editor
        localization={{
          locale: 'ko',
        }}
        editorState={editorState}
        toolbarClassName="rdw-editor-toolbar"
        wrapperClassName="home-wrapper rdw-editor-wrapper"
        editorClassName="home-editor rdw-editor-main"
        onEditorStateChange={state => setEditorState((state))}

    >
    </Editor>
    <ButtonGroup size="lg" className="mb-2">
      <Button onClick={() => navigate(-1)}>뒤로가기</Button>
      <Button onClick={onModify}>수정</Button>
      <Button onClick={onDelete}>삭제</Button>
    </ButtonGroup>
  </>
}

export default PostManagementDetail;
