<template>
    <header>
      <div class="header-inner">
        <div class="header-logo">
          <img src="../assets/pinialogo.svg" alt="">
          <h1>Pinia tasks</h1>
        </div>
        <ul class="nav-routes">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/tasks">Tasks</RouterLink>
        </ul> 
      </div>
    </header>
</template>

<script setup>
import {RouterLink} from 'vue-router'
</script>

<style lang="scss" scoped>

</style>