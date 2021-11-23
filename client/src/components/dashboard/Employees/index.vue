<template>
  <div class="container">
    <div v-if="employees !== []" class="employees">
      <h3>Employees</h3>
      <div>
        <va-divider class="mt-2 mb-2" />
      </div>
      <div
        class="employee-list"
        v-for="employee in employees"
        :key="employee._id"
      >
        <div class="employee">
          <a
            :class="'emp'"
            @click="
              markActiveEmployee($event);
              fetchEmployeeTasks(employee._id);
            "
            >{{ employee.name }}</a
          >
        </div>
      </div>
    </div>
    <div class="tasks">
      <h1>Tasks</h1>
      <div class="labels">
        <div class="t-label">Name</div>
        <div class="t-label">Deadline</div>
        <div class="t-label">Completed</div>
        <div class="t-label-action">Action</div>
      </div>
      <div>
        <va-divider class="mt-0 mb-2" />
      </div>
      <Tasks
        :tasks="employeeTasks"
        :completedTasks="tasksCompleted"
        :totalTasks="totalTasks"
        @deleteTaskEvent="refreshTasks"
      />
    </div>
  </div>
</template>

<script>
import Tasks from "../Tasks/index.vue";
import store from "../../../store/index";
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
    fetchEmployeeTasks(employeeId) {
      this.employeeTasks = store.getters.employeeTasks(employeeId);
      this.tasksCompleted = this.employeeTasks
        .reduce(
          (accumulator, currentValue) => accumulator.concat(currentValue),
          []
        )
        .filter((task) => task.completed).length;
      this.totalTasks = this.employeeTasks.length;
    },
    refreshTasks(employeeId) {
      this.employeeTasks = store.getters.employeeTasks(employeeId);
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
.labels {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 5px 0px;
}
.t-label {
  padding: 3px 10px;
  margin: 5px;
  min-width: 150px;
  max-width: 150px;
  text-align: left;
}
.t-label-action {
  padding: 3px 10px;
  margin: 5px;
  min-width: 80px;
  text-align: left;
}
.employees {
  min-width: 200px;
  width: 1 fr;
  padding: 30px;
  border-right: 1px solid grey;
  min-height: 500px;
}
.tasks {
  width: 3 fr;
  min-width: 650px;
  padding: 30px;
}
.employee {
  padding: 5px;
  margin: 5px;
}
.marked {
  font-weight: bold;
  color: #0c689e;
}
</style>