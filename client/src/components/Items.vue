<template>
  <div>
    <h1 style="text-decoration: underline">All items</h1>
    <ul class="items-list">
      <li v-for="(item, i) in items" :key="i">
        <div class="item-info" v-bind:style=" i % 2 == 0 ? 'background-color: beige;' : 'background-color: white;' ">
          <div class="item-field">id: {{item._id}}</div> 
          <div class="item-field">name: {{item.name}}</div> 
          <div class="item-field">created:{{item.createdAt}}</div> 
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../../api/item'

export default {
  name: 'Items',
  data () {
    return {
      items: [],
      error: null,
    }
  },
  mounted() {
   api.getItems()
   .then(res => this.items = res.data)
   .catch(err => this.errors = err)
  }
}
</script>

<style scoped> 
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
.item-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: 1px solid black;
}

.item-field {
  margin-right: 25px;
  padding: 5px;
  min-width: 300px;
  text-align: left;
}
</style>
