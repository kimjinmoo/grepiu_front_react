import React from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

/**
 *
 * 인증 확인
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const RequireAuth = ({
  children
}) => {
  const user = useSelector(state => state.authorization);
  if (!user.isLoggedIn) {
    return <Navigate to={"/login"}/>
  }
  return children;
};

export default RequireAuth;
