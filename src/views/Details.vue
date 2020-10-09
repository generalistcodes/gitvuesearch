<template>
  <div class="about">
     <div v-if="loading" class="loading">
          Loading... 
    </div>
     <ul class="result">
      <li class="result-item">
        <div class="box text-center git-result">
          <!-- <img v-if="repodata.owner? repodata.owner.avatar_url.replace('?v=4', '?s=64&v=4') :" height="32" width="32">  -->
            <div class="text-center">
                
                <span class="blk txt-left">
                <!-- <a class="repo-name" :href="repodata.owner.html_url"> {{repodata.full_name}} </a><br/> -->
                <small>Updated {{repodata.updated_at}}</small><br/>
                <small><a :href="repodata.homepage">Home Page: {{repodata.homepage}}</a></small><br/>
                <small>⭐ {{repodata.stargazers_count}}</small><br/>
                <small class="desc">{{repodata.description}}</small><br/>
                <small class="desc">Subscribers: {{repodata.subscribers_count}}</small><br/>

                <br/>

                <button @click="setFavorite()" :disabled="added" class="white-btn">{{added ? 'Favorited' : 'Add to Favorite'}}</button>
                </span>
                

            </div>

           </div>
      </li>
    </ul> 

  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gitService from '@/api/github';
import store from '@/store'

@Component
export default class Details extends Vue {
  private repodata:any = {};
  private loading: boolean = true;
  private added: boolean = false;
  @Prop({ required: true }) private reponame!: string
 

  created() {
    this.details()
    this.favorite()
    this.recordReponame(this.reponame)
  }

  setFavorite() {
    this.added = true
    store.commit('setFavorite', this.repodata)
  }

  recordReponame(reponame: any) {
    return store.commit('record', reponame)
  }

  favorite() {
    return store.state.favorites
  }

  private async details() {
    const datum =  await gitService.details(this.reponame)
    this.repodata = datum.data
    this.loading = false
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