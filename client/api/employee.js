import axios from 'axios';

const BASE_PATH = '/api/employees';

const getEmployees = () => axios.get(BASE_PATH);
const createEmployee = (employeeName) => axios.post(BASE_PATH, employeeName);
const deleteEmployee = (employeeId) => axios.delete(`${BASE_PATH}/${employeeId}`);

export default {
  getEmployees,
  createEmployee,
  deleteEmployee
};