<template>
  <div>
    <h1>Dashboard</h1>
    <va-divider class="mt-3 mb-0" />
    <div v-if="isLoading" class="loading-icon flex lg6 xs12 py-4">
      <va-progress-circle indeterminate />
    </div>
    <div>
      <add-task :employeeId="activeEmployeeId" />
      <va-divider class="mt-0 mb-2" />
      <employees v-if="employees.length" :employees="employees" />
      <p v-if="!employees.length && !isLoading">
        Employees list is empty. Add new employee in order to assign task
      </p>
    </div>
    <va-divider class="mt-1 mb-1" />
    <p v-if="errors.other.length" class="error-msg">
      Something went wrong. Try again later.
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Employees from '../Employees';
import AddTask from '../AddTask';

export default {
  components: { Employees, AddTask },
  computed: {
    ...mapState(['isLoading', 'employees', 'errors', 'activeEmployeeId']),
  },
  created() {
    this.fetchEmployees();
    this.fetchAllTasks();
  },
  methods: {
    ...mapActions(['fetchEmployees', 'fetchAllTasks']),
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
.error-msg {
  padding: 5px;
  color: red;
}
</style>