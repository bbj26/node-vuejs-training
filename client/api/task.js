import axios from 'axios';

const BASE_PATH = '/api/tasks';

const fetchAllTasks = () => axios.get(BASE_PATH);
const fetchEmployeeTasks = (employeeId) => axios.get(`${BASE_PATH}/${employeeId}`);
const createTask = (employeeId, task) => axios.post(`${BASE_PATH}/${employeeId}`, task);
const deleteTask = (taskId) => axios.delete(`${BASE_PATH}/${taskId}`);
const toggleCompleted = (taskId) => axios.post(`${BASE_PATH}/complete/${taskId}`);

export default {
  fetchAllTasks,
  fetchEmployeeTasks,
  createTask,
  deleteTask,
  toggleCompleted
}