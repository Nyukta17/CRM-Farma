import { api } from "./api";

interface ICartItem {
    productId: number;
    name?: string;
    quantity: number;
    price: number;
}
export interface ICreateOrderDtoP{
    clientName:string;
    totalPrice:number;
    items:ICartItem[];
}
export const OrderService = {
    async creatOrder(dto:Omit<ICreateOrderDtoP,"id">):Promise<ICreateOrderDtoP>{
        const {data} = await api.post<ICreateOrderDtoP>('/orders',dto)
        console.log(dto)
        return data
    }
}