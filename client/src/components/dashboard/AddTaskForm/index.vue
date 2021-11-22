<template>
  <div>
    <form class="task-form">
      <h3>Create new task</h3>
      <div class="container">
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          class="name"
          placeholder="Task name..."
          v-model="taskName"
        />
        <label for="deadline">Deadline</label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          class="deadline"
          v-model="taskDeadline"
          :min="today"
          max="2099-12-31"
        />

        <label for="employees">Assign to:</label>
        <select
          v-if="employees"
          name="emloyees"
          id="employees"
          class="employees"
          v-model="employeeId"
        >
          <option
            v-for="employee in employees"
            :key="employee._id"
            :value="employee._id"
          >
            {{ employee.name }}
          </option>
        </select>
        <button type="submit" @click.prevent="createTask">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "../../../../api/task";
export default {
  props: ["employees"],
  data() {
    return {
      error: null,
      taskName: "",
      taskDeadline: null,
      employeeId: "",
      today: null,
    };
  },
  created() {
    this.today = this.getToday();
  },
  methods: {
    createTask() {
      api
        .createTask(this.employeeId, {
          name: this.taskName,
          deadline: this.taskDeadline,
        })
        .then(() => {
          this.taskName = "";
          this.taskDeadline = null;
        })
        .catch((err) => (this.error = err));
    },
    getToday() {
      var today = new Date();
      var day = today.getDate();
      var month = today.getMonth() + 1;
      var year = today.getFullYear();

      day = day < 10 ? "0" + day : day;
      month = month < 10 ? "0" + month : month;

      today = year + "-" + month + "-" + day;
      return today;
    },
  },
};
</script>

<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f2f2f2;
}
.task-form input {
  padding: 5px;
  margin: 5px;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 40px;
}
.name,
.deadline,
.employees {
  width: 250px;
}
button {
  background-color: #0c689e;
  color: white;
  padding: 12px 20px;
  margin: 0px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #06506d;
}
</style>