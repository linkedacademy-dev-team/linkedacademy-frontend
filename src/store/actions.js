import axios from "axios";
import Cookies from "js-cookie";
import { Toaster, toast } from "vue-sonner";
import state from "./state";

const encoded = btoa(`${state.userToken}:${state.passToken}`);

export default {
  async VALIDATE_USER({ commit, state }, { user }) {
    try {
      const URL = `${state.url_linked_academy}/auth/signin`;
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
  async REGISTER_USER({ state }, { user }) {
    try {
      const URL = `${state.url_linked_academy}/auth/signup`;
      const encoded = btoa(`${state.userToken}:${state.passToken}`);
      const { data } = await axios({
        method: "POST",
        url: URL,
        headers: {
          Authorization: "Basic " + encoded,
        },
        data: user,
      });
      return data;
    } catch (error) {
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
      const { data } = await axios({
        method: "GET",
        url: URL,
        headers: {
          Authorization: "Basic " + encoded,
        },
      });
      commit("SET_COUNTRIES", data);
    } catch (error) {
      throw error;
    }
  },
  async GET_DEPARTMENTS({ state, commit }, country) {
    console.log(country);
    try {
      const URL = `${state.url_linked_academy}/locations/departaments/${country}`;
      const { data } = await axios({
        method: "GET",
        url: URL,
        headers: {
          Authorization: "Basic " + encoded,
        },
      });

      console.log(URL);
      console.log(data);
      commit("SET_DEPARTMENTS", data);
    } catch (error) {
      throw error;
    }
  },
  async GET_CITIES({ state, commit }, departament) {
    console.log(departament);
    try {
      const URL = `${state.url_linked_academy}/locations/cities/${departament}`;
      const { data } = await axios({
        method: "GET",
        url: URL,
        headers: {
          Authorization: "Basic " + encoded,
        },
      });
      console.log(URL );
      console.log(data);
      commit("SET_CITIES", data);
    } catch (error) {
      throw error;
    }
  },
};
