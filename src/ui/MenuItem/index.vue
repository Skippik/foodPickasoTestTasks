<template>
  <div class="t-task2__slider">
    <img
      class="t-task2__slider--img"
      :src="`/images/${item.img}`"
      alt="Restaurant img" />
    <div class="t-task2__slider--info">
      <h3>{{ item.title }}</h3>
      <p>{{ item.address }}</p>
      <p>{{ item.workTime }}</p>
    </div>
    <div class="t-task2__slider--footer">
      <!-- <div
        class="desc"
        v-for="menuItem in item.menu"
        :id="menuItem.price.toString()">
        <h1>{{ menuItem.title }}</h1>
        <p>{{ menuItem.price }}</p>
      </div>
      <div class="total-price" v-if="totalPrice.length > 0"> -->
      <!-- <span
          >Общая стоимость:
          {{
            totalPrice
              .find(restaurant => restaurant.restaurantId === item.id)
              ?.totalPrice.toFixed(2)
          }}</span
        > -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {Restaurant} from '../../types';

export default defineComponent({
  name: 'MenuItem',
  props: {
    item: {
      type: Object as PropType<Restaurant>,
      required: true,
    },
  },
});
</script>
