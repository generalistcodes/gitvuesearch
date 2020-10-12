<template>
  <div class="container-sm">
    
    <div class="search-wrapper">
      <input type="text" placeholder="Search github repository and press enter." class="search-input" v-model="reponame" v-on:keyup.enter="getList">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-search" viewBox="0 0 24 24">
        <defs></defs>
        <circle cx="11" cy="11" r="8"></circle>
        <path d="M21 21l-4.35-4.35"></path>
      </svg>
    </div>
    <br>
    <div v-if="listLoading && reponame" class="loading">
          Searching... 
    </div>
    <br>
    <div class="sort-box"  v-if="reponame">
      <b>Sort <small class="small-label">{{reponame}}</small> by : </b>
      <button class="white-btn" @click="sortBy('name')">Alphabetical</button>
      <button class="white-btn" @click="sortBy('-stargazers_count')">Highest stars</button>
      <button class="white-btn" @click="sortBy('stargazers_count')">Lowest stars</button>
      <button class="white-btn" @click="sortBy('-updated_at')">Latest</button>
      <button class="white-btn" @click="sortBy('updated_at')">Oldest</button>
    </div>
    <br>
    <GitDisplay :data="list"/>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'; 
import GitDisplay from '@/components/GitDisplay.vue'; 
import Pagination from '@/components/Pagination.vue';
import gitService from '@/api/github';
import { sortBy } from '@/utils/sort';

/* 
@TODO
On click of a repository, show full details of the repository.

done-Add sorting options based on alphabetical order, number of stars and by latest
commit.

Include functionality to favorite/mark repositories using state management (Store
it on the client side.
*/
@Component({
  components: {
    GitDisplay,
    Pagination
  },
})
export default class Home extends Vue {
  loading: boolean = false
  total = 0
  list: [] = []
  listLoading = true
  reponame: any = "";
  listQuery = {
    page: 1,
    limit: 10
  }

//  created() { //construct
//     this.getList()
//   } 

  private async getList() {
    this.listLoading = true
    if(this.reponame) {
      const { data } = await gitService.query(this.listQuery, this.reponame);
      console.log("---daf", data)
      this.list = data.items
      this.total = data.total_count
      // Just to simulate the time of the request
      setTimeout(() => {
        this.listLoading = false
      }, 0.5 * 1000)
    }
  }
  
  sortBy(sortName: string = 'stargazers_count') {
    this.list = this.list.sort(sortBy(sortName))
    return this.list
  }

}
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
.loading {
    padding: 10px;
}

.search-wrapper {
  border-radius: 4px;
    background-color: #fff;
    padding-right: 12px;
    height: 40px;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    color: var(--light-font);
    box-shadow: 0 2px 6px 0 rgba(136, 148, 171, 0.2), 0 24px 20px -24px rgba(71, 82, 107, 0.1);
    overflow: hidden;
}

.search-input {
      border: none;
    -webkit-box-flex: 1;
    flex: 1;
    outline: none;
    height: 100%;
    padding: 0 12px;
    font-size: 12px;
}
</style>
