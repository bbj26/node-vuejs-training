<template>
  <div class="padding-10">
    <div class="management-container padding-10">
      <h3>Create new employee</h3>
      <form>
        <label for="name">Name</label>
        <input
          v-model="name"
          type="text"
          id="name"
          name="name"
          placeholder="Full name..."
          class="name-input"
        />
        <va-button @click.prevent="create" :disabled="!name" type="submit"
          >Create</va-button
        >
      </form>
    </div>
    <p v-if="errors.employeeCreationErrors.length" class="error-msg padding-10">
      FAILED: {{ errors.employeeCreationErrors }}
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      name: '',
    };
  },
  computed: {
    ...mapState(['errors']),
  },
  methods: {
    ...mapActions(['createEmployee']),
    create() {
      this.createEmployee({ name: this.name });
      this.resetForm();
    },
    resetForm() {
      this.name = '';
    },
  },
};
</script>

<style scoped>
.padding-10 {
  padding: 10px;
}
.name-input {
  width: 40%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}
button {
  background-color: #0c689e;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #06506d;
}
.management-container {
  border-radius: 5px;
  background-color: #f2f2f2;
}
.management-container form {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
.error-msg {
  color: red;
}
</style>