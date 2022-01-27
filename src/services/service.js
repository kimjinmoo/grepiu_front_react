import instance from "./httpClient"

//  Tags를 가져온다.
export const fetchPostTags = async () => {
  // 데이터를 가져온다.
  const response = await instance.get("/grepiu/post/hash/statistics");
  return response;
}

// 포스팅 상세 조회
export const fetchPostDetail = async ({
  id = 0
}) => {
  const response = await instance.get(`/grepiu/post/${id}`);
  return response;
}

// 포스트값을 가져온다.
export const fetchPosts = async ({
  currentPage = 0,
  filter = "",
  hashTags = [],
  size = 15
}) => {
  const response = await instance.get('/grepiu/post', {
        params: {
          currentPage,
          filter,
          hashTags,
          size
        }
      }
  )

  return response;
}

// 클라우드 경로를 조회 한다.
export const fetchCloud = async ({
  parentId
}) => {
  const response = await instance.get(`/grepiu/cloud/?parentId=${parentId}`, {
    headers: {
      'Authorization': `Bearer 9757878f-c789-4421-8af1-a5be9f8373cb`
    }
  })

  return response.data
}

// 클라우드 파일 읽기
export const readBlobCloud = async (id, setPercent = (evt) => {
}) => {
  return instance.get(`/grepiu/cloud/${id}`, {
    responseType: 'blob', headers: {
      'Authorization': `Bearer 9757878f-c789-4421-8af1-a5be9f8373cb`
    },
    onDownloadProgress: setPercent
  }).then((response) => response.data).catch(e => {
    alert(e);
  })
}

// 클라우드 파일명 수정
export const updateName = async ({id, name}) => {
  return instance.put(`/grepiu/cloud/${id}`, {
    rename: name
  }, {
    headers: {
      'Authorization': `Bearer 9757878f-c789-4421-8af1-a5be9f8373cb`
    }
  }).then(res => res.data)
}

// 폴더 생성
export const newFolder = async ({
  name,
  parentId
}) => {
  let formData = new FormData();
  formData.append('cloudAttributeType', "DIRECTORY");
  formData.append('name', name);
  formData.append("parentId", parentId);

  const response = await instance.post('/grepiu/cloud/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer 9757878f-c789-4421-8af1-a5be9f8373cb`
    }
  });
  return response;
}

// 폴더 삭제
export const deleteFolder = async ({
  id
}) => {
  return instance.delete(`/grepiu/cloud/${id}`, {
    headers: {
      'Authorization': `Bearer 9757878f-c789-4421-8af1-a5be9f8373cb`
    }
  }).then(res => res.data)
}
