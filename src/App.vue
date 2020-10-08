<template>
  <div id="app">
    <img alt="Git logo" src="./assets/logo.svg">
    <GitSearch/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GitSearch from './components/GitSearch.vue';

@Component({
  components: {
    GitSearch,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
