<template>
  <div class="gitsearch">

        <div class="text-center">
          <input type="text" placeholder="Search github repository." class="input-text" v-model="query" v-on:keyup="getRepositoryItems">
        </div>

        <br>

        <div v-if="loading" class="loading">
           Searching... 
        </div>

        <p class="sort-box"  v-if="query">
          <b>Sort {{query}} by : </b>
          <button class="white-btn" @click="sortBy('-stargazers_count')">Highest stars</button>
          <button class="white-btn" @click="sortBy('stargazers_count')">Lowest stars</button>
          <button class="white-btn" @click="sortBy('-updated_at')">Latest</button>
          <button class="white-btn" @click="sortBy('updated_at')">Oldest</button>
        </p>
        <ul v-if="gitResults" class="result">
          <li v-for="item in gitResults" :key="item+ Math.random()" class="result-item">
            <div class="box text-center git-result">
              <img class="avatar" v-bind:src="item.owner.avatar_url" height="50" width="50">
              <div class="text-center">
                  
                  <span class="blk txt-left">
                   <a class="repo-name" :href="item.owner.html_url"> {{item.full_name}} </a>
                   <small>Updated {{timeago(item.updated_at)}}</small>
                  </span>
                  <span>⭐ {{item.stargazers_count}}</span>
                  <span class="desc">{{item.description}}</span>

                </div>
              </div>
          </li>
        </ul> 

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gitService from '../services/gitsearch.service';
import moment from 'moment';
import { sortBy } from '../utils/sort';


@Component
export default class GitSearch extends Vue {
  // @Prop() 
  private loading: boolean = false
  private gitResults = [];
  public query: any = "";
  // public sortName: string = 'stars'

  getRepositoryItems() { 
    this.clear()
    const term = this.query
    this.loading = true
    return gitService.getRepo(term)
                      .then(response => (this.gitResults = response.data.items))
                      .catch((e)=> console.log("Error" + e))
                      .finally(() => this.loading = false);
  }

  byStars(a: any, b: any) {
      if (a.stargazers_count > b.stargazers_count)
        return -1;
      if (a.stargazers_count < b.stargazers_count)
        return 1;
      return 0;
  }

  byLatest(a: any, b: any) {
    //updated_at
      if (a.updated_at > b.updated_at || a.stargazers_count > b.stargazers_count)
        return -1;
      if (a.updated_at < b.updated_at || a.stargazers_count < b.stargazers_count)
        return 1;
      return 0;
  }

  /*
    sorting add `-` for asc/desc
    eg: -stargazers_count -> 9999-0
    w/out `-`:  stargazers_count ->0-9999
  */
  
  sortBy(sortName: string) {
    this.gitResults = this.gitResults.sort(sortBy(sortName))
    return this.gitResults
  }

  timeago(timestamp: any) {
   return moment(timestamp).fromNow();
  }

  public clear() {
    return this.gitResults = [];
  } 

  public testthis() {
    return true;
  }
}
</script>


<style>
:root {
  --link-color: #3868FC;
  --description-color: #707070;
  --tag-bg-color: #F1F8FF;
  --tag-txt-color: #0366D6;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.text-center{
  text-align:center;
}

.input-text{
    padding: 10px;
    border: 1px solid #fff;
    width: 45%;
    box-shadow: 0px 7px 5px -3px rgb(0 0 0 / 0%), 0px 4px 10px 1px rgba(0,0,0,.14), 0px 4px 10px 2px rgb(255 255 255 / 0%);
}

.desc{
  font-weight: 500;
}

.box{
  margin:15px;
  text-align:center;
  padding: 5px;
  display: flex;
}

.box span {
  margin-left: 10px;
}

.blk{
  display: block;
}

.git-result {
  padding-left: 10px;
  padding-right: 10px;
}

ul{
  list-style:none;
  margin-left: 30%;
  margin-right: 30%;
}

li{
  float:left;
}

a{
  text-decoration:none; 
}

a:hover{
  background:#fff;
  color:#333;
  
}

.txt-left{
  text-align: left;
}

a.repo-name{
  color: var(--link-color);
  font-weight: bold;
  text-transform: capitalize;
  display: block;
}

.result {
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-align-content: stretch;
    -ms-flex-line-pack: stretch;
    align-content: stretch;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
}

.result-item {
    border: 1px solid #EFF2F4;
    margin-bottom: 10px;
    border-radius: 5px;
    -webkit-order: 0;
    -ms-flex-order: 0;
    order: 0;
    -webkit-flex: 0 1 auto;
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    -webkit-align-self: stretch;
    -ms-flex-item-align: stretch;
    align-self: stretch;
}
.avatar-repo {
    border-radius: 50%!important;
}
.avatar {
    display: inline-block;
    overflow: hidden;
    line-height: 1;
    vertical-align: middle;
    border-radius: 6px;
}

.loading {
    padding: 10px;
}

.white-btn {
    background: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0px 7px 5px -3px rgb(0 0 0 / 0%), 0px 4px 10px 1px rgba(0,0,0,.14), 0px 4px 10px 2px rgb(255 255 255 / 0%);
    margin-right: 10px;
}

</style>
