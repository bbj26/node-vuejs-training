import axios from 'axios'

function fetchAllTasks() {
  return axios.get('/api/tasks')
}

function fetchEmployeeTasks(employeeId) {
  return axios.get(`/api/tasks/${employeeId}`)
}

function createTask(employeeId, task) {
  return axios.post(`/api/tasks/${employeeId}`, task)
}

function deleteTask(taskId) {
  return axios.delete(`/api/tasks/${taskId}`)
}

function toggleCompleted(taskId) {
  return axios.post(`/api/tasks/complete/${taskId}`);
}

export default {
  fetchAllTasks,
  fetchEmployeeTasks,
  createTask,
  deleteTask,
  toggleCompleted
}