<template>
  <div>
    <h1 style="text-decoration: underline">All items</h1>
    <ul id="items-list">
      <li v-for="item in items" :key="item.name">
        <div class="itemInfo">
          <div class="itemField">id: {{item._id}}</div> 
          <div class="itemField">name: {{item.name}}</div> 
          <div class="itemField">created:{{item.createdAt}}</div> 
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import  axios from 'axios';

export default {
  name: 'Items',
  data () {
    return {
      items: [],
      errors: []
    }
  },
  mounted: function() {
    axios.get('/api')
      .then(response => this.items = response.data)
      .catch(error => console.log(error))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
.itemInfo {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.itemField {
  margin-right: 25px;
  padding: 5px;
}
</style>
