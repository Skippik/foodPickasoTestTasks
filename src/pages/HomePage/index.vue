<template>
  <div class="t-home">
    <h1 class="t-home__title t-title">Test task Volkov E.V</h1>
    <div class="t-home__wrapper">
      <router-link to="/users">
        <button class="t-home__btn t-btn">Task #1</button>
      </router-link>
      <router-link to="/">
        <button class="t-home__btn t-btn">Task #2</button>
      </router-link>
      <router-link to="/">
        <button class="t-home__btn t-btn">Task #3</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Home',
});
</script>
