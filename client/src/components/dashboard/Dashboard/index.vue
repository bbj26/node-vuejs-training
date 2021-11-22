<template>
  <h1>Dashboard</h1>
  <div class="loading-icon flex lg6 xs12 py-4" v-if="isLoading">
    <va-progress-circle indeterminate />
  </div>
  <AddTaskForm :employees="employees" />
  <Employees :employees="employees" />
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
      error: null,
      isLoading: false,
    };
  },
  created() {
    this.isLoading = true;
    employeeApi
      .getEmployees()
      .then((res) => {
        this.employees = res.data;
        this.isLoading = false;
      })
      .catch((err) => {
        this.error = err;
        this.isLoading = false;
      });
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
</style>