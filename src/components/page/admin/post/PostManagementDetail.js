import React, {useEffect, useState} from "react";
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormGroup
} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {fetchPostDetail} from "../../../../services/service";
import AdminService from "../../../../services/admin.service"
import {HTTP_OK, HTTP_OK_ACCEPT} from "../../../../services/http.code.utils";
import {NotificationManager} from "react-notifications";
import ReactQuill from "react-quill";
import {formats, modules} from "../../../../constancs/quill_options";

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
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const [hashTags, setHashTags] = useState([])

  // 수정
  const onModify = () => {
    // 파라메터를 생성한다.
    let payload = {
      id: id,
      subject: subject,
      hashTag: hashTags.filter(item => item.selected).map(item => item.name),
      content: content
    };
    // 업데이트 진행
    AdminService.updatePost(payload).then(res => {
      if (res.status === HTTP_OK_ACCEPT) {
        NotificationManager.success('수정 완료 되었습니다.');
      }
    })
  }

  // 상세 보기
  const fetchDetail = async () => {
    const response = await fetchPostDetail({
      id
    });
    if (response.status === 200) {
      const obj = {...response.data.post};
      setSubject(obj.subject);
      setContent(obj.content)
      // 선택된 Hash
      let selectedTag = obj?.hashTag;
      // 성공시 tag를 Set 한다.
      AdminService.fetchHashTags().then(tags => {
        if (tags.status === 200) {
          // 맵을 새로 그린다.
          const hash = tags.data.map(tagObject => {
            if (selectedTag.filter(item => item === tagObject.name).length
                > 0) {
              tagObject.selected = true;
            } else {
              tagObject.selected = false;
            }
            return tagObject;
          })
          // 가공한 객체를 Set 한다.
          setHashTags(hash);
        }
      })
    } else {
      window.alert("잘못된 호출입니다.");
      navigate(-1);
    }
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
    fetchDetail(id).finally();
  }, [id])

  return <>
    <FormControl
        type="text"
        id="subject"
        aria-describedby="subjectBlock"
        placeholder="제목"
        onChange={e => {
          setSubject(e.target.value);
        }}
        value={subject}
    />
    <FormGroup className="mb-3" controlId="formBasicCheckbox">
      {
        hashTags?.map(tag => <Form.Check key={tag.name} inline type="checkbox"
                                         value={tag.name}
                                         onChange={onChangeHashTag}
                                         label={tag.name}
                                         checked={tag.selected}/>)
      }
    </FormGroup>
    <ReactQuill
        theme="snow" value={content} onChange={(content, delta, source, editor)=>{
          setContent(content);
        }
    }
        modules={modules}
        formats={formats}
    />
    <div className="d-flex align-items-end">
      <ButtonGroup size="lg" className="m-2 ms-auto">
        <Button onClick={() => navigate(-1)}>뒤로가기</Button>
        <Button onClick={onModify}>수정</Button>
        <Button onClick={onDelete}>삭제</Button>
      </ButtonGroup>
    </div>
  </>
}

export default PostManagementDetail;
