<template>
  <div class="container">
    <div v-if="employees !== []" class="employees">
      <h3>Employees</h3>
      <div>
        <va-divider class="mt-2 mb-2" />
      </div>
      <div
        class="employee-list"
        v-for="(employee,index) in employees"
        :key="index"
      >
        <div class="employee">
          <a :class="{marked: employee._id === employeeId}" @click="getEmployeeId(employee._id)" >{{
            employee.name
          }}</a>
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
        :tasks="$store.getters.employeeTasks(employeeId)"
        :completedTasks="$store.getters.completedTasks(employeeId)"
        :totalTasks="$store.getters.totalTasks(employeeId)"
      />
    </div>
  </div>
</template>

<script>
import Tasks from "../Tasks/index.vue";
export default {
  props: ["employees"],
  components: {
    Tasks,
  },
  data() {
    return {
      employeeId: "",
    };
  },
  created() {
    if (this.employees && this.employees.length > 0) {
      let id = this.employees[0]._id
      this.employeeId = id
    }
  },
  methods: {
    getEmployeeId(employeeId) {
      this.employeeId = employeeId;
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