import { create } from "zustand";
import { api } from "./api";
import type { IProduct } from "../API/stock.service";
export interface ISupplyItem{
    productId: number;
    quantity:number;
    priceAtOrder:number
}

export interface ICreateSupplyOrdersDto{
    supplier:string;
    totalAmount:number;
    items:ISupplyItem[]
}

export const SupplyOrderService={
    async create(dto:ICreateSupplyOrdersDto){
        const {data}= await api.post('/supply-order',dto)
        return dto;
    }
}