<template>
  <div class="container">
    <form class="task-form">
      <h3>Create new task</h3>
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Task name..."
        v-model="taskName"
      />
      <label for="deadline">Deadline</label>
      <input
        type="date"
        id="deadline"
        name="deadline"
        placeholder="Task completion deadline..."
        v-model="taskDeadline"
      />
      <label for="cars">Assign to:</label>

      <select
        v-if="employees"
        name="emloyees"
        id="employees"
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
    </form>
  </div>
</template>

<script>
import api from "../../../../api/task";
export default {
  props: ["employees"],
  data() {
    return {
      taskName: "",
      taskDeadline: null,
      employeeId: "",
    };
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
        .catch((err) => console.log(err));
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
  margin: 30px;
  padding: 30px;
}

.task-form input {
  padding: 5px;
  margin: 5px;
}
</style>