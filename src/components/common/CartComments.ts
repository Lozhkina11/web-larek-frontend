// интерфейс для хранения данных о товаре в корзине
// Массив элементов списка 
// list: Pill[]; 
// Общая цена товаров 
// total: number;
// items: HTMLElement[]; 
// selected: string[]; 
export interface ICart { 
  // Массив элементов списка 
  list: Pill[]; 
  // Общая цена товаров 
  total: number;
  // Массив элементов DOM, представляющих товары в корзине 
  items: HTMLElement[]; 
  // Массив строк. выбранные товары в корзине 
  selected: string[]; 
} 

// интерфейс для просмотра ивентов
// interface ICartView { 
//   //массив элементов DOM, представляющих товары в корзине 
//   items: HTMLElement[]; 
//   //общая стоимость товаров в корзине 
//   total: number;
//   //массив строк. выбранные товары в корзине 
//   selected: string[]; 
// } 
export class Cart extends Component<ICart> { 
  // Ссылки на внутренние элементы
  protected _list: HTMLElement; // элемент списка
  protected _price: HTMLElement; // _synapse: HTMLElement; 
  protected _button: HTMLButtonElement; // кнопка "Оформить"
 
  constructor( 
    protected blockName: string, 
    container: HTMLElement, 
    protected events: IEvents 
  ) { 
    super(container); 
    this._button = container.querySelector(`.${blockName}__button`); 
    this._price = container.querySelector(`.${blockName}__price`); 
    this._list = container.querySelector(`.${blockName}__list`); //basket__list 
    if (!this._list) { 
      console.error('Ошибка: Элемент списка не найден в DOM.'); 
      return; 
    } 
    if (this._button) { 
      this._button.addEventListener('click', () => 
        this.events.emit('basket:order') 
      ); 
    } 
  } 

  // set items(items: HTMLElement[]) { 
  //   if (items.length) { 
  //     this._list.replaceChildren(...items); 
  //   } else { 
  //     this._list.replaceChildren( 
  //       createElement<HTMLParagraphElement>('p', { 
  //         textContent: 'Корзина пуста', 
  //       }) 
  //     ); 
  //   } 
  //   // } 
  //   set selected(items: string[]) { 
  //     // Если в корзине нет товаров (длина массива items равна 0), то блокируем кнопку 
  //     this.setDisabled(this._button, items.length === 0); 
  // } 
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
    this._button.disabled = items.length === 0; 
  } 

  // set для общей стоимости товаров
  set total(value: number) { 
    this._price.textContent = formatPrice(value) + ' синапсов'; 
  } 

