<template>
  <div v-if="tasks !== [] && !error">
    <div v-for="task in tasks" :key="task._id" class="task">
      <div class="title">{{ task.name }}</div>
      <div class="deadline">{{ formatDate(task.deadline) }}</div>
      <va-checkbox
        type="checkbox"
        :disabled="isExpired(task.deadline)"
        v-model="task.completed"
        @click="toggleCompletedTask(task._id)"
        class="completed"
      />
      <va-button
        color="danger"
        @click.prevent="deleteTask(task._id)"
        :disabled="isExpired(task.deadline)"
      >
        DELETE
      </va-button>
    </div>
  </div>
  <div :class="isAllCompleted() ? 'done total-completed' : 'total-completed'">
    {{ completedTasks }} out of {{ totalTasks }} tasks completed
  </div>
</template>

<script>
import api from '../../../../api/task';
import store from '../../../store/index';
import moment from 'moment';

export default {
  props: ['tasks', 'completedTasks', 'totalTasks'],
  data() {
    return {
      error: null,
    };
  },
  methods: {
    deleteTask(id) {
      store.dispatch('deleteTask', { taskId: id });
    },
    toggleCompletedTask(taskId) {
      api.toggleCompleteTask(taskId).catch((err) => (this.error = err));
    },
    isExpired(deadLine) {
      let deadline = new Date(deadLine);
      let now = new Date();
      return now > deadline ? true : false;
    },
    formatDate(deadline) {
      return moment(deadline).format('DD.MM.YYYY.');
    },
    isAllCompleted() {
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