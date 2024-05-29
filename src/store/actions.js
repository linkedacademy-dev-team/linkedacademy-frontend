import axios from "axios";
import Cookies from "js-cookie";
import http from "./utils/axios";
import { privateHttp } from "./utils/axios";
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
  async GET_USER({ state, commit, dispatch }) {
    try {
      const URL = `${state.url_linked_academy}/users/profile`;
      const { data } = await privateHttp.get(URL);
      commit("SET_USER_DATA", data);
      dispatch("GET_ROLE", data.id);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async GET_ROLE({ state, commit }, user) {
    try {
      const URL = `${state.url_linked_academy}/roles/user/${user}`;
      const { data } = await privateHttp.get(URL);
      console.log(data);
      commit("SET_ROLE", data[0].role);
      return data;
    } catch (error) {
      throw error;
    }
  },

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
  async GET_SCHOOLS({ state, commit }) {
    try {
      const URL = `${state.url_linked_academy}/schools`;
      const { data } = await http.get(URL, {
        params: {
          cityId: 1070,
          distance: 4.3,
          coordinates: [4.116174, -73.609126],
        },
      });

      data.schools.forEach((school) => {
        const match = school.coordinates.match(
          /POINT\(([\d\.\-]+) ([\d\.\-]+)\)/
        );
        if (match) {
          const latitude = parseFloat(match[1]);
          const longitude = parseFloat(match[2]);
          school.coordinates = [latitude, longitude];
        }
      });
      commit("SET_SCHOOLS", data);

      return data;
    } catch (error) {
      throw error;
    }
  },
  async UPDATE_SCHOOLS_FILTERS({ state, commit }, { filters }) {
    const filterData = {
      cityId: 1070,
      distance: filters.range ? filters.range : 4.3,
      coordinates: [4.116174, -73.609126],
      zone: filters.zone ? filters.zone.zone : null,
      schedule: filters.schedule ? filters.schedule.schedule : null,
      gender: filters.genderofSchool
        ? filters.genderofSchool.genderofSchool
        : null,
      type: filters.type ? filters.type.type : null,
      studentPerClass: filters.studentPerClass
        ? filters.studentPerClass.studentPerClass
        : null,
      withLaboratories:
        filters.selectedFacilities && filters.selectedFacilities[0].selected
          ? 1
          : null,
      withLibrary:
        filters.selectedFacilities && filters.selectedFacilities[1].selected
          ? 1
          : null,
      withInternet:
        filters.selectedFacilities && filters.selectedFacilities[2].selected
          ? 1
          : null,
      withSoccerField:
        filters.selectedFacilities && filters.selectedFacilities[3].selected
          ? 1
          : null,
      withVolleyballField:
        filters.selectedFacilities && filters.selectedFacilities[4].selected
          ? 1
          : null,
      withBasketballField:
        filters.selectedFacilities && filters.selectedFacilities[5].selected
          ? 1
          : null,
      withSwimmingPool:
        filters.selectedFacilities && filters.selectedFacilities[6].selected
          ? 1
          : null,
      withComputerLab:
        filters.selectedFacilities && filters.selectedFacilities[7].selected
          ? 1
          : null,
      withTransport:
        filters.selectedFacilities && filters.selectedFacilities[8].selected
          ? 1
          : null,
      withRestaurant:
        filters.selectedFacilities && filters.selectedFacilities[9].selected
          ? 1
          : null,
      withAuditorium:
        filters.selectedFacilities && filters.selectedFacilities[10].selected
          ? 1
          : null,
      withSnackArea:
        filters.selectedFacilities && filters.selectedFacilities[11].selected
          ? 1
          : null,
    };

    try {
      const URL = `${state.url_linked_academy}/schools`;
      const { data } = await http.get(URL, {
        params: filterData,
      });
      data.schools.forEach((school) => {
        const match = school.coordinates.match(
          /POINT\(([\d\.\-]+) ([\d\.\-]+)\)/
        );
        if (match) {
          const latitude = parseFloat(match[1]);
          const longitude = parseFloat(match[2]);
          school.coordinates = [latitude, longitude];
        }
      });
      commit("SET_SCHOOLS", data);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async GET_ALL_PERMISSIONS({ state }) {
    try {
      const URL = `${state.url_linked_academy}/permissions`;
      const { data } = await privateHttp.get(URL);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async GET_SPECIALITIES({ state, commit }) {
    try {
      const URL = `${state.url_linked_academy}/specialities`;
      const { data } = await privateHttp.get(URL);
      commit("SET_SPECIALITIES", data);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async CREATE_SPECIALITY({ state }, speciality) {
    try {
      const URL = `${state.url_linked_academy}/specialities`;
      const { data } = await privateHttp.post(URL, {
        name: speciality,
      });
      toast.success("Especialidad creada correctamente");
      return data;
    } catch (error) {
      throw error;
    }
  },
  async UPDATE_SPECIALITY({ state }, speciality) {
    try {
      const URL = `${state.url_linked_academy}/specialities/${speciality.id}`;
      const { data } = await privateHttp.put(URL, {
        name: speciality.name,
      });

      return data;
    } catch (error) {
      throw error;
    }
  },
  async DELETE_SPECIALITY({ state }, speciality) {
    try {
      const URL = `${state.url_linked_academy}/specialities/${speciality}`;
      const { data } = await privateHttp.delete(URL);
      toast.success("Especialidad eliminada correctamente");
      return data;
    } catch (error) {
      toast.error("Error al eliminar especialidad");
      throw error;
    }
  },
  async GET_DISABILITIES({ state, commit }) {
    try {
      const URL = `${state.url_linked_academy}/disabilities`;
      const { data } = await privateHttp.get(URL);
      commit("SET_DISABILITIES", data);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async CREATE_DISABILITY({ state }, disability) {
    try {
      const URL = `${state.url_linked_academy}/disabilities`;
      const { data } = await privateHttp.post(URL, {
        name: disability,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  async UPDATE_DISABILITY({ state }, disability) {
    try {
      const URL = `${state.url_linked_academy}/disabilities/${disability.id}`;
      const { data } = await privateHttp.put(URL, {
        name: disability.name,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  async DELETE_DISABILITY({ state }, disability) {
    try {
      const URL = `${state.url_linked_academy}/disabilities/${disability}`;
      const { data } = await privateHttp.delete(URL);
      toast.success("Discapacidad eliminada correctamente");
      return data;
    } catch (error) {
      toast.error("Error al eliminar discapacidad");
      throw error;
    }
  },
  async GET_EDUCATION_LEVELS({ state, commit }) {
    try {
      const URL = `${state.url_linked_academy}/education-levels`;
      const { data } = await privateHttp.get(URL);
      commit("SET_EDUCATION_LEVELS", data);
    } catch (error) {
      throw error;
    }
  },
  async CREATE_EDUCATION_LEVEL({ state }, educationLevel) {
    try {
      const URL = `${state.url_linked_academy}/education-levels`;
      const { data } = await privateHttp.post(URL, {
        name: educationLevel,
      });
      toast.success("Nivel de educación creado correctamente");
      return data;
    } catch (error) {
      toast.error("Error al crear nivel de educación");
      throw error;
    }
  },
  async UPDATE_EDUCATION_LEVEL({ state }, educationLevel) {
    try {
      const URL = `${state.url_linked_academy}/education-levels/${educationLevel.id}`;
      const { data } = await privateHttp.put(URL, {
        name: educationLevel.name,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  async DELETE_EDUCATION_LEVEL({ state }, educationLevel) {
    try {
      const URL = `${state.url_linked_academy}/education-levels/${educationLevel}`;
      const { data } = await privateHttp.delete(URL);
      toast.success("Nivel de educación eliminado correctamente");
      return data;
    } catch (error) {
      toast.error("Error al eliminar nivel de educación");
      throw error;
    }
  },
  async GET_EDUCATIONAL_MODELS({ state, commit }) {
    try {
      const URL = `${state.url_linked_academy}/education-modes`;
      const { data } = await privateHttp.get(URL);
      commit("SET_EDUCATIONAL_MODELS", data);
    } catch (error) {
      throw error;
    }
  },
  async CREATE_EDUCATIONAL_MODEL({ state }, educationalModel) {
    try {
      const URL = `${state.url_linked_academy}/education-modes`;
      const { data } = await privateHttp.post(URL, {
        name: educationalModel,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  async UPDATE_EDUCATIONAL_MODEL({ state }, educationalModel) {
    try {
      const URL = `${state.url_linked_academy}/education-modes/${educationalModel.id}`;
      const { data } = await privateHttp.put(URL, {
        name: educationalModel.name,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  async DELETE_EDUCATIONAL_MODEL({ state }, educationalModel) {
    try {
      const URL = `${state.url_linked_academy}/education-modes/${educationalModel}`;
      const { data } = await privateHttp.delete(URL);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async GET_GRADES({ state, commit }) {
    try {
      const URL = `${state.url_linked_academy}/grades`;
      const { data } = await privateHttp.get(URL);
      commit("SET_GRADES", data);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async CREATE_GRADE({ state }, { grade }) {
    try {
      const URL = `${state.url_linked_academy}/grades`;
      const { data } = await privateHttp.post(URL, grade);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async UPDATE_GRADE({ state }, { grade }) {
    try {
      const URL = `${state.url_linked_academy}/grades/${grade.id}`;
      const { data } = await privateHttp.put(URL, grade);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async DELETE_GRADE({ state }, { grade }) {
    try {
      const URL = `${state.url_linked_academy}/grades/${grade.id}`;
      const { data } = await privateHttp.delete(URL);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async GET_SCHEDULES({ state, commit }) {
    try {
      const URL = `${state.url_linked_academy}/schedules`;
      const { data } = await privateHttp.get(URL);
      commit("SET_SCHEDULES", data);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async CREATE_SCHEDULE({ state }, { schedule }) {
    try {
      const URL = `${state.url_linked_academy}/schedules`;
      const { data } = await privateHttp.post(URL, schedule);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async UPDATE_SCHEDULE({ state }, { schedule }) {
    try {
      const URL = `${state.url_linked_academy}/schedules/${schedule.id}`;
      const { data } = await privateHttp.put(URL, schedule);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async DELETE_SCHEDULE({ state }, { schedule }) {
    try {
      const URL = `${state.url_linked_academy}/schedules/${schedule.id}`;
      const { data } = await privateHttp.delete(URL);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async GET_SESSIONS({ state, commit }) {
    try {
      const URL = `${state.url_linked_academy}/sessions`;
      const { data } = await privateHttp.get(URL);
      commit("SET_SESSIONS", data);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async CREATE_SESSION({ state }, session) {
    try {
      const URL = `${state.url_linked_academy}/sessions`;
      const { data } = await privateHttp.post(URL, {
        name: session,
      });
      toast.success("Sesión creada correctamente");

      return data;
    } catch (error) {
      toast.error("Error al crear sesión");
      console.log(error);
      throw error;
    }
  },
  async UPDATE_SESSION({ state }, session) {
    try {
      const URL = `${state.url_linked_academy}/sessions/${session.id}`;
      const { data } = await privateHttp.put(URL, {
        name: session.name,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  async DELETE_SESSION({ state }, session) {
    try {
      const URL = `${state.url_linked_academy}/sessions/${session}`;
      const { data } = await privateHttp.delete(URL);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async GET_LANGUAGES({ state, commit }) {
    try {
      const URL = `${state.url_linked_academy}/languages`;
      const { data } = await privateHttp.get(URL);
      commit("SET_LANGUAGES", data);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async CREATE_LANGUAGE({ state }, language) {
    try {
      const URL = `${state.url_linked_academy}/languages`;
      const { data } = await privateHttp.post(URL, {
        name: language,
      });
      toast.success("Idioma creado correctamente");
      return data;
    } catch (error) {
      toast.error("Error al crear idioma");
      throw error;
    }
  },
  async UPDATE_LANGUAGE({ state }, language) {
    try {
      const URL = `${state.url_linked_academy}/languages/${language.id}`;
      const { data } = await privateHttp.put(URL, {
        name: language.name,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  async DELETE_LANGUAGE({ state }, language) {
    try {
      const URL = `${state.url_linked_academy}/languages/${language}`;
      const { data } = await privateHttp.delete(URL);
      toast.success("Idioma eliminado correctamente");
      return data;
    } catch (error) {
      toast.error("Error al eliminar idioma");
      throw error;
    }
  },

  async GET_ETHNIC_GROUPS({ state, commit }) {
    try {
      const URL = `${state.url_linked_academy}/ethnic-groups`;
      const { data } = await privateHttp.get(URL);
      commit("SET_ETHNIC_GROUPS", data);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async CREATE_ETHNIC_GROUP({ state }, ethnicGroup) {
    try {
      const URL = `${state.url_linked_academy}/ethnic-groups`;
      const { data } = await privateHttp.post(URL, {
        name: ethnicGroup,
      });
      toast.success("Grupo étnico creado correctamente");
      return data;
    } catch (error) {
      toast.error("Error al crear grupo étnico");
      throw error;
    }
  },
  async UPDATE_ETHNIC_GROUP({ state }, ethnicGroup) {
    try {
      const URL = `${state.url_linked_academy}/ethnic-groups/${ethnicGroup.id}`;
      const { data } = await privateHttp.put(URL, {
        name: ethnicGroup.name,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
  async DELETE_ETHNIC_GROUP({ state }, ethnicGroup) {
    try {
      const URL = `${state.url_linked_academy}/ethnic-groups/${ethnicGroup}`;
      const { data } = await privateHttp.delete(URL);
      toast.success("Grupo étnico eliminado correctamente");
      return data;
    } catch (error) {
      toast.error("Error al eliminar grupo étnico");
      throw error;
    }
  },
  async GET_SCHOOLS_BY_ID_CITY({ state, commit }, payload) {
    const cityId = state.userData.cityId;
    try {
      const URL = `${state.url_linked_academy}/schools/per-city/${cityId}`;

      const { data } = await privateHttp.get(URL, {
        params: {
          page: 1,
          limit: 10,
        },
      });
      commit("SET_SCHOOLS_BY_CITY", data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async GET_MORE_SCHOOLS_BY_ID_CITY({ state, commit }, payload) {
    const cityId = state.userData.cityId;

    try {
      const URL = `${state.url_linked_academy}/schools/per-city/${cityId}`;

      const { data } = await privateHttp.get(URL, {
        params: {
          page: payload.page,
          limit: 10,
        },
      });
      commit("SET_SCHOOLS_BY_CITY", data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async CREATE_SCHOOL({ state }, school) {
    const cityId = state.userData.cityId;
    school.cityId = cityId;
    try {
      const URL = `${state.url_linked_academy}/schools`;
      const { data } = await privateHttp.post(URL, school);
      toast.success("Institucion creada con exito");
      return data;
    } catch (error) {
      toast.error("Error al crear institucion");
      throw error;
    }
  },
  async GET_SCHOOL_ADITIONAL_INFO({ state, commit }, payload) {
    try {
      const URL = `${state.url_linked_academy}/schools/additional-info`;
      const { data } = await privateHttp.get(URL, {
        params: payload,
      });
      commit("SET_RELATIONS", data);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async GET_ALL_PARAMETERS({ state, commit, dispatch }, { ruteName }) {
    try {
      const data = await dispatch(`${ruteName}`);
      commit("SET_PARAMETERS", data);
      return data;
    } catch (error) {
      throw error;
    }
  },
  async PUT_ACTIVE_DESACTIVE_PARAMETER({ state }, { payload }) {
    try {
      const URL = `${state.url_linked_academy}/schools/additional-info/activate-deactivate?activate=${payload.active}`;
      const { data } = await privateHttp.put(URL, payload);
      toast.success("Estado actualizado correctamente");
      return data;
    } catch (error) {
      toast.error("Error al actualizar estado");
      throw error;
    }
  },
};
