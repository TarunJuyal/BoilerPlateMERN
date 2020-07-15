import React, { useEffect } from "react";
import { auth } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    console.log(user);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then(async (response) => {
        if (await !response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, [dispatch, props.history]);

    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
