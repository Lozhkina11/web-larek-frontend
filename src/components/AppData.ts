import {Model} from "../components/base/Model";
import {FormErrors, IAppState, Pill} from "../types";
// import { IOrder } from "./common/Order";

export type ShoplistChangeEvent = {
    catalog: Pill[]
};
export class AppState extends Model<IAppState> {
  // Корзина с товарами
  cart: Pill[] = [];

  // Массив со всеми товарами
  store: Pill[];
  
  //заказ
  order: IOrder = {
    items: [],
    typeOfPay: '',
    total: null,
    address: '',
    email: '',
    phone: '',
  };

  // ошибки в форме
  formErrors: FormErrors = {};

  addItemToCart(value: Pill) {
    this.cart.push(value);
  }

  removeItemFromCart(id: string) {
    this.cart = this.cart.filter(item => item.id !== id)
  }

  clearCart() {
    this.cart.length = 0;
  }

  getCartItems() {
    return this.cart.length;
  }

  getTotalCartPrice() {
    return this.order.items.reduce((a, c) => a + this.store.find(it => it.id === c).synapse, 0)
  }

  validateOrder() {
    const errors: typeof this.formErrors = {};
    if (!this.order.email) {
        errors.email = 'Необходимо указать email';
    }
    if (!this.order.phone) {
        errors.phone = 'Необходимо указать телефон';
    }
    this.formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
}

  validateForContacts() {
  const errors: typeof this.formErrors = {};
  if (!this.order.address) {
    errors.address = 'Необходимо указать адрес';
  }
  if (!this.order.typeOfPay) {
    errors.typeOfPay = 'Необходимо указать способ оплаты';
  }
  this.formErrors = errors;
  this.events.emit('orderFormErrors:change', this.formErrors);
  return Object.keys(errors).length === 0;
}
}