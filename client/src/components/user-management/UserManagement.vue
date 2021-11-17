<template>
  <h1>User management</h1>
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
import api from "../../../api/employee";
export default {
  data() {
    return {
      employees: [],
    };
  },
  created() {
    this.fetchEmployees();
  },
  methods: {
    fetchEmployees() {
      api
        .getEmployees()
        .then((res) => {
          this.employees = res.data;
        })
        .catch((err) => this.errors.push(err.msg));
    },
    deleteEmployee(employeeId) {
      api
        .deleteEmployee(employeeId)
        .then(() => {
          this.fetchEmployees();
        })
        .catch((err) => console.log(err.msg));
    },
  },
};
</script>