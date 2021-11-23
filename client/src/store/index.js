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
    }
  },
  actions: {
    async fetchEmployees(context) {
      context.commit('SET_LOADING_TRUE');
      let employees = [];
      let errors = [];
      return await employeesApi
        .getEmployees()
        .then((res) => {
          employees = res.data;
          context.commit('SAVE_EMPLOYEES', employees)
          context.commit('SET_LOADING_FALSE');
        })
        .catch((err) => {
          errors.push(err)
          context.commit('SET_LOADING_FALSE');
        });
    },
    async fetchAllTasks(context) {
      context.commit('SET_LOADING_TRUE');
      let tasks = [];
      let errors = [];
      return await tasksApi.fetchAllTasks()
        .then(res => {
          tasks = res.data;
          context.commit('SAVE_TASKS', tasks)
          context.commit('SET_LOADING_FALSE');
        })
        .catch(err => {
          errors.push(err)
          context.commit('SET_LOADING_FALSE');
        })
    },
    async createTask(context, payload) {
      let errors = [];
      context.commit('SET_LOADING_TRUE');
      return await tasksApi
        .createTask(payload.empId, {
          name: payload.name,
          deadline: payload.deadline,
        })
        .then(() => {
          context.dispatch('fetchAllTasks');
          context.commit('SET_LOADING_FALSE');
        })
        .catch((err) => {
          errors.push(err);
          context.commit('SET_LOADING_FALSE');
        });
    },
    async deleteTask(context, payload) {
      return await tasksApi
        .deleteTask(payload.taskId)
        .then(() => {
          context.dispatch('fetchAllTasks')
        })
        .catch((err) => (this.error = err));
    }
  },
  getters: {
    isLoading: state => (state.isLoading ? true : false),
    employees: state => {
      return state.employees;
    },
    tasks: state => {
      return state.tasks;
    },
    employeeTasks: (state) => (employeeId) => {
      return state.tasks.filter(task => task.employeeId === employeeId)
    }
  }
});

export default store;