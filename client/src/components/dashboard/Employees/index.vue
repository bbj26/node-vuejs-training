<template>
  <h3>Employees</h3>
  <div v-if="employees !== []">
    <div
      class="employee-list"
      v-for="employee in employees"
      :key="employee._id"
    >
      <div class="employee">
        <a @click="fetchEmployeeTasks(employee._id)">{{ employee.name }}</a>
      </div>
    </div>
  </div>
  <Tasks :tasks="employeeTasks" />
</template>

<script>
import tasksApi from "../../../../api/task";
import Tasks from "../Tasks/index.vue";
export default {
  props: ["employees"],
  components: {
    Tasks,
  },
  data() {
    return {
      employeeTasks: [],
      errors: [],
    };
  },
  methods: {
    fetchEmployeeTasks(id) {
      tasksApi
        .fetchEmployeeTasks(id)
        .then((res) => (this.employeeTasks = res.data))
        .catch((err) => (this.errors = err));
    },
  },
};
</script>

<style scoped>
.employee {
  padding: 5px;
  margin: 5px;
}
.employee:active {
  background-color: yellow;
  border: 1px solid black;
}
</style>