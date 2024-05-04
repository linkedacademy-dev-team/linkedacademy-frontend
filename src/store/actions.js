import axios from "axios";

export default {
  async VALIDATE_USER({ commit, state }, { user }) {
    console.log(user);
    try {
      const URL = `${state.url_linked_academy}/auth/signin`;
      const encoded = btoa(`${state.userToken}:${state.passToken}`);
      console.log(user);
      console.log(encoded);
      const { data } = await axios({
        method: "POST",
        url: URL,
        headers: {
          Authorization: "Basic " + encoded,
        },
        data: user,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
