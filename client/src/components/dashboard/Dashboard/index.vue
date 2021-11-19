<template>
  <h1>Dashboard</h1>
  <Employees :employees="employees" />
  <AddTaskForm :employees="employees" />
</template>

<script>
import employeeApi from "../../../../api/employee";
import Employees from "../Employees/index.vue";
import AddTaskForm from "../AddTaskForm/index.vue";
export default {
  components: {
    Employees,
    AddTaskForm,
  },
  data() {
    return {
      employees: [],
    };
  },
  created() {
    employeeApi
      .getEmployees()
      .then((res) => {
        this.employees = res.data;
      })
      .catch((err) => this.errors.push(err.msg));
  },
};
</script>

<style scoped>
</style>