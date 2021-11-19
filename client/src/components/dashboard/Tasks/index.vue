<template>
  <h1 @click="logTasks">Employee Tasks</h1>
  <div v-if="tasks !== []">
    <div v-for="task in tasks" :key="task">
      {{ task.name }} {{ task.deadline }} {{ task.completed }}
      {{ task.createdAt }}
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
      api
        .toggleCompleteTask(taskId)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    },
  },
};
</script>