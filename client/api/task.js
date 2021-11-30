import axios from 'axios';

const basePath = '/api/tasks';

const fetchAllTasks = () => axios.get(`${basePath}`);
const fetchEmployeeTasks = (employeeId) => axios.get(`${basePath}/${employeeId}`);
const createTask = (employeeId, task) => axios.post(`${basePath}/${employeeId}`, task);
const deleteTask = (taskId) => axios.delete(`${basePath}/${taskId}`);
const toggleCompleted = (taskId) => axios.post(`${basePath}/complete/${taskId}`);

export default {
  fetchAllTasks,
  fetchEmployeeTasks,
  createTask,
  deleteTask,
  toggleCompleted
}