export class CreateStockDto {
    name:string
    count:number
    price:number
    group:string

    constructor(name:string,count:number,price:number,group:string){
        this.name = name;
        this.count = count;
        this.price=price;
        this.group = group
    }

    
}
