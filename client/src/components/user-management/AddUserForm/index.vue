<template>
  <div class="form-container">
    <div class="container">
      <h3>Create new employee</h3>
      <form>
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Full name..."
          v-model="employeeName"
        />
        <va-button type="submit" @click.prevent="createEmployee" :disabled="!employeeName">Create</va-button>
      </form>
    </div>
  </div>
</template>

<script>
import store from "../../../store/index";
export default {
  data() {
    return {
      employeeName: "",
    };
  },
  methods: {
    createEmployee() {
      if (this.employeeName !== "") {
        store.dispatch("createEmployee", { name: this.employeeName });
        this.employeeName = ''
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  padding: 10px;
}
input[type="text"] {
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
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 10px;
}
.container form {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
</style>