import Cookies from "js-cookie";
export default {
  SET_AUTH_TOKEN(state, token) {
    state.authToken = token;
    Cookies.set("AuthToken", token, { expires: 0.2 });
  },
  LOGOUT(state) {
    state.authToken = null;
    Cookies.remove("AuthToken");
  },
};
