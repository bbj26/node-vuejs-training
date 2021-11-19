import axios from 'axios'

function fetchAllTasks() {
  return axios.get('/api/tasks')
}

function fetchEmployeeTasks(employeeId) {
  return axios.get('/api/tasks/' + employeeId)
}

function createTask(employeeId, taskData) {
  return axios.post('/api/tasks/' + employeeId, taskData)
}

function deleteTask(taskId) {
  return axios.delete('/api/tasks/' + taskId)
}

export default {
  fetchAllTasks,
  fetchEmployeeTasks,
  createTask,
  deleteTask
}