export type Category = {
  title: string;
  color: 'green' | 'orange' | 'blue' | 'yellow' | 'purple'
}
export type Pill = {
  title: string;
  description: string;
  synapse: number;
  category: Category;
  imgUrl: string;
}

export type Basket = {
  shoplist: Pick<Pill, 'title' | 'synapse'>[];
};

export type IOrderForm = {
  address?: string;
  email?: string;
  phone?: string;
}
export type SuccessForm = {
  price: number;
}