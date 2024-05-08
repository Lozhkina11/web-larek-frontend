import { Component } from './base/Component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

interface IPage {
  // Счётчик товаров в корзине
  counter: number;
  shoplist: HTMLElement[];
  locked: boolean;
}

//главная стр
export class Page extends Component<IPage> {
  // Ссылки на внутренние элементы
  protected _counter: HTMLElement;
  protected _shoplist: HTMLElement;
  protected _wrapper: HTMLElement;
  protected _cart: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._counter = ensureElement<HTMLElement>('.header__basket-counter');
    this._shoplist = ensureElement<HTMLElement>('.gallery');
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
    this._cart = ensureElement<HTMLElement>('.header__basket');

    this._cart.addEventListener('click', () => {
      this.events.emit('cart:open');
    });
  }

  // seters
  set counter(value: number) {
    this.setText(this._counter, String(value));
  }

  set shoplist(items: HTMLElement[]) {
    this._shoplist.replaceChildren(...items);
  }

  set locked(value: boolean) {
    if (value) {
      this._wrapper.classList.add('page__wrapper_locked');
    } else {
      this._wrapper.classList.remove('page__wrapper_locked');
    }
  }
}