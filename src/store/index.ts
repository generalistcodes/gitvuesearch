import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface Repo {
  id: string;
  name: string;
  full_name: string;
}

export default new Vuex.Store({
  state: { //data
    favorites : [{}],
    repo: []
  },
  mutations: { //setters//only use this to update anything
    setFavorite(state, favoriteRepo: Repo) {
      state.favorites.push(favoriteRepo)
    },
    record(state, reponame) {
      state.repo = reponame
    }
  },
  actions: { //methods //never update the state //ajax call

    //call the mutations here
  },
  modules: {
  },
  getters: { // computed properties

    favorites(state){
      return state.favorites
    }

  },
});
