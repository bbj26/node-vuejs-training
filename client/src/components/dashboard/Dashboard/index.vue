<template>
  <div>
    <h1>Dashboard</h1>
    <va-divider class="mt-3 mb-0" />
    <div class="loading-icon flex lg6 xs12 py-4" v-if="$store.state.isLoading">
      <va-progress-circle indeterminate />
    </div>
    <AddTaskForm :employees="$store.state.employees" />
    <va-divider class="mt-0 mb-2" />
    <Employees
      v-if="$store.state.employees.length"
      :employees="$store.state.employees"
    />
    <va-divider class="mt-3 mb-3" />
  </div>
</template>

<script>
import store from "../../../store/index";
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
      defaultEmployeeId: null,
    };
  },
  created() {
    store.dispatch("fetchEmployees");
    store.dispatch("fetchAllTasks");
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