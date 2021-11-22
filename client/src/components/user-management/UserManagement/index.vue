<template>
  <h1>User management</h1>
  <div class="mt-3 mb-0">
    <va-divider />
  </div>
  <AddUserForm />
  <div class="mt-0 mb-2">
    <va-divider />
  </div>
  <div class="loading-icon flex lg6 xs12 py-4" v-if="isLoading">
    <va-progress-circle indeterminate />
  </div>
  <div class="employees-legend">
    <h3>Employees</h3>
    <div class="labels">
      <div class="emp-label">Name</div>
      <div class="emp-label">Action</div>
    </div>
  </div>
  <div class="mt-1 mb-1">
    <va-divider />
  </div>
  <div v-if="employees.length > 0" class="employees">
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
  min-width: 20%;
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
  min-width: 19%;
  padding: 10px 0px;
}
</style>