export type Category = {
  title: string;
  color: 'green' | 'orange' | 'blue' | 'yellow' | 'purple';
};

export type Pill = {
  title: string;
  description: string;
  synapse: number;
  category: Category;
  imgUrl: string;
};

export type Cart = {
  shoplist: Pill[];
};

export type IOrderForm = {
  typeOfPay?: boolean;
  address?: string;
  email?: string;
  phone?: string;
};

export type SuccessForm = {
  price: number;
};
