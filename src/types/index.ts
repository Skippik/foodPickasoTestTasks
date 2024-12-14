export type Restaurant = {
  id: number;
  title: string;
  address: string;
  workTime: string;
  img: string;
  menu: {
    appetizers: {
      link: boolean;
      data: {
        name: string;
        price: number;
      }[];
    };
  };
};
