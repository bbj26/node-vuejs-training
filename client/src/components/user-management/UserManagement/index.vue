<template>
  <h1>User management</h1>
  <AddUserForm />
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
import tasksApi from "../../../../api/task";
import AddUserForm from "../AddUserForm";
export default {
  components: {
    AddUserForm,
  },
  data() {
    return {
      employees: [],
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
      api
        .getEmployees()
        .then((res) => {
          this.employees = res.data;
        })
        .catch((err) => this.errors.push(err.msg));
    },
    deleteEmployee(employeeId) {
      tasksApi
        .deleteEmployeeTasks(employeeId)
        .then(
          api.deleteEmployee(employeeId).then(() => {
            this.fetchEmployees();
          })
        )
        .catch((err) => console.log(err.msg));
    },
  },
};
</script>