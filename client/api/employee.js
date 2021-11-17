import axios from 'axios'

function getEmployees() {
  return axios.get('/api/employees')
}

function createEmployee(employeeName) {
  return axios.post('/api/employees', employeeName)
}

function deleteEmployee(employeeId) {
  return axios.delete('/api/employees/' + employeeId)
}
export default {
  getEmployees,
  createEmployee,
  deleteEmployee
}