<template>
  <h1 @click="logTasks">Employee Tasks</h1>
  <div v-if="tasks !== []">
    <div v-for="task in tasks" :key="task._id">
      <div>{{ task.name }}</div>
      <div>{{ task.deadline }}</div>
      <div>{{ task.completed }}</div> 
      <input
        type="checkbox"
        v-model="task.completed"
        @click="toggleCompletedTask(task._id)"
      />
      <button @click.prevent="deleteTask(task._id)">Delete</button>
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
      taskDeadline: null
    };
  },
  methods: {
    deleteTask(id) {
      api
        .deleteTask(id)
        .then((res) => {
          console.log(res.data)
          this.emitDeleteTaskEvent();
        })
        .catch((err) => (this.error = err));
    },
    emitDeleteTaskEvent() {
      this.$emit("deleteTaskEvent");
    },
    toggleCompletedTask(taskId) {
      api
        .toggleCompleteTask(taskId)
        .catch((err) => this.error = err);
    },
  },
};
</script>