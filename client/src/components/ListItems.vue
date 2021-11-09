<template>
<ul id="items-list">
  <li v-for="item in items" :key="item.name">
    {{ item.name }} created at: {{item.createdAt}}
  </li>
</ul>
</template>

<script>
import  axios from 'axios';

export default {
  name: 'ListItems',
  data () {
    return {
      items: ['marko', 'luka', 'ivan'],
      errors: []
    }
  },
  mounted: function() {
    axios.get('http://localhost:4101/items')
      .then(response => this.items = response.data)
      .catch(error => console.log(error))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
