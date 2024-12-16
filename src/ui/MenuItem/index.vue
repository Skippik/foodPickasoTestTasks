<template>
  <div class="t-task3__slider--item">
    <img
      class="t-task3__slider--img"
      :src="`/images/${item.img}`"
      alt="Restaurant img" />
    <div class="t-task3__slider--info">
      <h3>{{ item.title }}</h3>
      <p>{{ item.address }}</p>
      <p>{{ item.workTime }}</p>
    </div>
    <div class="t-task3__slider--footer">
      <div v-for="itemMenu in item.menu">
        <div v-if="itemMenu.link">
          <div>
            <h1>{{ menuState.name }}</h1>
            <p>{{ menuState.price }}</p>
          </div>
        </div>
        <div v-else>
          <h1>{{ itemMenu.data[0].name }}</h1>
          <p>{{ item.totalPrice }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, reactive} from 'vue';
import {Restaurant} from '../../types';

interface MenuItem {
  name: string;
  price: number;
}

export default defineComponent({
  name: 'MenuItem',
  props: {
    item: {
      type: Object as PropType<Restaurant>,
      required: true,
    },
  },
  setup(props) {
    const menuState = reactive<Record<string, MenuItem>>({});

    //
    const menu = props.item.menu;

    const initializeMenuState = () => {
      Object.keys(menu).forEach(key => {
        const category = menu[key as keyof typeof menu];

        if (category.link && category.data.length > 0) {
          menuState[key] = {
            name: category.data[0].name,
            price: category.data[0].price,
          };
        }
      });
    };

    onMounted(() => {
      initializeMenuState();
    });

    return {
      menuState,
    };
  },
});
</script>
