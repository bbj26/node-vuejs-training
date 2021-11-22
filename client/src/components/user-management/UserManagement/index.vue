<template>
  <h1>User management</h1>
  <AddUserForm />
  <div class="loading-icon flex lg6 xs12 py-4" v-if="isLoading">
    <va-progress-circle indeterminate />
  </div>
  <h3>Employees</h3>
  <div v-if="employees.length > 0">
    <div
      class="employee-list"
      v-for="employee in employees"
      :key="employee._id"
    >
      {{ employee.name }}
      <button @click="deleteEmployee(employee._id)">Delete</button>
    </div>
  </div>
</template>

<script>
import api from "../../../../api/employee";
import AddUserForm from "../AddUserForm";
export default {
  components: {
    AddUserForm,
  },
  data() {
    return {
      employees: [],
      errors: [],
      isLoading: false,
    };
  },
  created() {
    this.fetchEmployees();
  },
  updated() {
    this.fetchEmployees();
  },
  methods: {
    fetchEmployees() {
      this.isLoading = true;
      api
        .getEmployees()
        .then((res) => {
          this.employees = res.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.errors.push(err.msg);
          this.isLoading = false;
        });
    },
    deleteEmployee(employeeId) {
      api
        .deleteEmployee(employeeId)
        .then(() => {
          this.fetchEmployees();
        })
        .catch((err) => this.errors.push(err.msg));
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
</style>