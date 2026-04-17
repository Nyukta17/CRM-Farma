export class CreateSupplyItemDto {
    productId: number;
    quantity: number;
    priceAtOrder: number;
    constructor(productId:number,quantity:number,priceAtOrder:number){
        this.productId=productId;
        this.quantity=quantity;
        this.priceAtOrder=priceAtOrder;
    }
}
