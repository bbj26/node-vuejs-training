<template>
  <h1>Employee Tasks</h1>
  <div v-if="tasks !== []">
    <div v-for="task in tasks" :key="task._id">
      <div class="title">{{ task.name }}</div>
      <div class="deadline">{{ formatDate(task.deadline) }}</div>
      <input
        type="checkbox"
        :disabled="!isDeadlineValid(task.deadline)"
        v-model="task.completed"
        @click="toggleCompletedTask(task._id)"
        class="completed"
      />
      <button class="btn" @click.prevent="deleteTask(task._id)">Delete</button>
    </div>
  </div>
</template>

<script>
import api from "../../../../api/task";
export default {
  props: ["tasks"],
  emits: ["deleteTaskEvent"],
  data() {
    return {
      error: null,
      taskDeadline: null,
    };
  },
  methods: {
    deleteTask(id) {
      api
        .deleteTask(id)
        .then(() => {
          this.emitDeleteTaskEvent();
        })
        .catch((err) => (this.error = err));
    },
    emitDeleteTaskEvent() {
      this.$emit("deleteTaskEvent");
    },
    toggleCompletedTask(taskId) {
      api.toggleCompleteTask(taskId).catch((err) => (this.error = err));
    },
    isDeadlineValid(deadLine) {
      let deadline = new Date(deadLine);
      let now = new Date();
      return now > deadline ? false : true;
    },
    formatDate(deadline) {
      let date = new Date(deadline);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;

      date = `${day}.${month}.${year}`;
      return date;
    },
  },
};
</script>

<style scoped>
.title,
.completed,
.deadline,
.btn {
  padding: 3px 10px;
  margin: 5px;
}
</style>