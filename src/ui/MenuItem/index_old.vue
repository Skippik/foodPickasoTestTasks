<template>
  <div class="t-task3__slider--item">
    <a href="" class="t-task3__slider--link">
      <img
        class="t-task3__slider--link--img"
        :src="`/images/${item.img}`"
        alt="Restaurant img" />
      <i></i>
    </a>
    <div class="t-task3__slider--info">
      <h3>{{ item.title }}</h3>
      <p>{{ item.address }}</p>
      <p>{{ item.workTime }}</p>
    </div>
    <div
      class="t-task3__slider--footer"
      v-for="(menuCategory, key) in item.menu"
      :key="key">
      <div v-if="menuCategory.link">
        <div class="t-task3__slider--footer--info link">
          <h1 @click="openPopup(key)">
            {{ menuState[key]?.name }}
          </h1>
          <p>{{ menuState[key]?.price.toFixed(2) }}</p>
        </div>
      </div>
      <div v-else>
        <div class="t-task3__slider--footer--info not-link">
          <h1>{{ menuCategory.data[0].name }}</h1>
        </div>
      </div>
    </div>
    <div class="t-task3__popup" :class="state.open && 'open'">
      <div class="t-task3__popup--header">
        <h1 class="t-task3__popup--header--title">{{ state.popupTitle }}</h1>
        <div @click="closePopup" class="t-task3__popup--header--close">
          <span class="close-icon">×</span>
        </div>
      </div>
      <div class="t-task3__popup--items">
        <div
          v-for="item in state.selectedMenuItem"
          :key="item.name"
          class="t-task3__popup--item">
          <label
            class="t-task3__popup--item--wrapper"
            :for="`checkbox-${item.name}`">
            <input
              :id="`checkbox-${item.name}`"
              @change="toggleSelection(item)"
              type="checkbox"
              v-model="item.selected" />

            <p>{{ item.name }}</p>
            <p class="price">{{ `${item.price.toFixed(2)} р` }}</p>
          </label>
        </div>
      </div>
      <button class="t-task3__popup--recalc" @click="recalculateTotalPrice">
        Пересчитать цену обеда
      </button>
    </div>
    <div
      class="t-task3__slider--footer--info total-price"
      v-if="item.totalPrice">
      <p>
        {{ `${item.totalPrice.toFixed(2)} р` }}
      </p>
    </div>
    <div class="t-task3__slider--footer--info total-price" v-else>
      <p>{{ `${calcTotalPrice.toFixed(2)} р` }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  toRaw,
} from 'vue';
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
    });
    //
    const menu = props.item.menu;

    const initializeMenuState = () => {
      Object.keys(menu).forEach(key => {
        const category = menu[key as keyof typeof menu];

        if (category.link && category.data.length > 0) {
          menuState[key] = [
            {
              name: category.data[0].name,
              price: category.data[0].price,
              selected: false,
            },
          ];
        }
      });
    };
    //
    const calcTotalPrice = computed(() => {
      return Object.values(menuState).reduce(
        (acc, menuItem) => acc + menuItem[0].price,
        0,
      );
    });
    //
    const recalculateTotalPrice = () => {
      const total = Object.values(menuState).reduce(
        (acc, item) => acc + item.price,
        0,
      );
      closePopup();
    };
    //
    const openPopup = (key: string) => {
      const menuData = menu[key as keyof typeof menu];
      state.popupTitle = configPopupTitle[key as keyof typeof configPopupTitle];
      state.open = true;
      if (menuData.link) {
        menuState = menuData.data.map(item => ({
          ...item,
          selected: false,
        }));
      }
    };
    //
    const toggleSelection = (menuItem: SelectedMenuItem) => {
      menuItem.selected = !menuItem.selected;
      const index = menuState.findIndex(item => item.name === menuItem.name);

      if (index !== -1) {
        const updatedItem = {
          ...state.selectedMenuItem[index],
          selected: !state.selectedMenuItem[index].selected,
        };

        state.selectedMenuItem = state.selectedMenuItem.map((item, idx) =>
          idx === index ? updatedItem : item,
        );
      }
    };

    //
    const closePopup = () => {
      state.open = false;
      state.selectedMenuItem = [];
    };

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
