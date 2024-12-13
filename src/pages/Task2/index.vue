<template>
  <div class="t-task2">
    <div class="t-header">
      <button @click="goBack" class="t-header--btn t-btn">
        <img src="../../assets/icons/back.svg" alt="Go back" class="icon" />
      </button>

      <h1 class="t-header--title t-title">Task #2</h1>
    </div>
    <div class="t-task2__wrapper">
      <swiper
        class="t-slider"
        :slides-per-view="4"
        :space-between="10"
        :navigation="{
          prevEl: prev,
          nextEl: next,
        }">
        <swiper-slide v-for="item in state.restaurants" :key="item.id">
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
              <div
                class="desc"
                :class="{sale: menuItem.sale}"
                v-for="menuItem in item.menu"
                :id="menuItem.price.toString()">
                <h1>{{ menuItem.title }}</h1>
                <p>{{ menuItem.price }}</p>
              </div>
              <div class="total-price" v-if="totalPrice.length > 0">
                <span
                  >Общая стоимость:
                  {{
                    totalPrice
                      .find(restaurant => restaurant.restaurantId === item.id)
                      ?.totalPrice.toFixed(2)
                  }}</span
                >
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div ref="prev" class="swiper-button-prev">
        <img
          src="../../assets/icons/back.svg"
          alt="Go back"
          class="swiper-button-prev-icon" />
      </div>
      <div ref="next" class="swiper-button-next">
        <img
          src="../../assets/icons/back.svg"
          alt="Go back"
          class="swiper-button-prev-icon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref} from 'vue';

import data from './data.json';
import {useRouter} from 'vue-router';
import {register} from 'swiper/element/bundle';
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';

interface Restaurant {
  id: number;
  title: string;
  address: string;
  workTime: string;
  img: string;
  menu: {
    title: string;
    price: number;
    sale: boolean;
  }[];
}

export default defineComponent({
  name: 'Task2Page',
  //
  components: {
    Swiper,
    SwiperSlide,
  },
  //
  setup() {
    const router = useRouter();
    //
    const prev = ref(null);
    const next = ref(null);
    //
    const state = reactive({
      restaurants: [] as Restaurant[],
    });
    //
    const totalPrice = computed(() => {
      return state.restaurants.map(restaurant => {
        const total = restaurant.menu.reduce(
          (acc, menuItem) => acc + menuItem.price,
          0,
        );
        return {
          restaurantId: restaurant.id,
          totalPrice: total,
        };
      });
    });
    //
    const goBack = () => {
      router.back();
    };
    //

    onMounted(() => {
      state.restaurants = data as Restaurant[];
      register();
    });
    return {state, goBack, next, prev, totalPrice};
  },
});
</script>
