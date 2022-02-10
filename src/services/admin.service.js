import instance from "./httpClient";

// 토큰 유효성 체크
const tokenValidation = async ({
    token
}) => {
  const response = await instance.get('/oauth/check', {
    params: {
      accessToken: token
    }
  });

  return response;
}

// 포스트 추가
const addPost = async ({
  subject,
  hashTag,
  content
}) => {
  const response = await instance.post('/grepiu/post', {
    subject,
    hashTag,
    content
  })

  return response;
}
// 포스팅 업데이트
const updatePost = async ({
      id,
      subject,
      hashTag,
      content
    }
) => {
  const response = await instance.put(`/grepiu/post/${id}`, {
    subject: subject,
    hashTag: hashTag,
    content: content
  });
  return response;
}

// 포스트 삭제
const deletePost = async ({
  id
}) => {
  const response = await instance.delete(`/grepiu/post/${id}`);

  return response;
}

// 해시태그를 가져온다.
const fetchHashTags = async () => {
  const response = await instance.get('/grepiu/post/hash');
  return response;
}

// 해시태그를 등록한다.
const addHashTags = async ({
  name
}) => {
  const response = await instance.post('/grepiu/post/hash/', {
    name: name
  });

  return response;
}

// 해시태그를 삭제한다.
const deleteHashTags = async ({
  name
}) => {
  const response = await instance.delete(`/grepiu/post/hash/${name}`);
  return response;
}

export default {
  tokenValidation,
  deleteHashTags,
  addHashTags,
  fetchHashTags,
  addPost,
  updatePost,
  deletePost
}
