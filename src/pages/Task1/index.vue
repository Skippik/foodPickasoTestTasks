<template>
  <div class="t-task1">
    <div class="t-header">
      <button @click="goBack" class="t-header--btn t-btn">
        <img src="../../assets/icons/back.svg" alt="Go back" class="icon" />
      </button>

      <h1 class="t-header--title t-title">Task #1</h1>
    </div>

    <div v-if="state.loading" class="t-loading">
      <div class="t-loading__spinner"></div>
      <p>Loading...</p>
    </div>

    <div v-else class="t-task1__wrapper">
      <div v-for="user in state.users" :key="user.id" class="t-task1__item">
        <h3>{{ user.name }}</h3>
        <p>
          <a :href="'mailto:' + user.email">{{ user.email }}</a>
        </p>
        <p>
          <a :href="'tel:' + user.phone">{{ user.phone }}</a>
        </p>
        <p>
          <a :href="'https://' + user.website" target="_blank">{{
            user.website
          }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import {defineComponent, onMounted, reactive} from 'vue';
import {useRouter} from 'vue-router';

interface UserType {
  id: number;
  email: string;
  name: string;
  phone: string;
  username: string;
  website: string;
}

export default defineComponent({
  name: 'Task1Page',
  setup() {
    const router = useRouter();
    //
    const state = reactive({
      users: [] as UserType[],
      loading: true,
    });

    const goBack = () => {
      router.back();
    };

    const getUsers = async function () {
      try {
        const resp = await axios.get<UserType[]>(
          'https://jsonplaceholder.typicode.com/users',
        );
        state.users = resp.data;
      } catch (err) {
        console.error(err);
      } finally {
        state.loading = false;
      }
    };

    onMounted(() => {
      getUsers();
    });

    return {goBack, state};
  },
});
</script>
