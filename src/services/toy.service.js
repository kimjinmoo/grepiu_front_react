import instance from "./httpClient";

// 투표 항목 조회
const fetchVote = async () => {
  const response = await instance.get('/grepiu/lab/vote');
  return response;
};

// 투포 항목을 ID로 조회한다.
const fetchVoteById = async (id) => {
  const response = await instance.get(`/grepiu/lab/vote/${id}`);
  return response;
}

// 투표를 한다.
const updateVote = async ({
    id,
    voteIndex
}) => {
  const response = await instance.post(`/grepiu/lab/vote/${id}`,{},{
    params: {
      voteIndex: voteIndex
    }
  });

  return response;
}

export default {
  fetchVote,
  fetchVoteById,
  updateVote
}
