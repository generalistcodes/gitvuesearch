<template>
  <div class="container-fluid">
    
    <div class="text-center">
      <input type="text" placeholder="Search github repository and press enter." class="input-text" v-model="reponame" v-on:keyup.enter="getList">
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

</style>
