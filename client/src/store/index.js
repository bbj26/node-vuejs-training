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
    async createEmployee(context, payload) {
      context.commit('SET_LOADING_TRUE');
      return await employeesApi.createEmployee(payload)
        .then(() => {
          context.commit('SET_LOADING_FALSE');
          context.dispatch('fetchEmployees');
        })
        .catch(err => {
          console.log(err);
          context.commit('SET_LOADING_FALSE');
        })
    },
    async deleteEmployee(context, payload) {
      context.commit('SET_LOADING_TRUE');
      return await employeesApi.deleteEmployee(payload.empId)
        .then(() => {
          context.dispatch('fetchEmployees');
          context.commit('SET_LOADING_FALSE');
        })
        .catch(err => {
          console.log(err);
          context.commit('SET_LOADING_FALSE');
        })
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
        .createTask(payload.employeeId, {
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
    employeeTasks: (state) => (employeeId) => {
      return state.tasks.filter(task => task.employeeId === employeeId)
    },
    totalTasks: (state) => (employeeId) => {
      return state.tasks.filter(task => task.employeeId === employeeId).length
    },
    completedTasks: (state) => (employeeId) => {
      return state.tasks.filter(task => task.employeeId === employeeId).filter((task) => task.completed === true).length;
    }
  }
});

export default store;