import { signup, login } from "../services/authService";

export async function signupUser(dispatch, payload) {
    
}

export async function loginUser(dispatch, payload) {
  dispatch({ type: "REQUEST_LOGIN" });
  let data = null;
  await login(payload)
    .then((res) => {
      console.log("MAGLOG:: login->> ", res);
      if (res.status == 200) {
        data = {
          user: {
            id: res.data.id,
            username: res.data.username,
            email: res.data.email,
          },
          auth_token: res.data.token,
        };
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        localStorage.setItem("currentUser", JSON.stringify(data));
      } else {
        dispatch({ type: "LOGIN_ERROR", error: res.data.errors[0] });
        return;
      }
    })
    .catch((err) => {
      console.log("Error: ", err.response);
      dispatch({ type: "LOGIN_ERROR", error: err.response.data.errors[0] });
      return;
    });

    return data;
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
