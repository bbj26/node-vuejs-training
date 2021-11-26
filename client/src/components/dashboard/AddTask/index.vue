<template>
  <div>
    <form class="task-form">
      <h3>Create new task</h3>
      <div class="container">
        <label for="name" class="label">Name</label>
        <va-input v-model="task.name" placeholder="Task name..." class="name" />
        <label for="deadline" class="label">Deadline</label>
        <va-date-input
          v-model="task.deadline"
          :clearable="true"
          highlight-weekend
          first-weekday="Monday"
          placeholder="Task deadline..."
          class="deadline"
        />
        <va-button
          type="submit"
          @click.prevent="create"
          :disabled="
            !this.task.name.length || !this.task.deadline || !this.employeeId
          "
        >
          Create
        </va-button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ['employeeId'],
  data() {
    return {
      error: null,
      task: {
        name: '',
        deadline: null,
        employeeId: '',
      },
    };
  },
  methods: {
    ...mapActions(['createTask']),
    create() {
      this.task.employeeId = this.employeeId;
      this.createTask(this.task)
        .then(() => this.resetForm())
        .catch((err) => (this.error = err));
    },
    resetForm() {
      this.task.name = '';
      this.task.deadline = null;
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