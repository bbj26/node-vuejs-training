<template>
  <div class="container">
    <div v-if="employees.length" class="employees">
      <h1>Employees</h1>
      <va-divider class="mt-2 mb-2" />
      <div
        v-for="(employee, index) in employees"
        :key="index"
        class="employee-list"
      >
        <div class="employee">
          <a
            @click="setId(employee._id)"
            :class="{ marked: employee._id === id }"
          >
            {{ employee.name }}</a
          >
        </div>
      </div>
    </div>
    <div class="tasks">
      <h1>Tasks</h1>
      <va-divider class="mt-2 mb-2" />
      <div class="labels">
        <div class="t-label">Name</div>
        <div class="t-label">Deadline</div>
        <div class="t-label">Completed</div>
        <div class="t-label-action">Action</div>
      </div>
      <va-divider class="mt-0 mb-2" />
      <tasks
        :tasks="employeeTasks(id)"
        :completedTasks="completedTasks(id)"
        :totalTasks="totalTasks(id)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Tasks from '../Tasks';

export default {
  emits: ['idRecieved'],
  props: ['employees'],
  components: {
    Tasks,
  },
  data() {
    return {
      id: '',
    };
  },
  created() {
    this.focusFirst();
  },
  computed: {
    ...mapGetters(['employeeTasks', 'completedTasks', 'totalTasks']),
  },
  methods: {
    setId(id) {
      this.id = id;
      this.$emit('idRecieved', this.id);
    },
    focusFirst() {
      if (this.employees.length > 0) {
        this.id = this.employees[0]._id;
        this.$emit('idRecieved', this.id);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
}
.labels {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 5px 0px;
}
.t-label {
  padding: 3px 10px;
  margin: 5px;
  min-width: 150px;
  max-width: 150px;
  text-align: left;
}
.t-label-action {
  padding: 3px 10px;
  margin: 5px;
  min-width: 80px;
  text-align: left;
}
.employees {
  min-width: 200px;
  width: 1 fr;
  padding: 30px;
  border-right: 1px solid grey;
  min-height: 500px;
}
.tasks {
  width: 3 fr;
  min-width: 650px;
  padding: 30px;
}
.employee {
  padding: 5px;
  margin: 5px;
}
.marked {
  font-weight: bold;
  color: #0c689e;
}
</style>