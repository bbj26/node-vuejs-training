<template>
  <h1>Dashboard</h1>
  <div>
    <va-divider class="mt-3 mb-0" />
  </div>
  <div class="loading-icon flex lg6 xs12 py-4" v-if="isLoading">
    <va-progress-circle indeterminate />
  </div>
  <AddTaskForm :employees="employees" />
  <div>
    <va-divider class="mt-0 mb-2" />
  </div>
  <Employees :employees="employees" />
  <div>
    <va-divider class="mt-3 mb-3" />
  </div>
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