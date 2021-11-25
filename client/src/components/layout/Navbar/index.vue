<template>
  <va-navbar color="primary" shape class="mb-4 h-100">
    <template #center>
      <va-navbar-item>
        <router-link to="dashboard" class="nav-link">Dashboard</router-link>
      </va-navbar-item>
      <va-navbar-item>
        <router-link to="user-management" class="nav-link"
          >User Managment</router-link
        >
      </va-navbar-item>
    </template>
  </va-navbar>
</template>

<script>
export default {};
</script>

<style scoped>
.nav-link {
  color: white;
}
</style>