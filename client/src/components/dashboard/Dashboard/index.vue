<template>
  <div>
    <h1>Dashboard</h1>
    <va-divider class="mt-3 mb-0" />
    <div class="loading-icon flex lg6 xs12 py-4" v-if="$store.state.isLoading">
      <va-progress-circle indeterminate />
    </div>
    <add-task
      :employees="$store.state.employees"
      :employeeId="selectedEmployeeId"
    />
    <va-divider class="mt-0 mb-2" />
    <employees
      v-if="$store.state.employees.length"
      :employees="$store.state.employees"
      @employeeIdEvent="setEmployeeId"
    />
    <va-divider class="mt-3 mb-3" />
  </div>
</template>

<script>
import store from '../../../store/index';
import Employees from '../Employees';
import AddTask from '../AddTask';
export default {
  components: {
    Employees,
    AddTask,
  },
  data() {
    return {
      employees: [],
      selectedEmployeeId: null,
    };
  },
  created() {
    store.dispatch('fetchEmployees');
    store.dispatch('fetchAllTasks');
  },
  methods: {
    setEmployeeId(id) {
      this.selectedEmployeeId = id;
    },
  },
};
</script>

<style scoped>
.loading-icon {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  top: 500px;
}
</style>