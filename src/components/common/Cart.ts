import { Component } from '../base/Component';
import {
  cloneTemplate,
  createElement,
  ensureElement,
  formatNumber,
} from '../../utils/utils';
import { IEvents } from '../base/events';
import { Pill } from '../../types';

interface ICart {
  // Массив элементов списка
  list: Pill[];
  // Общая цена товаров
  synapse: number;
}


interface ICarttView {
  //массив элементов DOM, представляющих товары в корзине
  items: HTMLElement[];
  //общая стоимость товаров в корзине
  total: number;
  //массив строк. выбранные товары в корзине
  selected: string[];
}
export class Cart extends Component<ICarttView> {
  // Ссылки на внутренние элементы
  protected _list: HTMLElement;
  protected _price: HTMLElement;
  // _synapse: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
    protected blockName: string
    
  ) {
    super(container);

    this._button = container.querySelector(`.${blockName}__button`);
    this._price = container.querySelector(`.${blockName}__price`);
    this._list = container.querySelector(`.${blockName}__list`);

    if (this._button) {
      this._button.addEventListener('click', () =>
        this.events.emit('cart:order')
      );
    }
  }

  set items(items: HTMLElement[]) {
    if (items.length) {
      this._list.replaceChildren(...items);
    } else {
      this._list.replaceChildren(
        createElement<HTMLParagraphElement>('p', {
          textContent: 'Корзина пуста',
        })
      );
    }
  }

  set selected(items: string[]) {
    if (items.length) {
      this.setDisabled(this._button, false);
    } else {
      this.setDisabled(this._button, true);
    }
  }

  // set для списка товаров
  set list(items: HTMLElement[]) {
    this._list.replaceChildren(...items);
    this._button.disabled = items.length ? false : true;
  }

  // Метод отключающий кнопку "Оформить"
  disableButton() {
    this._button.disabled = true;
  }

  // Метод для обновления индексов таблички при удалении товара из корзины
  refreshIndices() {
    Array.from(this._list.children).forEach(
      (item, index) =>
        (item.querySelector(`.basket__item-index`)!.textContent = (
          index + 1
        ).toString())
    );
  }
}

export interface IPillCart extends Pill {
  id: string;
  index: number;
}

export interface IStoreItemCartActions {
  onClick: (event: MouseEvent) => void;
}

export class StoreItemCart extends Component<IPillCart> {
  protected _index: HTMLElement;
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected blockName: string,
    actions?: IStoreItemCartActions
  ) {
    super(container);

    this._title = container.querySelector(`.${blockName}__title`);
    this._index = container.querySelector(`.basket__item-index`);
    this._price = container.querySelector(`.${blockName}__price`);
    this._button = container.querySelector(`.${blockName}__button`);

    if (this._button) {
      this._button.addEventListener('click', (evt) => {
        this.container.remove();
        actions?.onClick(evt);
      });
    }
  }

  set title(value: string) {
    this._title.textContent = value;
  }

  set index(value: number) {
    this._index.textContent = value.toString();
  }

}
