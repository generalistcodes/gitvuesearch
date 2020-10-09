import axios from 'axios';
import * as config from "../config.json";

export default {
    getRepo(term: any, page: number) {
      const size: number = 100
      return axios.get(`${config.url}${term}`+"&order=desc+&per_page=100&page="+`${page}`, {headers: { Authorization: `Token ${config.token}` }});
    },
    query(pagination: any, reponame: any) {
      const size: number = 100
      const query: any = pagination
      return axios.get(`${config.url}${reponame}`+"&order=desc&per_page="+`${query.limit}`+"&page="+`${query.page}`, {headers: { Authorization: `Token ${config.token}` }});
    },
    details(full_name: any) {
      return axios.get(`${config.url_detail}${full_name}`, {headers: { Authorization: `Token ${config.token}` }});
    },
  };