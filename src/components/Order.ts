import { IEvents } from './base/events';
import { Form } from './common/Form';

/*
 * Интерфейс, описывающий окошко заказа товара
 * */
export interface IOrder {
  address: string;
  // Способ оплаты
  typeOfPay: string;
  items: string[];
  total: null | number;
  email: string;
  phone: string;
  step: number;
}

/*
 * Класс, описывающий окошко заказа товара
 * */
export class Order extends Form<IOrder> {
  // Сссылки на внутренние элементы
  protected _card: HTMLButtonElement;
  protected _cash: HTMLButtonElement;
  protected _address: HTMLButtonElement;
  protected _button: HTMLButtonElement;

  // Конструктор принимает имя блока, родительский элемент и обработчик событий
  constructor(
    protected blockName: string,
    container: HTMLFormElement,
    protected events: IEvents
  ) {
    super(container, events);

    this._card = container.elements.namedItem('card') as HTMLButtonElement;
    this._cash = container.elements.namedItem('cash') as HTMLButtonElement;
    this._button = container.querySelector(
      '.order_button'
    ) as HTMLButtonElement; //далее
    this._address = container.elements.namedItem(
      'address'
    ) as HTMLButtonElement;

    if (this._cash) {
      this._cash.addEventListener('click', () => {
        this._cash.classList.add('button_alt-active');
        this._card.classList.remove('button_alt-active');
        this.onInputChange('typeOfPay', 'cash');
      });
    }
    if (this._card) {
      this._card.addEventListener('click', () => {
        this._card.classList.add('button_alt-active');
        this._cash.classList.remove('button_alt-active');
        this.onInputChange('typeOfPay', 'card');
      });
    }
    // if (this._address) {
    //   this._address.addEventListener('input', () => {
    //     this.onInputChange('address', this._address.value);
    //     // this.checkButtonState();
    //   });
    // }

    if (this._button) {
      this._button.addEventListener('click', () =>
        this.events.emit('order:submit')
      );
    }
  }

  // onInputChange(field: string, value: string) {
  //   console.log(field, value);
  // }

  // // Метод, отключающий подсвечивание кнопок
  // disableButtons() {
  //   this._cash.classList.remove('button_alt-active');
  //   this._card.classList.remove('button_alt-active');
  // }
  // protected checkButtonState() {
  //   const isAddressFilled = this._address.value.trim() !== '';
  //   const isPaymentSelected = this._card.classList.contains('button_alt-active') || this._cash.classList.contains('button_alt-active');

  //   this._button.disabled = !(isAddressFilled && isPaymentSelected);
  // }
}

/*
 * Интерфейс, описывающий окошко контакты
 * */
export interface IContacts {
  phone: string;
  email: string;
}

/*
 * Класс, описывающий окошко контакты
 * */
export class Contacts extends Form<IContacts> {
  // Конструктор принимает родительский элемент и обработчик событий
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
    this._submit.addEventListener('click', () => {
      events.emit('order:success');
    });
  }
}
