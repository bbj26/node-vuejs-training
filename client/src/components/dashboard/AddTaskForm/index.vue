<template>
  <div>
    <form class="task-form">
      <h3>Create new task</h3>
      <div class="container">
        <label for="name" class="label">Name</label>
        <va-input class="name" v-model="taskName" placeholder="Task name..." />

        <label for="deadline" class="label">Deadline</label>
        <va-date-input
          v-model="taskDeadline"
          class="deadline"
          placeholder="Task deadline..."
        />

        <label for="employees" class="label">Assign to:</label>
        <select
          v-if="employees"
          name="emloyees"
          id="employees"
          class="employees"
          v-model="employeeId"
        >
          <option
            v-for="employee in $store.state.employees"
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
import store from "../../../store/index";
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
  methods: {
    createTask() {
      store
        .dispatch("createTask", {
          empId: this.employeeId,
          name: this.taskName,
          deadline: this.taskDeadline,
        })
        .then(() => {
          this.taskName = "";
          this.taskDeadline = null;
          this.employeeId = "";
        })
        .catch((err) => (this.error = err));
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

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
.task-form input,
select {
  padding: 5px;
  margin: 5px;
  min-height: 40px;
}
.label {
  padding: 5px;
  margin-left: 10px;
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