<template>
  <h1>User management</h1>
  <va-divider class="mt-3 mb-0" />
  <add-user />
  <va-divider class="mt-0 mb-2" />
  <div v-if="isLoading" class="loading-icon flex lg6 xs12 py-4">
    <va-progress-circle indeterminate />
  </div>
  <div class="employees-legend">
    <h3>Employees</h3>
    <div class="labels">
      <div class="emp-label">Name</div>
      <div class="emp-label">Action</div>
    </div>
  </div>
  <va-divider class="mt-1 mb-1" />
  <div v-if="employees.length" class="employees">
    <div
      v-for="employee in employees"
      :key="employee._id"
      class="employee-list"
    >
      {{ employee.name }}
      <va-button @click="deleteEmployee(employee._id)" color="danger"
        >Delete</va-button
      >
    </div>
  </div>
  <p v-if="!employees.length">
    Employees list is empty. Add new employee in order to assign task
  </p>
  <va-divider v-if="errors.length" class="mt-1 mb-1" />
  <p v-if="errors.length" class="error">{{ errors }}</p>
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
.employees-legend {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.employees {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.employee-list {
  min-width: 30%;
  max-width: 35%;
  padding: 5px;
  margin: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  min-width: 60px;
  color: red;
}
.labels {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 35%;
  min-width: 28%;
  padding: 10px 0px;
}
.error {
  padding: 5px;
  color: red;
}
</style>