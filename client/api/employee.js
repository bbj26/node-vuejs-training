import axios from 'axios';

const basePath = '/api/employees/';

const getEmployees = () => axios.get(basePath);
const createEmployee = (employeeName) => axios.post(basePath, employeeName);
const deleteEmployee = (employeeId) => axios.delete(`${basePath}${employeeId}`);

export default {
  getEmployees,
  createEmployee,
  deleteEmployee
}