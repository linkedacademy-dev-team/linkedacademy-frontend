import Cookies from "js-cookie";
import Specialities from "../modules/home/views/specialities/Specialities.vue";

const URL_LINKED_ACADEMY =
  "https://linkedacademy-backend-production.up.railway.app/api";

export default {
  url_linked_academy: URL_LINKED_ACADEMY,
  userToken: "qoeX9mvEAuok1JDRGKR1mjvbGFUZmC",
  passToken: "kfZPm0P8YrRg7yYwtgzw4KszxzA4ii",
  authToken: Cookies.get("AuthToken") || null,
  geolocation: [Cookies.get("Latitude"), Cookies.get("Longitude")] || null,
  countries: [],
  departments: [],
  cities: [],
  schools: [],
  specialities: [],
  disabilities: [],
  education_levels: [],
  educational_models: [],
  grades: [],
  schedules: [],
  languages: [],
  sessions: [],
  ethnic_groups: [],
  userData: null,
};
