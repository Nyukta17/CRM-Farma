export class CreateOrderDto {
    clientName!:string;
    totalPrice!:number;
    items!: OrdersItem[];
    
    
}

class OrdersItem{
    productId!:number;
    quantity!:number;
    price!:number

    
}
