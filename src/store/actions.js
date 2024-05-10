import axios from "axios";
import Cookies from "js-cookie";
import http from "./utils/axios";
import { Toaster, toast } from "vue-sonner";
import state from "./state";

export default {
  async VALIDATE_USER({ commit, state }, { user }) {
    try {
      const URL = `${state.url_linked_academy}/auth/signin`;
      const { data } = await http.post(URL, user);
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
  async REGISTER_USER({ state, commit }, { user }) {
    try {
      const URL = `${state.url_linked_academy}/auth/signup/attendant`;
      const { data } = await http.post(URL, user);
      if (data.access_token) {
        commit("SET_AUTH_TOKEN", data.access_token);
      } else {
        toast.error("Error al registrar usuario");
      }
      return data;
    } catch (error) {
      if (error) {
        toast.error("Error al registrar usuario");
      }
      throw error;
    }
  },
  // async GET_USER({ state }) {
  //   try {
  //     const URL = `${state.url_linked_academy}/user`;
  //     const { data } = await axios({
  //       method: "GET",
  //       url: URL,
  //       headers: {
  //         Authorization: `Bearer ${state.authToken}`,
  //       },
  //     });
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  async GET_COUNTRIES({ commit, state }) {
    try {
      const URL = `${state.url_linked_academy}/locations/countries`;
      const { data } = await http.get(URL);
      commit("SET_COUNTRIES", data);
    } catch (error) {
      throw error;
    }
  },
  async GET_DEPARTMENTS({ state, commit }, country) {

    try {
      const URL = `${state.url_linked_academy}/locations/departaments/${country}`;
      const { data } = await http.get(URL);
      commit("SET_DEPARTMENTS", data);
    } catch (error) {
      throw error;
    }
  },
  async GET_CITIES({ state, commit }, departament) {
    try {
      const URL = `${state.url_linked_academy}/locations/cities/${departament}`;
      const { data } = await http.get(URL);
      commit("SET_CITIES", data);
    } catch (error) {
      throw error;
    }
  },


};
