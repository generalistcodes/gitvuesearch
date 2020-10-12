<template>
  <div class="gitsearch">



 
        <ul v-if="data" class="result">
          <li v-for="item in data" :key="item+ Math.random()" class="result-item">
            <div class="box text-center git-result">
                <img class="avatar" v-bind:src="item.owner.avatar_url.replace('?v=4', '?s=64&v=4')" height="32" width="32">
                <div class="text-center">
                    
                    <span class="blk txt-left">
                    <a class="repo-name" :href="item.owner.html_url"> {{item.full_name}} </a>
                    <small>Updated {{timeago(item.updated_at)}}</small>
                    </span>
                    <span>⭐ {{item.stargazers_count}}</span>
                    <span class="desc">{{item.description}}</span>

                </div>

                <router-link class="view-details" :to="{name: 'Details', params: {reponame: item.full_name}   }">Details</router-link>
              </div>
          </li>
        </ul> 



  
  </div>
 
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class GitDisplay extends Vue {
  @Prop()
        data!: [];

  timeago(timestamp: any) {
   return moment(timestamp).fromNow();
  }
}
</script>


<style>
:root {
  --link-color: #3868FC;
  --description-color: #707070;
  --tag-bg-color: #F1F8FF;
  --tag-txt-color: #0366D6;
  --just-white: #ffffff;
  --border-color: #EFF2F4;
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
    border: 1px solid var(--just-white);
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
  background:var(--just-white);
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
  white-space: nowrap;
  overflow: hidden;
  width: 500px;
  text-overflow: ellipsis;
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
        display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: stretch;
    width: fit-content;
    align-items: flex-start;
}

.result-item {
    border: 1px solid var(--border-color);
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


.white-btn {
    background: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0px 7px 5px -3px rgb(0 0 0 / 0%), 0px 4px 10px 1px rgba(0,0,0,.14), 0px 4px 10px 2px rgb(255 255 255 / 0%);
    margin-right: 10px;
    border: 2px solid var(--just-white);
}

.white-btn:focus{
    border: 2px solid var(--tag-txt-color);
    outline: none;
}

.small-label {
    display: inline-block;
    font-size: 15px;
    font-weight: 500;
    line-height: 18px;
    border: 1px solid transparent;
    border-radius: 2em;
    padding: 0 10px;
    line-height: 22px;
    color: var(--tag-txt-color);
    white-space: nowrap;
    background-color: #f1f8ff;
}

/* pagination */
#pagination {
  margin: 0;
  padding: 0;
  text-align: center;
  width: 500px;
  margin: 0 auto;
  display: block;
  margin-bottom: 200px;
  padding-bottom:100px;
}
#pagination li {
  display: inline
}
#pagination li a {
  display: inline-block;
  text-decoration: none;
  padding: 5px 10px;
  color: #000
}

/* Active and Hoverable Pagination */
#pagination li a {
  border-radius: 5px;
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s
    
}
#pagination li a.active {
  background-color: #4caf50;
  color: #fff
}
#pagination li a:hover:not(.active) {
  background-color: #ddd;
} 
.gitsearch {
margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.disabled {
  cursor: not-allowed;
  color: gray
}
</style>
