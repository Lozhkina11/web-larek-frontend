import { Model } from './base/Model';
import { FormErrors, IAppState, IPill } from '../types';
import { IOrder } from './Order';

export class Pill extends Model<IPill> {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  selected: boolean;
}

export class AppState extends Model<IAppState> {
  static getTotalCartPrice(value: number) {
    throw new Error('Method not implemented.');
  }
  // Корзина с товарами
  cart: IPill[] = [];

  // Массив со всеми товарами
  store: IPill[];

  //заказ
  order: IOrder = {
    items: [],
    typeOfPay: '',
    total: null,
    address: '',
    email: '',
    phone: '',
    step: 1,
  };

  // getAddress(): string {
  //   return this.order.address;
  // }

  // // Метод для установки адреса
  // setAddress(newAddress: string): void {
  //   this.order.address = newAddress;
  // }

  // ошибки в форме
  formErrors: FormErrors = {};

  addItemToCart(value: IPill) {
    this.cart.push(value);
  }

  removeItemFromCart(id: string) {
    this.cart = this.cart.filter((item) => item.id !== id);
  }

  clearCart() {
    this.cart.length = 0;
  }

  getCartItems() {
    return this.cart.length;
  }
 
  getTotalCartPrice() {
    return this.cart.reduce((sum, next) => sum + next.price, 0);
  }
  // calculateTotal(): number {
  //   const items = Array.from(document.querySelectorAll('.basket__price')) as HTMLElement[];
  //   return items.reduce((total, item) => {
  //     const priceElement = item.querySelector('.basket__price');
  //     if (priceElement) {
  //       const priceString = priceElement.textContent!;
  //       const price = parseFloat(priceString.replace(/\D/g, ''));
  //       return total + price;
  //     }
  //     return total;
  //   }, 0);
  // }

  getCartAmount() {
    return this.cart.length;
  }
  setItems() {
    this.order.items = this.cart.map(item => item.id)
  }
  
  // resetSelected() {
  //   this.store.forEach(item => item.selected = false)
  // }

  setStore(items: IPill[]) {
    // Проверка, что все объекты в массиве items соответствуют интерфейсу IPill
    this.store = items.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      selected: false, // Устанавливаем selected в false
    }));
    this.emitChanges('items:changed', { store: this.store });
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
    if (!this.order.typeOfPay) {
      errors.typeOfPay = 'Необходимо указать способ оплаты';
    }
    if (!this.order.address) {
      errors.address = 'Необходимо указать адрес';
    }
    this.formErrors = errors;
    this.events.emit('orderFormErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }
  refreshOrder() {
    this.order = {
      items: [],
      total: null,
      address: '',
      email: '',
      phone: '',
      typeOfPay: '',
      step: 1,
    };
  }
}
