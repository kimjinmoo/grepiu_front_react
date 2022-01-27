const createUser = (
    loginResponse
) => {
  return {
    id: loginResponse.id,
    accessToken: loginResponse.accessToken,
    refreshToken: loginResponse.refreshToken,
    expiresIn: loginResponse.expiresIn,
    role: loginResponse.role
  };
}
// 내부 저장소에 저장한다.
const save = (object) => {
  localStorage.setItem("user", JSON.stringify(object));
}

// 내부 저장소에서 읽는다.
const read = () => {
  return JSON.parse(localStorage.getItem("user"))
}

const remove = () => {
  localStorage.removeItem("user");
}

export default {
  createUser,
  save,
  read,
  remove
}
