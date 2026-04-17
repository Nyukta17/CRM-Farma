import { CreateSupplyItemDto } from "./class-validator";

export class CreateSupplyOrderDto {
    supplier: string;
    totalAmount: number;
    items: CreateSupplyItemDto[];
    constructor(supplier: string,totalAmount: number, items: CreateSupplyItemDto[]){
        this.supplier =supplier;
        this.totalAmount =totalAmount;
        this.items =items
    }
} 
