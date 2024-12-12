<template>
  <div class="t-users">
    <div class="t-users__header">
      <button @click="goBack" class="t-users__header--btn t-btn">
        <img src="../../assets/icons/back.svg" alt="Go back" class="icon" />
      </button>

      <h1 class="t-users__header--title t-title">Task #1</h1>
    </div>

    <div v-if="loading" class="t-loading">
      <div class="t-loading__spinner"></div>
      <p>Loading...</p>
    </div>

    <div v-else class="t-users__wrapper">
      <div v-for="user in users" :key="user.id" class="t-users__item">
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
import {defineComponent, ref, onMounted} from 'vue';
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
  name: 'UsersPage',
  setup() {
    const router = useRouter();
    //
    const users = ref<UserType[]>([]);
    //
    const loading = ref(true);

    const goBack = () => {
      router.back();
    };

    const getUsers = async () => {
      try {
        const resp = await axios.get<UserType[]>(
          'https://jsonplaceholder.typicode.com/users',
        );
        users.value = resp.data;
      } catch (err) {
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      getUsers();
    });

    return {goBack, users, loading};
  },
});
</script>
