export type Restaurant = {
  id: number;
  title: string;
  address: string;
  workTime: string;
  img: string;
  totalPrice: number;
  menu: {
    appetizers: {
      link: boolean;
      data: {
        name: string;
        price: number;
      }[];
    };
    soups: {
      link: boolean;
      data: {
        name: string;
        price: number;
      }[];
    };
    hotDishes: {
      link: boolean;
      data: {
        name: string;
        price: number;
      }[];
    };
  };
};
