// import { Api, ApiListResponse } from './base/api';

// import { IPill, IOrderResult, ApiAnswer} from "../types";
// import { IOrder } from './Order';
// export interface IWebLarekAPI {
// 	getCardList: () => Promise<IPill[]>;
// 	getProductItem: (id: string) => Promise<IPill>;
// 	orderPills: (order: IOrder) => Promise<IOrderResult>;
// }

// export class WebLarekAPI extends Api implements IWebLarekAPI {
// 	readonly cdn: string;

// 	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
// 		super(baseUrl, options);
// 		this.cdn = cdn;
// 	}

// 	getCardList(): Promise<IPill[]> {
//         return this.get('/product')
//         .then((data: ApiListResponse<IPill>) =>
// 			data.items.map((item) => ({
// 				...item,
				
// 				image: this.cdn + item.image,
// 			}))
// 		);
// 	}

//       WebLarekAPI.get('/product') 
//   .then((response: ApiAnswer) => { 
//     appData.setStore(response.items as IPill[]); 
//   }) 
//   .catch((err) => { 
//     console.error(err); 
//   });

//       getProductItem(id: string): Promise<IPill> {
//         return this.get(`/product/${id}`).then((data: IPill) => ({
//           ...data,
//           image: this.cdn + data.image,
//         }));
//       }

//       orderPills(order: IOrder): Promise<IOrderResult> {
//         return this.post('/order', order).then((data: IOrderResult) => data);
//       }
// }