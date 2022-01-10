import axios from "axios";

//  Tags를 가져온다.
export const fetchPostTags = async () => {
  let url = 'https://conf.grepiu.com/grepiu/post/hash/statistics';

  // 데이터를 가져온다.
  const response = await axios.get(url);
  return response;
}

// 포스팅 상세 조회
export const fetchPostDetail = async ({
  id= 0
}) =>  {
  let url = `https://conf.grepiu.com/grepiu/post/${id}`;

  const response = await axios.get(url);

  return response;

}

// 포스트값을 가져온다.
export const fetchPosts = async ({
  currentPage = 0,
  filter = "",
  hashTags = [],
  size = 15
}) => {
  let url = 'https://conf.grepiu.com/grepiu/post';

  const response = await axios.get(url, {
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

