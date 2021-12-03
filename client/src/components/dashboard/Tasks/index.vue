<template>
  <div>
    <div v-if="tasks.length && !error">
      <div v-for="task in tasks" :key="task._id" class="task">
        <div class="task-title">{{ task.name }}</div>
        <div class="deadline">{{ formatDate(task.deadline) }}</div>
        <va-checkbox
          v-model="task.completed"
          @click="toggleCompleted(task._id)"
          :disabled="isExpired(task.deadline)"
          class="task-completed"
        />
        <va-button
          @click.prevent="remove(task._id)"
          :disabled="isExpired(task.deadline)"
          color="danger"
        >
          DELETE
        </va-button>
      </div>
    </div>
    <div :class="isAllCompleted() ? 'done total-completed' : 'total-completed'">
      {{ completedTasks }} out of {{ totalTasks }} tasks completed
    </div>
  </div>
</template>

<script>
import api from '../../../../api/task';
import { parseISO, format, isAfter } from 'date-fns';
import { mapActions } from 'vuex';

export default {
  props: ['tasks', 'completedTasks', 'totalTasks'],
  data() {
    return {
      error: null,
    };
  },
  methods: {
    ...mapActions(['deleteTask']),
    remove(id) {
      this.deleteTask({ taskId: id });
    },
    toggleCompleted(id) {
      api.toggleCompleted(id).catch((err) => (this.error = err));
    },
    isExpired(deadline) {
      let now = new Date(format(Date.now(), 'yyyy-MM-dd'));
      deadline = new Date(deadline);
      return isAfter(now, deadline);
    },
    formatDate(deadline) {
      return format(parseISO(deadline), 'dd.MM.yyyy.');
    },
    isAllCompleted() {
      return this.totalTasks === this.completedTasks;
    },
  },
};
</script>

<style scoped>
.task-title,
.task-completed,
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
.error-msg {
  padding: 5px;
  color: red;
}
</style>