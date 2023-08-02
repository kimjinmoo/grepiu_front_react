import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import AdminService from "../services/admin.service";
import {HTTP_OK} from "../services/http.code.utils";
import {logout} from "../actions/authorization";

/**
 *
 * 인증 확인
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const RequireAuth = ({
  authorize,
  children
}) => {
  const user = useSelector(state => state.authorization);
  // dispatch
  const dispatch = useDispatch();

  if(authorize) {
    // 토큰 확인
    AdminService.tokenValidation({
      token: user.user.accessToken
    }).then(response=>{
      if(response.status === HTTP_OK) {
        if(!response.data.isValid) {
          dispatch(logout());
        }
      }
    })
  }
  if (!user.isLoggedIn) {
    return <Navigate to={"/login"}/>
  }
  return children;
};

export default RequireAuth;
