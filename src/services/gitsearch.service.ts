import axios from 'axios';
import * as config from "../config.json";

export default {
    getRepo(param: any) {
      return axios.get(`${config.url}${param}`, {headers: { Authorization: `Token ${config.token}` }});
    },
  };