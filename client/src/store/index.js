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
    SET_LOADING_TRUE(state) {
      state.isLoading = true;
    },
    SET_LOADING_FALSE(state) {
      state.isLoading = false;
    },
    SAVE_EMPLOYEES(state, employees) {
      state.employees = employees;
    },
    SET_ACTIVE_EMPLOYEE(state, employeeId) {
      state.activeEmployeeId = employeeId
    },
    UNSET_ACTIVE_EMPLOYEE(state) {
      state.activeEmployeeId = null;
    },
    SAVE_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    SAVE_EMPLOYEE_CREATION_ERROR(state, error) {
      state.errors.employeeCreation = error;
    },
    CLEAR_EMPLOYEE_CREATION_ERRORS(state) {
      state.errors.employeeCreation = [];
    },
    SAVE_TASK_CREATION_ERROR(state, error) {
      state.errors.taskCreation = error;
    },
    CLEAR_TASK_CREATION_ERRORS(state) {
      state.errors.taskCreation = [];
    },
    SAVE_OTHER_ERRORS(state, error) {
      state.errors.other = error;
    },
    CLEAR_OTHER_ERRORS(state) {
      state.errors.other = [];
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
          if (!employees.length) {
            context.commit('UNSET_ACTIVE_EMPLOYEE');
          }
          context.commit('SAVE_EMPLOYEES', employees);
          context.commit('CLEAR_EMPLOYEE_CREATION_ERRORS');
        })
        .catch((err) => {
          context.commit('SAVE_OTHER_ERRORS', err.response.data.msg)
        })
        .finally(() => context.commit('SET_LOADING_FALSE'));
    },
    async createEmployee(context, payload) {
      context.commit('SET_LOADING_TRUE');
      return await employeesApi.createEmployee(payload)
        .then(() => {
          context.commit('CLEAR_EMPLOYEE_CREATION_ERRORS');
          context.dispatch('fetchEmployees');
        })
        .catch(err => {
          context.commit('SAVE_EMPLOYEE_CREATION_ERROR', err.response.data.error)
        })
        .finally(() => context.commit('SET_LOADING_FALSE'))
    },
    async deleteEmployee(context, payload) {
      context.commit('SET_LOADING_TRUE');
      return await employeesApi.deleteEmployee(payload.employeeId)
        .then(() => {
          context.dispatch('fetchEmployees');
        })
        .catch(err => {
          context.commit('SAVE_OTHER_ERRORS', err.response.data.msg)
        })
        .finally(() => context.commit('SET_LOADING_FALSE'))
    },
    setActiveEmployee(context, payload) {
      context.commit('SET_ACTIVE_EMPLOYEE', payload);
    },
    async fetchAllTasks(context) {
      context.commit('SET_LOADING_TRUE');
      let tasks = [];
      return await tasksApi.fetchAllTasks()
        .then(res => {
          tasks = res.data;
          context.commit('SAVE_TASKS', tasks);
          context.commit('CLEAR_TASK_CREATION_ERRORS');
        })
        .catch(err => {
          context.commit('SAVE_OTHER_ERRORS', err.response.data.msg)
        })
        .finally(() => context.commit('SET_LOADING_FALSE'));
    },
    async createTask(context, payload) {
      context.commit('SET_LOADING_TRUE');
      const { employeeId, name } = payload;
      let { deadline } = payload;
      deadline = format(deadline, 'yyyy-MM-dd');
      return await tasksApi
        .createTask(employeeId, {
          name,
          deadline
        })
        .then(() => {
          context.dispatch('fetchAllTasks');
        })
        .catch((err) => {
          context.commit('SAVE_TASK_CREATION_ERROR', err.response.data.error)
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
          context.commit('SAVE_OTHER_ERRORS', err.response.data.msg)
        })
        .finally(() => context.commit('SET_LOADING_FALSE'));
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
      return state.tasks.filter(task => task.employeeId === employeeId).filter((task) => task.completed === true).length;
    }
  }
});

const compareTaskDeadlines = (task1, task2) => {
  let deadline1 = new Date(task1.deadline);
  let deadline2 = new Date(task2.deadline);
  return compareAsc(deadline1, deadline2);
}

export default store;