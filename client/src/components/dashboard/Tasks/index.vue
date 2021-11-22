<template>
  <div v-if="tasks !== []">
    <div v-for="task in tasks" :key="task._id" class="task">
      <div class="title">{{ task.name }}</div>
      <div class="deadline">{{ formatDate(task.deadline) }}</div>
      <input
        type="checkbox"
        :disabled="!isDeadlineValid(task.deadline)"
        v-model="task.completed"
        @click="toggleCompletedTask(task._id)"
        class="completed"
      />
      <button class="btn" @click.prevent="deleteTask(task._id)">DELETE</button>
    </div>
  </div>
  <div
    :class="checkCompletedTasks() ? 'done total-completed' : 'total-completed'"
    v-if="completedTasks"
  >
    {{ completedTasks }} out of {{ totalTasks }} tasks completed
  </div>
</template>

<script>
import api from "../../../../api/task";
export default {
  props: ["tasks", "completedTasks", "totalTasks"],
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
    checkCompletedTasks() {
      return this.totalTasks === this.completedTasks;
    },
  },
};
</script>

<style scoped>
.title,
.completed,
.deadline {
  padding: 3px 10px;
  margin: 5px;
  min-width: 150px;
  max-width: 150px;
  text-align: left;
}
.btn {
  padding: 3px 10px;
  margin: 5px;
  min-width: 80px;
  color: red;
}
.task {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0px;
}
.total-completed {
  color: lightsalmon;
  padding: 10px;
}
.done {
  color: green;
}
</style>