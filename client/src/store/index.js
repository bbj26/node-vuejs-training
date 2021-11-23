import { createStore } from 'vuex';
import employeesApi from '../../api/employee'

const store =  createStore({
  state: {
    employees: [],
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
  },
  actions: {
    fetchEmployees(context) {
      context.commit('SET_LOADING_TRUE');
      let employees = [];
      let errors = [];
      return employeesApi
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
    }
  },
  getters: {
    isLoading: state => (state.isLoading ? true : false ),
    employees: state => {
      return state.employees;
      
    }
  }
});

export default store;