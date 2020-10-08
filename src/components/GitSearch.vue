<template>
  <div class="gitsearch">

        <div class="text-center">
          
          <input type="text" placeholder="Search github repository." class="input-text" v-model="query" v-on:keyup="getRepositoryItems">
        </div>


        <div v-if="loading" class="loading">
           Searching... {{query}}
        </div>


        <ul v-if="gitResults" class="result">
          <li v-for="item in gitResults" :key="item" class="result-item">
            <div class="box text-center git-result">
              <img class="avatar" v-bind:src="item.owner.avatar_url" height="50" width="50">
              <div class="text-center">
                  
                  <span class="blk txt-left">
                   <a class="repo-name" href="#"> {{item.full_name}} </a>
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import gitService from '../services/gitsearch.service';
import moment from 'moment';

@Component
export default class GitSearch extends Vue {
  @Prop() query!: string;
  loading: boolean = false
  gitResults = [];

  getRepositoryItems() { 
    this.clear()
    this.loading = true
    return gitService.getRepo(this.query)
                      .then(response => (this.gitResults = response.data.items))
                      .catch((e)=> console.log("Error" + e))
                      .finally(() => this.loading = false);
  }

  timeago(timestamp: any) {
   return moment(timestamp).fromNow();
  }

  public clear() {
    this.gitResults = [];
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

</style>
