<template>
  <div class="t-task3">
    <div class="t-header">
      <button @click="goBack" class="t-header--btn t-btn">
        <img src="../../assets/icons/back.svg" alt="Go back" class="icon" />
      </button>

      <h1 class="t-header--title t-title">Task #3</h1>
    </div>
    <div class="t-task3__wrapper">
      <div class="t-task3__info">
        <a
          class="t-task3__info-link"
          href="https://clever.by/vitebsk/dostavka/"
          target="_blank"
          rel="noopener noreferrer"
          >Бизнес-ланчи в Витебске</a
        >

        <img
          src="../../assets/icons/clever.svg"
          class="t-task3__info-icon"
          alt="header-icon" />
      </div>
      <img
        src="../../assets/icons/background.svg"
        class="t-task3__background"
        alt="header-icon" />

      <swiper
        class="t-task3__slider"
        :slides-per-view="4"
        :navigation="{
          prevEl: prev,
          nextEl: next,
        }"
        :breakpoints="{
          360: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
            // spaceBetween: 10,
          },
          1280: {
            slidesPerView: 4,
          },
        }">
        <swiper-slide v-for="item in state.restaurants" :key="item.id">
          <MenuItem :item="item" />
        </swiper-slide>
      </swiper>
      <div ref="prev" class="t-task3-slider-btn prev">
        <img
          src="../../assets/icons/arrow.svg"
          alt="Go back"
          class="t-task3__slider-btn-icon" />
      </div>
      <div ref="next" class="t-task3-slider-btn next">
        <img
          src="../../assets/icons/arrow.svg"
          alt="Go back"
          class="t-task3__slider-btn-icon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from 'vue';
import data from './data.json';
import {useRouter} from 'vue-router';
import {register} from 'swiper/element/bundle';
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import {Restaurant} from '../../types';
import MenuItem from '../../ui/MenuItem/index.vue';

export default defineComponent({
  name: 'Task3Page',
  //
  components: {
    Swiper,
    SwiperSlide,
    MenuItem,
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

    //
    const goBack = () => {
      router.back();
    };
    //

    onMounted(() => {
      state.restaurants = data as Restaurant[];
      register();
    });
    return {state, goBack, next, prev};
  },
});
</script>
