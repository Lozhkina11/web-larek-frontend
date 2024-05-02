export type CategoryTitle = {
  title: 'софт-скил' | 'хард-скил' | 'другое' | 'дополнительное' | 'кнопка';
}

export type Category = {
  title: CategoryTitle;
  color: 'green' | 'orange' | 'blue' | 'yellow' | 'purple';
};

//описание самого товара, Card - оболочка 
export type Pill = {
  title: string;
  description: string;
  synapse: number | null;
  category: Category;
  imgUrl: string;
};

export type Cart = {
  shoplist: Pill[];
};

//ICart - описывает всю кщрзину (список товаров + цена)

// Счётчик товаров в корзине
export type IPage = {
  counter: number;
}

export type IContacts = {
  email: string;
  phone: string;
}

export type IOrder = {
  items?: string[];
  typeOfPay?: boolean;
  address?: string;
  email?: string;
  phone?: string;
  totalSynapse?: number;
};

export type IOrderForm = {
  typeOfPay?: boolean;
  address?: string;
  email?: string;
  phone?: string;
}

export type IGlobalState = {
   basket: Pill[];
   store: Pill[];
   order: IOrder;
}

export type SuccessForm = {
  price: number;
};
