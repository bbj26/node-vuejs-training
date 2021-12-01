<template>
  <h1>User management</h1>
  <va-divider class="mt-3 mb-0" />
  <add-user />
  <va-divider class="mt-0 mb-2" />
  <div v-if="isLoading" class="loading-icon flex lg6 xs12 py-4">
    <va-progress-circle indeterminate />
  </div>
  <div class="employees-legend flex-column-center">
    <h3>Employees</h3>
    <div class="labels flex-center-space-between">
      <div class="emp-label">Name</div>
      <div class="emp-label">Action</div>
    </div>
  </div>
  <va-divider class="mt-1 mb-1" />
  <div v-if="employees.length" class="employees flex-column-center">
    <div
      v-for="employee in employees"
      :key="employee._id"
      class="employee-list flex-center-space-between"
    >
      {{ employee.name }}
      <va-button @click="deleteEmployee(employee._id)" color="danger"
        >Delete</va-button
      >
    </div>
  </div>
  <p v-if="!employees.length && !errors.employeeFetchErrors.length">
    Employees list is empty. Add new employee in order to assign task
  </p>
  <va-divider v-if="errors.employeeFetchErrors.length" class="mt-1 mb-1" />
  <p v-if="errors.employeeFetchErrors.length" class="error-msg">
    FAILED: can not fetch employees: {{ errors.employeeFetchErrors }}
  </p>
  <va-divider class="mt-1 mb-1" />
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AddUser from '../AddUser';
export default {
  components: {
    AddUser,
  },
  created() {
    this.fetchEmployees();
  },
  computed: {
    ...mapState(['employees', 'isLoading', 'errors']),
  },
  methods: {
    ...mapActions({
      getEmployees: 'fetchEmployees',
      removeEmployee: 'deleteEmployee',
    }),
    fetchEmployees() {
      this.getEmployees();
    },
    deleteEmployee(employeeId) {
      this.removeEmployee({ empId: employeeId });
    },
  },
};
</script>

<style scoped>
.loading-icon {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  top: 400px;
}
.flex-column-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.flex-center-space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.employees-legend {
  align-items: center;
}
.employees {
  padding: 20px;
  align-items: center;
}
.employee-list {
  min-width: 30%;
  max-width: 35%;
  padding: 5px;
  margin: 5px;
}
button {
  min-width: 60px;
  color: red;
}
.labels {
  flex-direction: row;
  max-width: 35%;
  min-width: 28%;
  padding: 10px 0px;
}
.error-msg {
  padding: 5px;
  color: red;
}
</style>