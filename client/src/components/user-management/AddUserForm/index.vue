<template>
  <div class="form-container">
    <h3>Create new employee</h3>
    <div class="container">
      <form>
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Full name..."
          v-model="employeeName"
        />
        <button type="submit" @click.prevent="createEmployee">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../../../../api/employee";
export default {
  data() {
    return {
      employeeName: "",
    };
  },
  methods: {
    createEmployee() {
      if (this.employeeName !== "") {
        api
          .createEmployee({ name: this.employeeName })
          .then(() => {
            this.employeeName = "";
          })
          .catch((err) => console.log(err.msg));
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  padding: 30px;
  margin: 30px;
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
  background-color: #04aa6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

.container form {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
</style>