import axios from "axios";
import Cookies from "js-cookie";
import { Toaster, toast } from "vue-sonner";

export default {
  async VALIDATE_USER({ commit, state }, { user }) {
    try {
      const URL = `${state.url_linked_academy}/auth/signin`;
      const encoded = btoa(`${state.userToken}:${state.passToken}`);
      console.log(encoded);
      const { data } = await axios({
        method: "POST",
        url: URL,
        headers: {
          Authorization: "Basic " + encoded,
        },
        data: user,
      });
      if (data.access_token) {
        commit("SET_AUTH_TOKEN", data.access_token);
      } else {
        toast.error("Creedenciales incorrectas");
      }
      return data;
    } catch (error) {
      toast.error("Error al iniciar sesión");
      throw error;
    }
  },
  async LOGOUT({ commit }) {
    commit("LOGOUT");
  },
};
