<template>
  <div class="t-task3-slider__item">
    <a href="" class="t-task3-slider__link">
      <img
        class="t-task3-slider__link--img"
        :src="`/images/${item.img}`"
        alt="Restaurant img" />
      <i class="t-task3-slider__link--icon"></i>
    </a>
    <div class="t-task3-slider__info">
      <h3 class="t-task3-slider__title">{{ item.title }}</h3>
      <p class="t-task3-slider__address">{{ item.address }}</p>
      <p class="t-task3-slider__work-time">{{ item.workTime }}</p>
    </div>
    <div
      class="t-task3-slider__footer"
      v-for="(menuCategory, key) in item.menu"
      :key="key">
      <div v-if="menuCategory.link">
        <div v-if="menuState[key]?.some(item => item.selected)">
          <div v-for="menuItem in menuState[key]" :key="menuItem.name">
            <div
              v-if="menuItem.selected"
              class="t-task3-slider__footer-info t-task3-slider__footer-info--link">
              <h1 @click="openPopup(key)">
                {{ menuItem.name }}
              </h1>
              <p>{{ menuItem.price.toFixed(2) }}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <div
            class="t-task3-slider__footer-info t-task3-slider__footer-info--link">
            <h1 @click="openPopup(key)">Выбрать блюда</h1>
          </div>
        </div>
      </div>
      <div v-else>
        <div
          class="t-task3-slider__footer-info t-task3-slider__footer-info--not-link">
          <h1>{{ menuCategory.data[0].name }}</h1>
        </div>
      </div>
    </div>
    <div class="t-task3-popup" :class="{'t-task3-popup--open': state.open}">
      <div class="t-task3-popup__header">
        <h1 class="t-task3-popup__title">{{ state.popupTitle }}</h1>
        <div @click="closePopup" class="t-task3-popup__close">
          <span class="t-task3-popup__close-icon">×</span>
        </div>
      </div>
      <div class="t-task3-popup__items">
        <div
          v-for="item in menuState[state.popupCategory]"
          :key="item.name"
          class="t-task3-popup__item">
          <label class="t-task3-popup__label" :for="`checkbox-${item.name}`">
            <div class="t-task3-popup__label--checkbox">
              <input
                :id="`checkbox-${item.name}`"
                @change="toggleSelection(item)"
                type="checkbox"
                v-model="item.selected" />
              <p>{{ item.name }}</p>
            </div>
            <p class="t-task3-popup__price">
              {{ `${item.price.toFixed(2)} р` }}
            </p>
          </label>
        </div>
      </div>
      <button class="t-task3-popup__recalc" @click="recalculateTotalPrice">
        Пересчитать цену обеда
      </button>
    </div>
    <div
      class="t-task3-slider__footer-info t-task3-slider__footer-info--total-price"
      v-if="item.totalPrice">
      <p>
        {{ `${item.totalPrice.toFixed(2)} р` }}
      </p>
    </div>
    <div
      class="t-task3-slider__footer-info t-task3-slider__footer-info--total-price"
      v-else>
      <p>{{ `${calcTotalPrice.toFixed(2)} р` }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, PropType, reactive} from 'vue';
import {Restaurant} from '../../types';

interface MenuItem {
  name: string;
  price: number;
  selected: boolean;
}

const configPopupTitle = {
  appetizers: 'Закуски',
  soups: 'Супы',
  hotDishes: 'Горячие блюда',
};

export default defineComponent({
  name: 'MenuItem',
  props: {
    item: {
      type: Object as PropType<Restaurant>,
      required: true,
    },
  },

  setup(props) {
    //
    const menuState = reactive<Record<string, MenuItem[]>>({});
    //
    const state = reactive({
      open: false,
      popupTitle: '',
      popupCategory: '',
      totalPriceCat: 0,
    });

    const menu = props.item.menu;

    const initializeMenuState = () => {
      Object.keys(menu).forEach(key => {
        const category = menu[key as keyof typeof menu];

        if (category.link && category.data.length > 0) {
          menuState[key] = category.data.map((item, index) => ({
            name: item.name,
            price: item.price,
            selected: index === 0, // Только первый элемент выбран
          }));
        }
      });
      recalculateTotalPrice();
    };

    const openPopup = (key: string) => {
      state.popupTitle = configPopupTitle[key as keyof typeof configPopupTitle];
      state.popupCategory = key;
      state.open = true;
    };

    const toggleSelection = (menuItem: MenuItem) => {
      const category = menuState[state.popupCategory];
      const itemIndex = category.findIndex(item => item.name === menuItem.name);

      if (itemIndex !== -1) {
        const updatedItem = {
          ...menuItem,
          selected: !menuItem.selected,
        };

        menuState[state.popupCategory].map((item, idx) =>
          idx === itemIndex ? updatedItem : item,
        );
      }
    };

    const closePopup = () => {
      state.open = false;
    };

    const recalculateTotalPrice = () => {
      state.totalPriceCat = menuState[state.popupCategory]?.reduce(
        (acc, item) => acc + (item.selected ? item.price : 0),
        0,
      );
      state.open = false;
    };

    const calcTotalPrice = computed(() => {
      return Object.values(menuState).reduce(
        (acc, menuItems) =>
          acc +
          menuItems.reduce(
            (itemAcc, item) => (item.selected ? itemAcc + item.price : itemAcc),
            0,
          ),
        0,
      );
    });

    onMounted(() => {
      initializeMenuState();
    });

    return {
      menuState,
      state,
      calcTotalPrice,
      openPopup,
      closePopup,
      toggleSelection,
      recalculateTotalPrice,
    };
  },
});
</script>
