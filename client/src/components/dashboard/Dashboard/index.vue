<template>
  <div>
    <h1>Dashboard</h1>
    <va-divider class="mt-3 mb-0" />
    <div v-if="isLoading" class="loading-icon flex lg6 xs12 py-4">
      <va-progress-circle indeterminate />
    </div>
    <add-task :employeeId="selectedEmployeeId" />
    <va-divider class="mt-0 mb-2" />
    <employees
      v-if="employees.length"
      @idRecieved="setEmployeeId"
      :employees="employees"
    />
    <va-divider class="mt-3 mb-3" />
    <p v-if="errors.length" class="error">{{ errors }}</p>
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
  data() {
    return {
      selectedEmployeeId: null,
    };
  },
  computed: {
    ...mapState(['isLoading', 'employees', 'errors']),
  },
  created() {
    this.fetchEmployees();
    this.fetchAllTasks();
  },
  methods: {
    ...mapActions(['fetchEmployees', 'fetchAllTasks']),
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
.error {
  padding: 5px;
  color: red;
}
</style>