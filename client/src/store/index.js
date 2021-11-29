import { createStore } from 'vuex';
import employeesApi from '../../api/employee';
import tasksApi from '../../api/task';

const store = createStore({
  state: {
    employees: [],
    tasks: [],
    isLoading: false,
    errors: []
  },
  mutations: {
    SAVE_EMPLOYEES(state, employees) {
      state.employees = employees;
    },
    SET_LOADING_TRUE(state) {
      state.isLoading = true;
    },
    SET_LOADING_FALSE(state) {
      state.isLoading = false;
    },
    SAVE_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    SAVE_ERROR(state, error) {
      state.errors = error;
    }
  },
  actions: {
    async fetchEmployees(context) {
      context.commit('SET_LOADING_TRUE');
      let employees = [];
      return await employeesApi
        .getEmployees()
        .then((res) => {
          employees = res.data;
          context.commit('SAVE_EMPLOYEES', employees)
        })
        .catch((err) => {
          context.commit('SAVE_ERROR', err)
        })
        .finally(() => context.commit('SET_LOADING_FALSE'));
    },
    async createEmployee(context, payload) {
      context.commit('SET_LOADING_TRUE');
      return await employeesApi.createEmployee(payload)
        .then(() => {
          context.dispatch('fetchEmployees');
        })
        .catch(err => {
          context.commit('SAVE_ERROR', err)
        })
        .finally(() => context.commit('SET_LOADING_FALSE'))
    },
    async deleteEmployee(context, payload) {
      context.commit('SET_LOADING_TRUE');
      return await employeesApi.deleteEmployee(payload.empId)
        .then(() => {
          context.dispatch('fetchEmployees');
        })
        .catch(err => {
          context.commit('SAVE_ERROR', err)
        })
        .finally(() => context.commit('SET_LOADING_FALSE'))
    },
    async fetchAllTasks(context) {
      context.commit('SET_LOADING_TRUE');
      let tasks = [];
      return await tasksApi.fetchAllTasks()
        .then(res => {
          tasks = res.data;
          context.commit('SAVE_TASKS', tasks)
        })
        .catch(err => {
          context.commit('SAVE_ERROR', err)
        })
        .finally(() => context.commit('SET_LOADING_FALSE'));
    },
    async createTask(context, payload) {
      context.commit('SET_LOADING_TRUE');
      return await tasksApi
        .createTask(payload.employeeId, {
          name: payload.name,
          deadline: payload.deadline,
        })
        .then(() => {
          context.dispatch('fetchAllTasks');
        })
        .catch((err) => {
          context.commit('SAVE_ERROR', err)
        })
        .finally(() => context.commit('SET_LOADING_FALSE'));
    },
    async deleteTask(context, payload) {
      context.commit('SET_LOADING_TRUE');
      return await tasksApi
        .deleteTask(payload.taskId)
        .then(() => {
          context.dispatch('fetchAllTasks');
        })
        .catch((err) => {
          context.commit('SAVE_ERROR', err)
        })
        .finally(() => context.commit('SET_LOADING_FALSE'));
    }
  },
  getters: {
    employeeTasks: (state) => (employeeId) => {
      return state.tasks.filter(task => task.employeeId === employeeId);
    },
    totalTasks: (state) => (employeeId) => {
      return state.tasks.filter(task => task.employeeId === employeeId).length;
    },
    completedTasks: (state) => (employeeId) => {
      return state.tasks.filter(task => task.employeeId === employeeId).filter((task) => task.completed === true).length;
    }
  }
});

export default store;