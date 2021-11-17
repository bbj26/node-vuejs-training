<template>
  <va-navbar color="primary" shape class="mb-4 h-100">
    <template #left>
      <va-navbar-item>
        <router-link to="/">Dashboard</router-link>
      </va-navbar-item>
      <va-navbar-item>
        <router-link to="user-management">User Managment</router-link>
      </va-navbar-item>
    </template>
  </va-navbar>
</template>

<script>
export default {};
</script>

<style scoped>
</style>