<template>
  <h1 @click="logTasks">Employee Tasks</h1>
  <div v-if="tasks !== []">
    <div v-for="task in tasks" :key="task">
      {{ task.name }} {{ task.deadline }} {{ task.completed }}
      {{ task.createdAt }}
      <button @click.prevent="deleteTask(task._id)">Delete</button>
    </div>
  </div>
</template>

<script>
import api from "../../../../api/task";
export default {
  props: ["tasks"],
  data() {
    return {};
  },
  methods: {
    deleteTask(id) {
      api
        .deleteTask(id)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    },
  },
};
</script>