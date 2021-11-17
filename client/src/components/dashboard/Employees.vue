<template>
  <h3>Employees</h3>
  <div v-if="employees.length > 0">
    <div
      class="employee-list"
      v-for="employee in employees"
      :key="employee._id"
    >
      {{ employee.name }}
    </div>
  </div>
</template>

<script>
import api from "../../../api/employee";
export default {
  data() {
    return {
      employees: [],
      errors: [],
    };
  },
  created() {
    api
      .getEmployees()
      .then((res) => {
        this.employees = res.data;
      })
      .catch((err) => this.errors.push(err.msg));
  },
};
</script>