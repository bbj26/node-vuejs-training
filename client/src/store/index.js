import { createStore } from 'vuex';
import employeesApi from '../../api/employee';
import tasksApi from '../../api/task';
import { format } from 'date-fns';
import compareAsc from 'date-fns/compareAsc';

const store = createStore({
  state: {
    employees: [],
    tasks: [],
    isLoading: false,
    activeEmployeeId: null,
    errors: {
      employeeCreation: [],
      taskCreation: [],
      other: []
    }
  },
  mutations: {
    SET_LOADING(state, value) {
      state.isLoading = value;
    },
    SAVE_EMPLOYEES(state, employees) {
      state.employees = employees;
    },
    SET_ACTIVE_EMPLOYEE(state, employeeId = null) {
      state.activeEmployeeId = employeeId
    },
    SAVE_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    SAVE_EMPLOYEE_CREATION_ERROR(state, error = []) {
      state.errors.employeeCreation = error;
    },
    SAVE_TASK_CREATION_ERROR(state, error = []) {
      state.errors.taskCreation = error;
    },
    SAVE_OTHER_ERRORS(state, error = []) {
      state.errors.other = error;
    }
  },
  actions: {
    async fetchEmployees(context) {
      context.commit('SET_LOADING', true);
      let employees = [];
      return await employeesApi
        .getEmployees()
        .then((res) => {
          employees = res.data;
          if (!employees.length) {
            context.commit('SET_ACTIVE_EMPLOYEE');
          }
          context.commit('SAVE_EMPLOYEES', employees);
          context.commit('SAVE_EMPLOYEE_CREATION_ERROR');
        })
        .catch((err) => {
          context.commit('SAVE_OTHER_ERRORS', err.response.data.msg)
        })
        .finally(() => context.commit('SET_LOADING', false));
    },
    async createEmployee(context, payload) {
      context.commit('SET_LOADING', true);
      return await employeesApi.createEmployee(payload)
        .then(() => {
          context.commit('SAVE_EMPLOYEE_CREATION_ERROR');
          context.dispatch('fetchEmployees');
        })
        .catch(err => {
          context.commit('SAVE_EMPLOYEE_CREATION_ERROR', err.response.data.error)
        })
        .finally(() => context.commit('SET_LOADING', false))
    },
    async deleteEmployee(context, payload) {
      context.commit('SET_LOADING', true);
      return await employeesApi.deleteEmployee(payload.employeeId)
        .then(() => context.dispatch('fetchEmployees'))
        .catch(err => {
          context.commit('SAVE_OTHER_ERRORS', err.response.data.msg)
        })
        .finally(() => context.commit('SET_LOADING', false))
    },
    setActiveEmployee(context, payload) {
      context.commit('SET_ACTIVE_EMPLOYEE', payload);
    },
    async fetchAllTasks(context) {
      context.commit('SET_LOADING', true);
      let tasks = [];
      return await tasksApi.fetchAllTasks()
        .then(res => {
          tasks = res.data;
          context.commit('SAVE_TASKS', tasks);
          context.commit('SAVE_TASK_CREATION_ERROR');
        })
        .catch(err => {
          context.commit('SAVE_OTHER_ERRORS', err.response.data.msg)
        })
        .finally(() => context.commit('SET_LOADING', false));
    },
    async createTask(context, payload) {
      context.commit('SET_LOADING', true);
      const { employeeId, name } = payload;
      let { deadline } = payload;
      deadline = format(deadline, 'yyyy-MM-dd');
      return await tasksApi
        .createTask(employeeId, { name, deadline })
        .then(() => context.dispatch('fetchAllTasks'))
        .catch((err) => {
          context.commit('SAVE_TASK_CREATION_ERROR', err.response.data.error)
        })
        .finally(() => context.commit('SET_LOADING', false));
    },
    async deleteTask(context, payload) {
      context.commit('SET_LOADING', true);
      return await tasksApi
        .deleteTask(payload.taskId)
        .then(() => context.dispatch('fetchAllTasks'))
        .catch((err) => {
          context.commit('SAVE_OTHER_ERRORS', err.response.data.msg)
        })
        .finally(() => context.commit('SET_LOADING', false));
    }
  },
  getters: {
    employeeTasks: (state) => (employeeId) => {
      return state.tasks.filter(task => task.employeeId === employeeId)
        .sort((task1, task2) => compareTaskDeadlines(task1, task2))
    },
    totalTasks: (state) => (employeeId) => {
      return state.tasks.filter(task => task.employeeId === employeeId).length;
    },
    completedTasks: (state) => (employeeId) => {
      return state.tasks.filter(task => task.employeeId === employeeId && task.completed).length;
    }
  }
});

const compareTaskDeadlines = (task1, task2) => {
  let deadline1 = new Date(task1.deadline);
  let deadline2 = new Date(task2.deadline);
  return compareAsc(deadline1, deadline2);
}

export default store;