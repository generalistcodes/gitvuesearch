<template>
  <div class="container-sm"> 

      <div class="row">
        <div class="col-sm-12">
          <h1>My Favorites</h1>

          <div class="col-sm-12">
            <ul class="result" v-for="item in favorites" :key="item.node_id">
      <li class="result-item" v-if="item">
        <div class="box text-center git-result">

            <img class="avatar" v-bind:src="item.avatar" height="32" width="32">

            <div class="text-center">
                <span class="blk txt-left">
                <a class="repo-name" :href="item.url"> {{item.full_name}} </a><br/>
                </span>
                
            </div>

           </div>
      </li>
    </ul> 
          </div>
        </div>
      </div>

      

  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import store from '@/store'

@Component
export default class Favorites extends Vue {
  loading: boolean = true; 
  favorites: any;
 

  created() {
    this.favorite()
  } 

  favorite() {
    this.favorites = store.state.favorites.filter(favorites => Object.keys(favorites).length !== 0);
    return store.state.favorites
  } 

  
}
</script>

<style scoped>
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

</style>