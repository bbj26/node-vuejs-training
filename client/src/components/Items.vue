<template>
  <div class="va-table-responsive">
    <h1 class="display-3">ALL ITEMS</h1>
    <table class="va-table va-table--striped va-table--clickable mx-auto">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Created</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item._id">
        <td>{{item._id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.createdAt}}</td>
      </tr>
      </tbody>
    </table>
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
  .va-table-responsive {
    overflow: auto;
  }
</style>
