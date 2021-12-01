<template>
  <div>
    <h1>Dashboard</h1>
    <va-divider class="mt-3 mb-0" />
    <div v-if="isLoading" class="loading-icon flex lg6 xs12 py-4">
      <va-progress-circle indeterminate />
    </div>
    <add-task :employeeId="activeEmployee" />
    <va-divider class="mt-0 mb-2" />
    <employees v-if="employees.length" :employees="employees" />
    <p v-if="!employees.length && !errors.employeeFetchErrors.length">
      Employees list is empty. Add new employee in order to assign task
    </p>
    <va-divider class="mt-3 mb-3" />
    <p v-if="errors.employeeFetchErrors.length" class="error-msg padding-10">
      FAILED: {{ errors.employeeFetchErrors }}
    </p>
    <p v-if="errors.employeeDeleteErrors.length" class="error-msg padding-10">
      FAILED: {{ errors.employeeDeleteErrors }}
    </p>
    <p v-if="errors.taskFetchErrors.length" class="error-msg padding-10">
      FAILED: {{ errors.taskFetchErrors }}
    </p>
    <p v-if="errors.taskDeleteErrors.length" class="error-msg padding-10">
      FAILED: {{ errors.taskDeleteErrors }}
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Employees from '../Employees';
import AddTask from '../AddTask';

export default {
  components: {
    Employees,
    AddTask,
  },
  computed: {
    ...mapState(['isLoading', 'employees', 'errors', 'activeEmployee']),
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