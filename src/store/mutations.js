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
  SET_COUNTRIES(state, countries) {
    state.countries = countries;
  },
  SET_DEPARTMENTS(state, departments) {
    state.departments = departments;
  },
  SET_CITIES(state, cities) {
    state.cities = cities;
  },
  SET_GEOLOCATION(state, geolocation) {
    const [latitude, longitude] = geolocation.coordinates;
    Cookies.set("Latitude", latitude, { expires: 9999 });
    Cookies.set("Longitude", longitude, { expires: 9999 });
    state.geolocation = geolocation;
  },
  SET_SCHOOLS(state, schools) {
    state.schools = schools;
  },
  SET_SPECIALITIES(state, specialities) {
    state.specialities = specialities;
  },
  SET_DISABILITIES(state, disabilities) {
    state.disabilities = disabilities;
  },
  SET_SESSIONS(state, sessions) {
    state.sessions = sessions;
  },
  SET_EDUCATIONAL_MODELS(state, educationalModels) {
    state.educational_models = educationalModels;
  },
  SET_EDUCATION_LEVELS(state, educationLevels) {
    state.education_levels = educationLevels;
  },
  SET_ETHNIC_GROUPS(state, ethnicGroups) {
    state.ethnic_groups = ethnicGroups;
  },
  SET_LANGUAGES(state, languages) {
    state.languages = languages;
  },
  SET_USER_DATA(state, userData) {
    state.userData = userData;
  },
  SET_SCHOOLS_BY_CITY(state, schools) {
    state.schooldsByCity = schools;
  },
  SET_RELATIONS(state, relations) {
    state.relations = relations;
  },
  SET_PARAMETERS(state, parameters) {
    state.parameters = parameters;
  },
  SET_ROLE(state, role) {
    state.role = role;
  },
};
