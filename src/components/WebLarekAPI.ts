// import { Api, ApiListResponse } from './base/api';
// import {IOrder, IOrderResult, ICard, IPill} from "../types";

// export interface IWebLarekAPI {
//     getCardList: () => Promise<ICard[]>;
//     getCardItem: (id: string) => Promise<ICard>;
// }

// export class WebLarekAPI extends Api implements IWebLarekAPI {
//     readonly cdn: string;

//     constructor(cdn: string, baseUrl: string, options?: RequestInit) {
//         super(baseUrl, options);
//         this.cdn = cdn;
//     }

//     getCardList(): Promise<ICard[]> {
//         return this.get(`/pill`).then(
//             (item: IPill) => ({
//                 ...item,
//                 image: this.cdn + item.image,
//             })
//         );
//     }

//     getCardItem(id: string): Promise<IPill> {
//         return this.get(`/pill/${id}`).then(
//             (item: IPill) => ({
//                 ...item,
//                 image: this.cdn + item.image,
//             })
//         );
//     }
// }