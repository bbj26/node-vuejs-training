<template>
  <div class="container">
    <div v-if="employees !== []" class="employees">
      <h3>Employees</h3>
      <div
        class="employee-list"
        v-for="employee in employees"
        :key="employee._id"
      >
        <div class="employee">
          <a
            :class="'emp'"
            @click="
              fetchEmployeeTasks(employee._id);
              markActiveEmployee($event);
            "
            >{{ employee.name }}</a
          >
        </div>
      </div>
    </div>
    <div class="tasks">
      <h1>Tasks</h1>
      <Tasks
        :tasks="employeeTasks"
        :completedTasks="tasksCompleted"
        :totalTasks="totalTasks"
        @deleteTaskEvent="fetchEmployeeTasks(employeeId)"
      />
    </div>
  </div>
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
      employeeId: "",
      tasksCompleted: 0,
      totalTasks: 0,
    };
  },
  methods: {
    fetchEmployeeTasks(id) {
      this.employeeId = id;
      tasksApi
        .fetchEmployeeTasks(id)
        .then((res) => {
          this.employeeTasks = res.data;
          this.tasksCompleted = this.employeeTasks
            .reduce(
              (accumulator, currentValue) => accumulator.concat(currentValue),
              []
            )
            .filter((task) => task.completed).length;
          this.totalTasks = this.employeeTasks.length;
        })
        .catch((err) => (this.errors = err));
    },
    markActiveEmployee(evt) {
      let employees = document.querySelectorAll(".emp");
      employees.forEach((emp) => {
        emp.classList.remove("marked");
      });
      evt.target.classList.add("marked");
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
}
.employees,
.tasks {
  min-width: 200px;
  width: 2 fr;
  border: 1px solid red;
  padding: 30px;
}
.tasks {
  min-width: 650px;
  border: 1px solid blue;
}
.employee {
  padding: 5px;
  margin: 5px;
}
.marked {
  font-weight: bold;
  color: blue;
}
</style>