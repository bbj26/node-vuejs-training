import  axios from 'axios';

function getItems() {
  return axios.get('/api/items')
}

export default {
  getItems
}