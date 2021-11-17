import axios from 'axios'

function getEmployees() {
  return axios.get('/api/employees')
}

function deleteEmployee(employeeId) {
  return axios.delete('/api/employees/' + employeeId)
}
export default {
  getEmployees,
  deleteEmployee
}