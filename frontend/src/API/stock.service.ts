
import { api } from './api'
export interface IProduct {
    id: number;
    name: string;
    price: number;
    count: number;
    group: string;
}

export const StockService = {
    async getAll(): Promise<IProduct[]> {
        const { data } = await api.get<IProduct[]>('/stock');
        return data;
    },
    async create(payload: Omit<IProduct,'id'>):Promise<IProduct>{
        const {data} =await api.post<IProduct>('/stock',payload);
        return data
    }
}