<template>
  <h1>Dashboard</h1>
  <div>
    <va-divider class="mt-3 mb-0" />
  </div>
  <div class="loading-icon flex lg6 xs12 py-4" v-if="$store.getters.isLoading">
    <va-progress-circle indeterminate />
  </div>
  <AddTaskForm :employees="employees" />
  <div>
    <va-divider class="mt-0 mb-2" />
  </div>
  <Employees :employees="employees" ref="employeesComponent" />
  <div>
    <va-divider class="mt-3 mb-3" />
  </div>
</template>

<script>
import { useStore } from "vuex";
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
      tasks: [],
      error: null,
      isLoading: false,
    };
  },
  created() {
    const store = useStore();
    store
      .dispatch("fetchEmployees")
      .then(() => (this.employees = store.getters.employees));
    store
      .dispatch("fetchAllTasks")
      .then(() => (this.tasks = store.getters.tasks));
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