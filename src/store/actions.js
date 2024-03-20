import axios from "axios";

export default {

  async VALIDATE_USER({ commit }, user) {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/validate", user);
      commit("SET_USER", response.data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
};
